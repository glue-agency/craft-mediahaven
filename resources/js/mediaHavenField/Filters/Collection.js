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
      return new Collection(original.name, original.value);
    });
  }
}

export default Collection;
