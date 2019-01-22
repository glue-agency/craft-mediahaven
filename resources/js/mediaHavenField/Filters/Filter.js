class Filter {
  constructor(name, value = null, onClear = () => {}) {
    this.name = name;
    this.value = value;
    this.onClear = onClear;
  }

  isActive() {
    return !!this.value;
  }

  clear() {
    this.onClear();

    return this.setValue(null);
  }

  setValue(value) {
    const clone = this.clone();
    clone.value = value;
    return clone;
  }
}

export default Filter;
