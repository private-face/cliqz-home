import Spanan from "spanan";

export default class CliqzService {
  constructor() {
    const freshtab = new Spanan(({ uuid, functionName, args }) => {
      const message = JSON.stringify({
        target: 'cliqz',
        module: 'freshtab',
        action: functionName,
        requestId: uuid,
        args,
      });
      window.postMessage(message, '*');
    });

    window.addEventListener('message', event => {
      const message = JSON.parse(event.data);

      if (message.type !== "response") {
        return;
      }

      freshtab.dispatch({
        uuid: message.requestId,
        returnedValue: message.response,
      });
    });

    this.freshtab = freshtab.createProxy();
  }
}
