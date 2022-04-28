import { IsDefinedNotNull } from '../isDefinedNotNull';

export const IsObjectEmpty = (obj: Object) => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    let isEmpty = true;
    for (let key of Object.keys(obj)) {
      if (IsDefinedNotNull(obj[key])) {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      return true;
    } else {
      return false;
    }
  }
};
