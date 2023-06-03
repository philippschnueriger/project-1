export default function sortItemsBy(items, sort) {
  const sortType = {
    // eslint-disable-next-line no-nested-ternary
    string: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
    number: (a, b) => a - b,
  };
  const sortFn = sortType[typeof items[0][sort]];
  return [...items].sort((a, b) => sortFn(a[sort], b[sort]));
}
