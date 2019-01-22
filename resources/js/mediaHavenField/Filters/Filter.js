class Filter {
  constructor(name, value = null) {
    this.name = name;
    this.value = value;
  }

  isActive() {
    return !!this.value;
  }

  clear() {
    return this.setValue(null);
  }

  setValue(value) {
    const clone = this.clone();
    clone.value = value;
    return clone;
  }
}

export default Filter;
