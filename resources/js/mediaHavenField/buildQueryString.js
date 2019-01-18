function buildQueryString(search, activeFacetValues) {
  const filters = activeFacetValues.map(value => value.atom);

  if (search) {
    filters.push(`+(${search})`);
  }

  return 'q=' + filters.join(' ');
}

export default buildQueryString;
