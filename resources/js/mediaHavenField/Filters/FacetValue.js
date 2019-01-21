import cloneDeep from 'clone-deep';
import Filter from './Filter';

class FacetValue extends Filter {
  urlParam() {
    return `%2B(${this.value.atom})`;
  }

  clone() {
    return cloneDeep(this, (original) => {
      return new FacetValue(original.name, original.value);
    });
  }
}

export default FacetValue;
