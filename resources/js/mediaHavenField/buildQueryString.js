function buildQueryString(filters) {
  const query = filters
    .map(filter => filter.urlParam().replace('&', '%26'))
    .filter(filter => filter)
    .join(' ');

  return 'q=' + query;
}

export default buildQueryString;
