import Component, { tracked } from "@glimmer/component";

export default class extends Component {
  autopaginationInterval = 4000;
  articleHeight = 0;
  @tracked currentPage = 0;
  autopagination = true;
  skipNextPagination = false;

  @tracked ('args')
  get articles() {
    const model = this.args.model || [];
    return model;
  }

  @tracked ('args')
  get pageCount() {
    const model = this.args.model || [];
    return Math.ceil(model.length / 3);
  }

  @tracked ('pageCount')
  get pages() {
    return Array(this.pageCount).fill(null);
  }

  didInsertElement() {
    window.newsReady();
    const acordion = this.element.querySelector('.acordion');
    const articles = Array.from(this.element.querySelectorAll('.article'));
    const heights = articles.map(el => ({
      offsetHeight: el.offsetHeight,
      clientHeight: el.clientHeight,
    }));
    const maxOffsetHeight = Math.max(...heights.map(el => el.offsetHeight));
    const maxClientHeight = Math.max(...heights.map(el => el.clientHeight));

    // + 10 is padding
    this.articleHeight = maxOffsetHeight + 10;
    articles.forEach(el => el.style.height = maxClientHeight + "px");
    acordion.style.height = this.articleHeight + "px";

    this.startAutopagination();
  }

  onMouseOver() {
    this.autopagination = false;
  }

  onMouseOut() {
    this.autopagination = true;
  }

  startAutopagination() {
    this.interval = setInterval(() => {
      if (!this.element) {
        clearInterval(this.interval);
        delete this.interval;
        return;
      }

      if (!this.autopagination) {
        this.skipNextPagination = true;
        return;
      }

      if (this.skipNextPagination) {
        this.skipNextPagination = false;
        return;
      }

      let nextPage = this.currentPage + 1;
      if (nextPage === this.pageCount) {
        nextPage = 0;
      }

      this.setPage(nextPage);
    }, this.autopaginationInterval);
  }

  setPage(index) {
    const acordion = this.element.querySelector('.acordion');
    acordion.scrollTop = this.articleHeight * index;
    this.currentPage = index;
  }
}
