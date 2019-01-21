function buildQueryString(filters, collection, activeFacetValues) {
  const plusSign = '%2B';
  const params = activeFacetValues.map(value => `${plusSign}(${value.atom})`);

  filters.forEach((filter) => {
    params.push(filter.urlParam());
  })

  if (collection) {
    params.push(`${plusSign}(CollectionsCollection:${collection}*)`);
  }

  return 'q=' + params.join(' ');
}

export default buildQueryString;
