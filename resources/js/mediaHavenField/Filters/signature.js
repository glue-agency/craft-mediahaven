function signature(filters) {
  return filters.map(filter => filter.urlParam()).join('-');
}

export default signature;
