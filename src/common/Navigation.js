class Navigation {
  constructor(items) {
    this.items = items;
    this._pointerGroup = -1;
    this._pointerPage = -1;
    this.currentGroup = null;
    this.currentPage = null;
    this.init();
  }

  init() {
    this._pointerGroup = 0;
    this._pointerPage = 0;
    this._groups = this.items[Symbol.iterator]();
    this._currentGroup = this._groups.next().value;
    this._pages = this._currentGroup.pages[Symbol.iterator]();
    this._currentPage = this._pages.next().value;
  }

  rewind() {
    this.init();
    return this.current();
  }

  current() {
    return {
      group: this._currentGroup,
      page: this._currentPage,
    };
  }

  next() {
    const { value, done } = this._pages.next();
    if (done) {
      const { value: $value, done: $done } = this._groups.next();
      if ($done) {
        this._currentGroup = undefined;
        this._currentPage = undefined;
        return this.current();
      }
      this._currentGroup = $value;
      this._pages = this._currentGroup.pages[Symbol.iterator]();
      this._currentPage = this._pages.next().value;
    } else {
      this._currentPage = value;
    }
    return this.current();
  }

  goToView(view) {
    let { page } = this.rewind();
    do {
      ({ page } = this.current());
      if (page && page.view === view) {
        break;
      }
    } while (this.current().group !== undefined && this.next());
    return this.current();
  }

  coming() {
    const { group, page } = this.current();
    console.log(group, page, 'group, pageeee');
    const { group: nextGroup, page: nextPage } = this.next();
    if (group !== undefined) {
      this.goToView(page.view);
    }
    console.log(this.next(), 'this.next()(((');
    return { group: nextGroup, page: nextPage };
  }
}

export default Navigation;
