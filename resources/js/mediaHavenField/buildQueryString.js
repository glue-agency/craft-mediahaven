function buildQueryString(filters, activeFacetValues) {
  const plusSign = '%2B';
  const params = activeFacetValues.map(value => `${plusSign}(${value.atom})`);

  filters.forEach((filter) => {
    params.push(filter.urlParam());
  })

  return 'q=' + params.join(' ');
}

export default buildQueryString;
