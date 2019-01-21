import cloneDeep from 'clone-deep';
import Filter from './Filter';

class Collection extends Filter {
  urlParam() {
    if (!this.value) {
      return '';
    }

    return `%2B(CollectionsCollection:${this.value}*)`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      const clone = new Collection(original.name);
      clone.value = original.value;
      return clone;
    });
  }
}

export default Collection;
