import React, { Component } from 'react';
import './App.css';
import UrlBar from './UrlBar';
import SpeedDials from './SpeedDials';
import News from './News';
import Spanan from 'spanan';

let freshtabSpanan;
let coreSpanan;
class App extends Component {
  constructor(props) {
    super(props); 
    window.addEventListener('message', this.handleMessage);
    freshtabSpanan = this.createSpananForModule('freshtab');
    coreSpanan = this.createSpananForModule('core');
    this.freshtab = freshtabSpanan.createProxy();
    this.core = coreSpanan.createProxy();
  }

  render() {
    return (
      <div id="app">
        <div id="home">
          <nav id="nav-left"></nav>
          <section id="content">
            <section id="top">
              <SpeedDials freshtab={this.freshtab} />
            </section>

            <section id="middle">
              <UrlBar />
            </section>

            <section id="bottom">
              <News freshtab={this.freshtab} />
            </section>
          </section>
        </div>
      </div>
    );
  }

  createSpananForModule (moduleName) {
    return new Spanan(({ uuid, functionName, args }) => {
      const message = JSON.stringify({
        target: 'cliqz',
        module: moduleName,
        action: functionName,
        requestId: uuid,
        args
      })
      window.postMessage(message, '*')
    });
  }

  handleMessage(event) {

    const message = JSON.parse(event.data)
    if (message.type !== 'response') {
      return;
    }
    freshtabSpanan.dispatch({
      uuid: message.requestId,
      returnedValue: message.response
    })

    coreSpanan.dispatch({
      uuid: message.requestId,
      returnedValue: message.response,
    });
  }

}

export default App;
