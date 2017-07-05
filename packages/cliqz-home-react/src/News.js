import React, { Component } from 'react';
import Pagination from './Pagination';
import Article from './Article';

const styles = {
  transition: 'all 0.5s ease-in-out'  
};

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      opacity: 0
    }

    this.onChangePage = this.onChangePage.bind(this);
    this.updateOpacity = this.updateOpacity.bind(this);
  }
  
  componentDidUpdate() {
		if (this.props.news.data.length) {
			window.newsReady();
		}
	}

  onChangePage(pageOfItems) {
    return Promise.resolve(this.setState({ pageOfItems: pageOfItems }));
  }

  updateOpacity(opacity) {
    return Promise.resolve(this.setState({ opacity: opacity}))
  }

  render() {
    return (
      <div className="cliqz-news">

        <Pagination items={this.props.news.data}
                    onChangePage={this.onChangePage}
                    updateOpacity={this.updateOpacity} />

        <div className="acordion" style={{height: "141px"}} 
             id="news"
             style={{...styles, opacity: this.state.opacity}}>
          {
            this.state.pageOfItems.map((article, i) => 
              <Article key={i} article={article}/>
            )
          }
        </div>
      </div>
   );
  }
}

export default News;