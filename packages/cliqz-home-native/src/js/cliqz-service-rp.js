const Spanan = require('spanan');
let INSTANCE = null;
class CliqzServiceRemotePages {
  constructor() {
    const freshtab = createSpananForModule('freshtab');
    const core = createSpananForModule('core');

    addMessageListener("freshtab", ({ target, data }) => {
      const { uuid, returnedValue, functionName, ts, et } = data;
      console.log(Date.now(), `[bg => freshtab]::${functionName}(${uuid.slice(-12)})`, returnedValue, `message time: ${Date.now() - ts}, exec time: ${et}`);

      freshtab.dispatch({ uuid, returnedValue });
      core.dispatch({ uuid, returnedValue });
    });

    this.freshtab = freshtab.createProxy();
    this.core = core.createProxy();
  }

  static getInstance() {
    if (!INSTANCE) {
      INSTANCE = new CliqzServiceRemotePages();
    }

    return INSTANCE;
  }
}

function createSpananForModule(moduleName) {
    const freshtab = new Spanan(({ uuid, functionName, args }) => {
      console.log(Date.now(), `[freshtab => bg]::${functionName}(${uuid.slice(-12)})`, args);
      sendAsyncMessage("freshtab", { uuid, functionName, args, module: moduleName, ts: Date.now() });
    });
    return freshtab;
}

module.exports = CliqzServiceRemotePages.getInstance();