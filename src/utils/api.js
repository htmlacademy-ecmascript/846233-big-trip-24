const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, '');
const snakeToCamelCase = (str) => str.replace(/(_[a-z])/g, (_, group) => group.toUpperCase().replace('_', ''));

const toSnakeCaseKeys = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const snakeCaseKey = camelToSnakeCase(key);
    newObj[snakeCaseKey] = obj[key];
  });
  return newObj;
};

const toCamelCaseKeys = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const camelCaseKey = snakeToCamelCase(key);
    newObj[camelCaseKey] = obj[key];
  });
  return newObj;
};

export { toSnakeCaseKeys, toCamelCaseKeys };
