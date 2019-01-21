import cloneDeep from 'clone-deep';

class Collection {
  constructor(name) {
    this.name = name;
    this.collection = null;
  }

  setCollection(collection) {
    const clone = this.clone();
    clone.collection = collection;
    return clone;
  }

  urlParam() {
    if (!this.collection) {
      return '';
    }

    return `%2B(CollectionsCollection:${this.collection}*)`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      const clone = new Collection(original.name);
      clone.collection = original.collection;
      return clone;
    });
  }
}

export default Collection;
