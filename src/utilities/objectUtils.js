import isEqual from 'lodash.isequal';
import transform from 'lodash.transform';

export function getDeepDifference(newObj, originalObj) {
  return transform(newObj, (result, value, key) => {
    if (!isEqual(value, originalObj[key])) {
      result[key] =
        typeof value === 'object' && value !== null && originalObj[key]
          ? getDeepDifference(value, originalObj[key])
          : value;
    }
  });
}
