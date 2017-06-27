const TIMELINE = [
	{
		name: 'networking',
		start: 'navigationStart',
		end: 'responseEnd'
	}, {
		name: 'dom parsing and scripts',
		start: 'domLoading',
		end: 'domInteractive'
	}, {
		name: 'dom interactive',
		start: 'domInteractive',
		end: 'domInteractive'
	}, {
		name: 'dom complete',
		start: 'domComplete',
		end: 'domComplete'
	}, {
		name: 'resources and scripts',
		start: 'domInteractive',
		end: 'loadEventEnd'
	}
];

const TIMELINE_KEYS = TIMELINE.reduce((keys, t) => {
	const x = [];
	if (keys.indexOf(t.start) === -1) {
		x.push(t.start);
	}
	if (keys.indexOf(t.end) === -1) {
		x.push(t.end);
	}
	return keys.concat(x);
}, []);

function avg(a) {
	return a.reduce((avg, item) => avg + item) / a.length;
}

function min(a) {
	return a.reduce((min, item) => Math.min(min, item), Infinity);
}

function max(a) {
	return a.reduce((max, item) => Math.max(max, item), 0);
}

class Benchmark {
	constructor(name) {
		this._benchmarkName = name;
		this._chart = new Chart;
		this._marks = new Map;
		this.avg = avg;
		this.min= min;
		this.max = max;
	}

	markOnce(name) {
		if (!this._marks.has(name)) {
			performance.mark(name);
			this._marks.set(name, true);
		}
	}

	mark(name) {
		performance.mark(name);
	}

	clear(name) {
		name = name || this._benchmarkName;
		const d = this._data;
		delete d[name];
		this._data = d;
	}

	clearAll() {
		this._data = {};
	}

	compare() {
		const data = this._data;
		const fns = ['min', 'avg', 'max'];
		const result = fns.reduce((res, fnName, i) => {
			const fn = this[fnName];
			const report = [];
			for(let impl in data) {
				const stats = this._combineStats(impl, fn);
				const l = stats.timingsByKeys.navigationStart.length;
				const marks = {
					implementation: `${impl} (${l} samples)`
				};
				Object.keys(stats.marksByKeys).forEach((key) => { marks[key] = Math.round(fn(stats.marksByKeys[key]))});
				report.push(marks);
			}
			console.log(`${i}. ${fnName.toUpperCase()}`);
			console.table(report);
			res[fnName] = report;
			return res;
		}, {});
		return result;
	}

	fullReport(name) {
		name = name || this._benchmarkName;
		['min', 'avg', 'max'].forEach((fnName) => {
			this.report(this[fnName]);
		});
	}

	report(fn = avg) {
		this.reportByName(this._benchmarkName, fn);
	}

	reportByName(name, fn = avg) {
		const l = this._data[name].length;
		console.log(`Stats for ${name}, ${l} samples, function ${fn.name}`);
		console.table(this._buildStats(name, fn), ["name", "startTime", "duration"]);
		this.chart(name, fn);
	}

	chart(name, fn = avg) {
		name = name || this._benchmarkName;
		this._chart.draw(this._buildStats(name, fn));
	}

	_buildStats(name, fn) {
		const stats = this._combineStats(name, fn);
		return stats.periods.concat(stats.marks).sort((a, b) => a.startTime - b.startTime);
	}

	_combineStats(name, fn = avg) {
		name = name || this._benchmarkName;
		const b = this._data[name];
		const timingsByKeys = TIMELINE_KEYS.reduce((timeSamples, key) => {
			timeSamples[key] = b.map(slice => slice.timings[key]);
			return timeSamples;
		}, {});
		const marksByKeys = {};
		b.forEach((sample) => {
			const marks = sample.marks;
			for(let key in marks) {
				marksByKeys[key] = marksByKeys[key] || [];
				marksByKeys[key].push(marks[key].startTime);
			}
		});
		const periods = TIMELINE.map((period) => {
			return {
				name: period.name,
				entryType: 'measure',
				startTime: fn(timingsByKeys[period.start]),
				duration: fn(timingsByKeys[period.end].map((val, i) => val - timingsByKeys[period.start][i]))
			};
		});
		const marks = Object.keys(marksByKeys).map((markName) => {
			return {
				name: markName,
				entryType: 'mark',
				startTime: fn(marksByKeys[markName]),
				duration: 0
			};
		});
		return {
			marksByKeys,
			timingsByKeys,
			periods,
			marks
		}
	}

	_getSamples() {
		const timings = performance.timing.toJSON();
		const navStart = timings.navigationStart;
		Object.keys(timings).forEach((mark) => {
			timings[mark] = Math.max(timings[mark] - navStart, 0);
		});
		const marksMap = performance.getEntriesByType('mark').reduce((marks, mark) => {
			const m = mark.toJSON();
			marks[m.name] = m;
			return marks;
		}, {});
		return {
			ts: Date.now(),
			timings,
			marks: marksMap
		};
	}

	get _data() {
		try {
			return JSON.parse(window.localStorage.getItem('benchmark')) || {};
		} catch (e)	{
			return {}
		}
	}

	set _data(b) {
		window.localStorage.setItem('benchmark', JSON.stringify(b));
	}

	save() {
		const b = this._data;
		b[this._benchmarkName] = b[this._benchmarkName] || [];
		b[this._benchmarkName].push(this._getSamples());
		this._data = b;
	}

	saveAndReload() {
		this.save();
		let hash = +location.hash.slice(1);
		if (isNaN(hash) || --hash <= 0) {
			return;
		}
		setTimeout(() => {
			const newUrl = new URL(location.href);
			newUrl.hash = hash;
			location.replace(newUrl.toString());
			location.reload();
		}, 600);
	}
}