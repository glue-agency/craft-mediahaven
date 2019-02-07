function buildQueryString(filters) {
  const query = filters
    .map(filter => encodeURIComponent(filter.urlParam()))
    .filter(filter => filter)
    .join(' ');

  return 'q=' + query;
}

export default buildQueryString;
