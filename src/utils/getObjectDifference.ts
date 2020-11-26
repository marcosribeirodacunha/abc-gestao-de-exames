import { isEqual, isObject, transform } from 'lodash';

type Object = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/ban-types
export default function getObjectDifference(object: Object, base: Object) {
  return transform(object, (result: any, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? getObjectDifference(value, base[key])
          : value;
    }
  });
}
