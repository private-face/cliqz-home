import React, { Component } from 'react';
import cliqz from './Cliqz';
import UrlBar from './UrlBar';
import SpeedDials from './SpeedDials';
import News from './News';
import './App.css';
import Benchmark from 'cliqz-home-benchmark';

window.benchmark = new Benchmark('react');
Promise.all([
    new Promise((resolve) => { window.urlbarReady = () => { window.benchmark.markOnce('url bar'); resolve(); } }),
    new Promise((resolve) => { window.speeddialsReady = () => { window.benchmark.markOnce('speed dials'); resolve(); } }),
    new Promise((resolve) => { window.newsReady = () => { window.benchmark.markOnce('news'); resolve(); } }),
]).then((...args) => {
    window.benchmark.saveAndReload();
});

class App extends Component {
  constructor(props) {
    super(props); 
    this.freshtab = cliqz.freshtab;
    this.state = {
      config: {},
      dials: {
        history: [],
        custom: []
      },
      news: {
        version: '',
        data: []
      }    
    };
  }

  componentDidMount() {
    this.getConfig();
    this.getSpeedDials();
    this.getNews();
  }

  getConfig() {
    this.freshtab.getConfig().then(config => {
      this.setState({
        config: config
      });
    });
  }

  getSpeedDials() {
    this.freshtab.getSpeedDials().then(dials => {
      this.setState({
        dials: dials
      });
    });
  }

  getNews() {
    this.freshtab.getNews().then((data) => {
      this.setState({
        news: {
          version: data.version,
          data: data.news,
        }
      });
    });
  }

  render() {
    return (
      <div id="app">
        <div id="home">
          <section id="content">
            <section id="top">
              <SpeedDials dials={this.state.dials} />
            </section>

            <section id="middle">
              <UrlBar freshtab={this.freshtab} />
            </section>

            <section id="bottom">
              <News news={this.state.news} />
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
