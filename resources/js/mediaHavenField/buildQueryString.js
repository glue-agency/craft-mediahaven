function buildQueryString(search) {
  let queryString = '';

  if (search) {
    queryString = `q=+(${search})`;
  }

  return queryString;
}

export default buildQueryString;
