class Filter {
  constructor(name, value = null) {
    this.name = name;
    this.value = value;
  }

  setValue(value) {
    const clone = this.clone();
    clone.value = value;
    return clone;
  }
}

export default Filter;
