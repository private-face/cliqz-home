import React, { Component } from 'react';
import Logo from './Logo';

class Article extends Component {
 
  render() {
    return (
      <a href={this.props.article.url} 
         className="article"
         ref="articleRef" 
         style={{height: '129px'}}>
        <div className="side-front">
          <Logo logo={this.props.article.logo} />
          <span className="source-name">
            {this.props.article.displayUrl}
          </span>
          <p className="title">
            {this.props.article.title}
          </p>
        </div>

        <div className="side-back">
          <p className="abstract">
            {this.props.article.description}
          </p>
        </div>
      </a>
    )
  }
}

export default Article;