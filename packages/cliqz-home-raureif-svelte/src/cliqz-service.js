import Spanan from 'spanan';

let INSTANCE = null;

class CliqzService {
  constructor() {
    const freshtab = createSpananForModule('freshtab');
    const core = createSpananForModule('core');

    window.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.type !== "response") {
        return;
      }

      freshtab.dispatch({
        uuid: message.requestId,
        returnedValue: message.response,
      });

      core.dispatch({
        uuid: message.requestId,
        returnedValue: message.response,
      });
    });

    this.freshtab = freshtab.createProxy();
    this.core = core.createProxy();
  }

  static getInstance() {
    if (!INSTANCE) {
      INSTANCE = new CliqzService();
    }

    return INSTANCE;
  }
}

function createSpananForModule(moduleName) {
  return new Spanan(({ uuid, functionName, args }) => {
    const message = JSON.stringify({
      target: 'cliqz',
      module: moduleName,
      action: functionName,
      requestId: uuid,
      args,
    });
    window.postMessage(message, '*');
  });
}

export default CliqzService.getInstance();
