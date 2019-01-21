function buildQueryString(filters) {
  const query = filters
    .map(filter => filter.urlParam())
    .filter(filter => filter)
    .join(' ');

  return 'q=' + query;
}

export default buildQueryString;
