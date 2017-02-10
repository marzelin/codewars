function multilevelsort(records, order) {
  return records.slice().sort(compare(order))
};

const compare = ([{key, direction}, ...restOrders]) => (a, b) => {
	if (a[key] === b[key]) return restOrders.length && compare(restOrders)(a, b)
  switch (direction) {
    case 'ascending': return Number(a[key] > b[key]) * 2 - 1
    case 'descending': return Number(a[key] < b[key]) * 2 - 1
  }
}