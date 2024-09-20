const camelToSnakeCase = (input) => input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, '');
const snakeToCamelCase = (input) => input.replace(/(_[a-z])/g, (_, group) => group.toUpperCase().replace('_', ''));

const toSnakeCaseKeys = (data) => {
  const transformedData = {};

  Object.keys(data).forEach((key) => {
    const snakeCaseKey = camelToSnakeCase(key);
    transformedData[snakeCaseKey] = data[key];
  });
  return transformedData;
};

const toCamelCaseKeys = (data) => {
  const transformedData = {};

  Object.keys(data).forEach((key) => {
    const camelCaseKey = snakeToCamelCase(key);
    transformedData[camelCaseKey] = data[key];
  });
  return transformedData;
};

export { toSnakeCaseKeys, toCamelCaseKeys };
