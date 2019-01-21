import cloneDeep from 'clone-deep';
import Filter from './Filter';

class Search extends Filter {
  urlParam() {
    if (!this.value) {
      return '';
    }

    return `%2B(${this.value})`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      const clone = new Search(original.name);
      clone.value = original.value;
      return clone;
    });
  }
}

export default Search;
