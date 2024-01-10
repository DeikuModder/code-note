type ReturnType<T> = T[] | { message: string };

function addOrPush<T>(array: T[] | undefined, data: T): ReturnType<T> {
  let resultArr: T[] = [];

  if (array && array.length > 0) {
    resultArr = [...array];

    if (array.includes(data)) {
      return { message: "Data already exists in list" };
    }

    array.map((item) => {
      if (!compareObjects(item, data)) {
        return { message: "Data already exists in list" };
      }
    });
  }

  resultArr.push(data);
  return resultArr;
}

function compareObjects(obj1: any, obj2: any) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === "object" && obj1[key] !== null) {
        if (!compareObjects(obj1[key], obj2[key])) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

export default addOrPush;
