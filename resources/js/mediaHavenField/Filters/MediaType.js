import Filter from './Filter';

class MediaType extends Filter {
  urlParam() {
    if (!this.value) {
      return '';
    }

    return `%2B(Type:${this.value})`;
  }
}

export default MediaType;
