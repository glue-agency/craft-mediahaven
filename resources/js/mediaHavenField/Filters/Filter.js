class Filter {
  constructor(name) {
    this.name = name;
    this.value = null;
  }

  setValue(value) {
    const clone = this.clone();
    clone.value = value;
    return clone;
  }
}

export default Filter;
