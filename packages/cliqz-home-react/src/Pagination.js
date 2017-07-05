import React, { Component, PropTypes } from 'react';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    }
    this.timer = null;
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  autoRotate() {
    clearInterval(this.timer);
    this.timer = setInterval( () => {
      const pager = this.state.pager;
      const currentPage = this.state.pager.currentPage;
      const totalPages = this.state.pager.totalPages;
      if (currentPage === totalPages) {
        pager.currentPage = 1
      } else {
        pager.currentPage = currentPage + 1;
      }
      this.setState({
        pager: pager
      });
      this.setPage(this.state.pager.currentPage);
    }, 5000);
  }

  animate(setNextPage) {
    clearInterval(this.timer);
    this._fadeOut().then(() => {
      setNextPage();
      this._fadeIn();
    });
  }

  setPage(page) {
    this.animate( () => {
      this._setNextPage(page);
    });
    this.autoRotate();
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 3;
    var totalPages = Math.ceil(totalItems / pageSize);
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [];
    for(var i = 1; i<= totalPages; i++) {
      pages.push(i);
    }

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  _setNextPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager: pager });

    setTimeout(() => {
      this.props.onChangePage(pageOfItems);
    }, 400);
  }

  _fadeOut() {
    return this.props.updateOpacity(0);
  }

  _fadeIn() {
    setTimeout(() => {
      this.props.updateOpacity(1)
    }, 500);
  }

  render() {
    let pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    const newsItems = pager.pages.map((page, index) => {
      return <a key={index} className={"button " + ( (page === pager.currentPage) ? 'active' : '') } onClick={() => this.setPage(page)}></a>
    }
    );
    return (
      <div>{newsItems}</div>
    )
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;