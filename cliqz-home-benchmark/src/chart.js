class Chart {
	constructor(options = {}) {
		this._scaleLength = options.scaleLength || 150;
	}

	_pad(s, c = ' ', n) {
		n = n || this._markLength;
		n = Math.round(n);
		return (s + Array.apply(null, Array(n)).map(() => c).join('')).slice(0, n);
	}

	_drawScale() {
		const offset = this._markLabelLength;
		let s = this._pad('', ' ', offset);
		for(let i = 0; i < this._scaleLength; i += this._markLength) {
			s += this._pad((i * this._msPerDot).toFixed());
		}
		return s + this._totalMs.toFixed();
	}

	_drawLine(mark) {
		const offset = this._markLabelLength;
		const l = Math.max(mark.duration * this._dotsPerMs, 1);
		return this._pad(mark.name, ' ', offset) +
			this._pad('', ' ', mark.startTime * this._dotsPerMs) +
			this._pad('', '█', l);
	}

	draw(performanceData) {
		this._totalMs = performanceData.reduce((total, mark) => Math.max(total, mark.startTime + mark.duration), 0);
		this._msPerDot = this._totalMs / this._scaleLength;
		this._dotsPerMs = 1 / this._msPerDot;
		this._markLength = this._totalMs.toFixed().toString().length + 1;
		this._markLabelLength = performanceData.reduce((len, mark) => Math.max(len, mark.name.length), 0) + 1;

		const scale = this._drawScale();
		const hist = performanceData.map((mark) => this._drawLine(mark)).join('\n');
		console.log(`${scale}\n${hist}`);
	}

}
