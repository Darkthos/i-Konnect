const createQueryParams = (params) => {
  const searchParams = new URLSearchParams();
  const entParams = Object.entries(params);

  entParams.forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

export default createQueryParams;