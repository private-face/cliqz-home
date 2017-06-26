function avg(t){return t.reduce((t,n)=>t+n)/t.length}function min(t){return t.reduce((t,n)=>Math.min(t,n),1/0)}function max(t){return t.reduce((t,n)=>Math.max(t,n),0)}class Chart{constructor(t={}){this._scaleLength=t.scaleLength||150}_pad(t,n=" ",a){return a=a||this._markLength,a=Math.round(a),(t+[...Array(a)].map(()=>n).join("")).slice(0,a)}_drawScale(){const t=this._markLabelLength;let n=this._pad(""," ",t);for(let t=0;t<this._scaleLength;t+=this._markLength)n+=this._pad((t*this._msPerDot).toFixed());return n+this._totalMs.toFixed()}_drawLine(t){const n=this._markLabelLength,a=Math.max(t.duration*this._dotsPerMs,1);return this._pad(t.name," ",n)+this._pad(""," ",t.startTime*this._dotsPerMs)+this._pad("","█",a)}draw(t){this._totalMs=t.reduce((t,n)=>Math.max(t,n.startTime+n.duration),0),this._msPerDot=this._totalMs/this._scaleLength,this._dotsPerMs=1/this._msPerDot,this._markLength=this._totalMs.toFixed().toString().length+1,this._markLabelLength=t.reduce((t,n)=>Math.max(t,n.name.length),0)+1;const n=this._drawScale(),a=t.map(t=>this._drawLine(t)).join("\n");console.log(`${n}\n${a}`)}}const TIMELINE=[{name:"networking",start:"navigationStart",end:"responseEnd"},{name:"dom parsing and scripts",start:"domLoading",end:"domInteractive"},{name:"dom interactive",start:"domInteractive",end:"domInteractive"},{name:"dom complete",start:"domComplete",end:"domComplete"},{name:"resources and scripts",start:"domInteractive",end:"loadEventEnd"}],TIMELINE_KEYS=TIMELINE.reduce((t,n)=>{const a=[];-1===t.indexOf(n.start)&&a.push(n.start);-1===t.indexOf(n.end)&&a.push(n.end);return t.concat(a)},[]);class Benchmark{constructor(t){this._benchmarkName=t,this._chart=new Chart,this._marks=new Map,this.avg=avg,this.min=min,this.max=max}markOnce(t){this._marks.has(t)||(performance.mark(t),this._marks.set(t,!0))}mark(t){performance.mark(t)}clear(t){t=t||this._benchmarkName;const n=this._data;delete n[t],this._data=n}clearAll(){this._data={}}compare(){const t=this._data;["min","avg","max"].forEach((n,a)=>{const e=this[n];const i=[];for(let n in t){const t=this._combineStats(n,e),a=t.timingsByKeys.navigationStart.length,s={implementation:`${n} (${a} samples)`};Object.keys(t.marksByKeys).forEach(n=>{s[n]=Math.round(e(t.marksByKeys[n]))}),i.push(s)}console.log(`${a}. ${n.toUpperCase()}`);console.table(i)})}fullReport(t){t=t||this._benchmarkName,["min","avg","max"].forEach(t=>{this.report(this[t])})}report(t=avg){this.reportByName(this._benchmarkName,t)}reportByName(t,n=avg){const a=this._data[t].length;console.log(`Stats for ${t}, ${a} samples, function ${n.name}`),console.table(this._buildStats(n),["name","startTime","duration"]),this.chart(n)}chart(t=avg){this._chart.draw(this._buildStats(t))}_buildStats(t){const n=this._combineStats(this._benchmarkName,t);return n.periods.concat(n.marks).sort((t,n)=>t.startTime-n.startTime)}_combineStats(t,n=avg){t=t||this._benchmarkName;const a=this._data[t],e=TIMELINE_KEYS.reduce((t,n)=>{t[n]=a.map(t=>t.timings[n]);return t},{}),i={};a.forEach(t=>{const n=t.marks;for(let t in n)i[t]=i[t]||[],i[t].push(n[t].startTime)});const s=TIMELINE.map(t=>({name:t.name,entryType:"measure",startTime:n(e[t.start]),duration:n(e[t.end].map((n,a)=>n-e[t.start][a]))})),o=Object.keys(i).map(t=>({name:t,entryType:"mark",startTime:n(i[t]),duration:0}));return{marksByKeys:i,timingsByKeys:e,periods:s,marks:o}}_getSamples(){const t=performance.timing.toJSON(),n=t.navigationStart;Object.keys(t).forEach(a=>{t[a]=Math.max(t[a]-n,0)});const a=performance.getEntriesByType("mark").reduce((t,n)=>{const a=n.toJSON();t[a.name]=a;return t},{});return{ts:Date.now(),timings:t,marks:a}}get _data(){try{return JSON.parse(window.localStorage.getItem("benchmark"))||{}}catch(t){return{}}}set _data(t){window.localStorage.setItem("benchmark",JSON.stringify(t))}save(){const t=this._data;t[this._benchmarkName]=t[this._benchmarkName]||[],t[this._benchmarkName].push(this._getSamples()),this._data=t}saveAndReload(){this.save();let t=+location.hash.slice(1);isNaN(t)||--t<=0||setTimeout(()=>{const n=new URL(location.href);n.hash=t;location.replace(n.toString());location.reload()},600)}}
export default Benchmark;