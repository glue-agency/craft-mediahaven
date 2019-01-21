function buildQueryString(search, collection, activeFacetValues) {
  const plusSign = '%2B';
  const filters = activeFacetValues.map(value => `${plusSign}(${value.atom})`);

  if (search) {
    filters.push(`${plusSign}(${search})`);
  }

  if (collection) {
    filters.push(`${plusSign}(CollectionsCollection:${collection}*)`);
  }

  return 'q=' + filters.join(' ');
}

export default buildQueryString;
