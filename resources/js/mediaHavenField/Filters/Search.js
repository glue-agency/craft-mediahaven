import cloneDeep from 'clone-deep';
import Filter from './Filter';

class Search extends Filter {
  urlParam() {
    if (!this.value) {
      return '';
    }

    return `%2B(${this.value})`;
  }

  label() {
    return `Search: "${this.value}"`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      return new Search(original.name, original.value, original.onClear);
    });
  }
}

export default Search;
