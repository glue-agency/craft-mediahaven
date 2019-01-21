function buildQueryString(search, collection, activeFacetValues) {
  const filters = activeFacetValues.map(value => value.atom);

  if (search) {
    filters.push(`+(${search})`);
  }

  if (collection) {
    filters.push(`+(CollectionsCollection:${collection}*)`);
  }

  return 'q=' + filters.join(' ');
}

export default buildQueryString;
