import cloneDeep from 'clone-deep';

class Search {
  constructor(name) {
    this.name = name;
    this.search = '';
  }

  setSearch(search) {
    const clone = this.clone();
    clone.search = search;
    return clone;
  }

  urlParam() {
    if (!this.search) {
      return '';
    }

    return `%2B(${this.search})`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      const clone = new Search(original.name);
      clone.search = original.search;
      return clone;
    });
  }
}

export default Search;
