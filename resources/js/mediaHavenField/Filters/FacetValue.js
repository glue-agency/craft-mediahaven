import cloneDeep from 'clone-deep';
import Filter from './Filter';

class FacetValue extends Filter {
  urlParam() {
    return `%2B(${this.value.atom})`;
  }

  label() {
    return this.value.label;
  }

  clear() {
    return false;
  }

  clone() {
    return cloneDeep(this, (original) => {
      return new FacetValue(original.name, original.value, original.onClear);
    });
  }
}

export default FacetValue;
