import React, { Component } from 'react';
import Pagination from './Pagination';
import Article from './Article';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: []
    }

    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div className="cliqz-news">

        <Pagination items={this.props.news.data} onChangePage={this.onChangePage} />

        <div className="acordion" style={{height: "141px"}} id="news">
          {
            this.state.pageOfItems.map((article, i) => 
              <Article article={article}/>
            )
          }
        </div>
      </div>
   );
  }
}

export default News;