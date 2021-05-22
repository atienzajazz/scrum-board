// @flow
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    quoteMap: result,
  };
};

export function moveBetween(start, finish, source, destination) {
  const startTaskIds = Array.from(start.taskIds);
  const finishTaskIds = Array.from(finish.taskIds);

  const moveFrom =
    source.droppableId === start.id ? startTaskIds : finishTaskIds;
  const moveTo = moveFrom === startTaskIds ? finishTaskIds : startTaskIds;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    [start.id]: {
      ...start,
      taskIds: startTaskIds,
    },
    [finish.id]: {
      ...finish,
      taskIds: finishTaskIds,
    },
  };
}
