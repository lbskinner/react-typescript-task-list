const getNewId = (object: IColumns | ITasks, type: string) => {
  // store all current ids (column or task) in an array
  const currentIds = Object.keys(object);
  let newId: string;
  // if there are no columns/task exist
  if (currentIds.length === 0) {
    // set column/task id to column-1 or task-1
    newId = `${type}-1`;
  } else {
    // get the last column/task id
    const lastId = currentIds[currentIds.length - 1];
    const lastIdNum = parseInt(lastId.split("-")[1]);
    newId = `${type}-${lastIdNum + 1}`;
  }
  return newId;
};

export default getNewId;
