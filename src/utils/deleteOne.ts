type ReturnType<T> = T[] | { error: string };

function deleteOne<T>(array: T[] | undefined, index: number): ReturnType<T> {
  let filteredArr: T[] = [];

  if (array && array.length > 0) {
    if (index === -1 || index > array?.length) {
      return { error: "Item doesn't exist" };
    }

    filteredArr = [...array];

    filteredArr.splice(index, 1);

    return filteredArr;
  }

  return { error: "List is empty" };
}

export default deleteOne;
