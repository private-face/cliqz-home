function avg(t){return t.reduce((t,n)=>t+n)/t.length}function min(t){return t.reduce((t,n)=>Math.min(t,n),1/0)}function max(t){return t.reduce((t,n)=>Math.max(t,n),0)}class Chart{constructor(t={}){this._scaleLength=t.scaleLength||150}_pad(t,n=" ",e){return e=e||this._markLength,e=Math.round(e),(t+[...Array(e)].map(()=>n).join("")).slice(0,e)}_drawScale(){const t=this._markLabelLength;let n=this._pad(""," ",t);for(let t=0;t<this._scaleLength;t+=this._markLength)n+=this._pad((t*this._msPerDot).toFixed());return n+this._totalMs.toFixed()}_drawLine(t){const n=this._markLabelLength,e=Math.max(t.duration*this._dotsPerMs,1);return this._pad(t.name," ",n)+this._pad(""," ",t.startTime*this._dotsPerMs)+this._pad("","█",e)}draw(t){this._totalMs=t.reduce((t,n)=>Math.max(t,n.startTime+n.duration),0),this._msPerDot=this._totalMs/this._scaleLength,this._dotsPerMs=1/this._msPerDot,this._markLength=this._totalMs.toFixed().toString().length+1,this._markLabelLength=t.reduce((t,n)=>Math.max(t,n.name.length),0)+1;const n=this._drawScale(),e=t.map(t=>this._drawLine(t)).join("\n");console.log(`${n}\n${e}`)}}const TIMELINE=[{name:"networking",start:"navigationStart",end:"responseEnd"},{name:"dom parsing and scripts",start:"domLoading",end:"domInteractive"},{name:"dom interactive",start:"domInteractive",end:"domInteractive"},{name:"dom complete",start:"domComplete",end:"domComplete"},{name:"resources and scripts",start:"domInteractive",end:"loadEventEnd"}],TIMELINE_KEYS=TIMELINE.reduce((t,n)=>{const e=[];-1===t.indexOf(n.start)&&e.push(n.start);-1===t.indexOf(n.end)&&e.push(n.end);return t.concat(e)},[]);class Benchmark{constructor(t){this._benchmarkName=t,this._chart=new Chart,this._marks=new Map,this.avg=avg,this.min=min,this.max=max}markOnce(t){this._marks.has(t)||(performance.mark(t),this._marks.set(t,!0))}mark(t){performance.mark(t)}clear(t){t=t||this._benchmarkName;const n=this._data;delete n[t],this._data=n}clearAll(){this._data={}}compare(){const t=this._data;return["min","avg","max"].reduce((n,e,a)=>{const i=this[e];const s=[];for(let n in t){const t=this._combineStats(n,i),e=t.timingsByKeys.navigationStart.length,a={implementation:`${n} (${e} samples)`};Object.keys(t.marksByKeys).forEach(n=>{a[n]=Math.round(i(t.marksByKeys[n]))}),s.push(a)}console.log(`${a}. ${e.toUpperCase()}`);console.table(s);n[e]=s;return n},{})}fullReport(t){t=t||this._benchmarkName,["min","avg","max"].forEach(t=>{this.report(this[t])})}report(t=avg){this.reportByName(this._benchmarkName,t)}reportByName(t,n=avg){const e=this._data[t].length;console.log(`Stats for ${t}, ${e} samples, function ${n.name}`),console.table(this._buildStats(n),["name","startTime","duration"]),this.chart(n)}chart(t=avg){this._chart.draw(this._buildStats(t))}_buildStats(t){const n=this._combineStats(this._benchmarkName,t);return n.periods.concat(n.marks).sort((t,n)=>t.startTime-n.startTime)}_combineStats(t,n=avg){t=t||this._benchmarkName;const e=this._data[t],a=TIMELINE_KEYS.reduce((t,n)=>{t[n]=e.map(t=>t.timings[n]);return t},{}),i={};e.forEach(t=>{const n=t.marks;for(let t in n)i[t]=i[t]||[],i[t].push(n[t].startTime)});const s=TIMELINE.map(t=>({name:t.name,entryType:"measure",startTime:n(a[t.start]),duration:n(a[t.end].map((n,e)=>n-a[t.start][e]))})),o=Object.keys(i).map(t=>({name:t,entryType:"mark",startTime:n(i[t]),duration:0}));return{marksByKeys:i,timingsByKeys:a,periods:s,marks:o}}_getSamples(){const t=performance.timing.toJSON(),n=t.navigationStart;Object.keys(t).forEach(e=>{t[e]=Math.max(t[e]-n,0)});const e=performance.getEntriesByType("mark").reduce((t,n)=>{const e=n.toJSON();t[e.name]=e;return t},{});return{ts:Date.now(),timings:t,marks:e}}get _data(){try{return JSON.parse(window.localStorage.getItem("benchmark"))||{}}catch(t){return{}}}set _data(t){window.localStorage.setItem("benchmark",JSON.stringify(t))}save(){const t=this._data;t[this._benchmarkName]=t[this._benchmarkName]||[],t[this._benchmarkName].push(this._getSamples()),this._data=t}saveAndReload(){this.save();let t=+location.hash.slice(1);isNaN(t)||--t<=0||setTimeout(()=>{const n=new URL(location.href);n.hash=t;location.replace(n.toString());location.reload()},600)}}
module.exports = Benchmark;