import LocalStorage from "./LocalStorage";
import reorder, { moveBetween } from "./reorder";

export const getAllDataFromStorage = () => {
  let tasksData = {};
  tasksData.tasks = LocalStorage.get("tasks");
  tasksData.columns = LocalStorage.get("columns");
  tasksData.columnOrder = LocalStorage.get("columnOrder");
  return tasksData;
};

export const searchTasksAPI = (searchInput) => {
  return new Promise((resolved, rejected) => {
    const { tasks: currentTasks, columns: currentColumns } =
      getAllDataFromStorage();

    let newColumns = {
      ...currentColumns,
    };

    const columnKeys = Object.keys(currentColumns);
    columnKeys.forEach((columnKey) => {
      const currentColumnTaskIds = [...currentColumns[columnKey].taskIds];

      const newTaskIds = currentColumnTaskIds.filter((taskId) => {
        const taskContent = currentTasks[taskId].content.toLowerCase();
        return taskContent.includes(searchInput.toLowerCase());
      });

      newColumns[columnKey] = {
        ...newColumns[columnKey],
        taskIds: newTaskIds,
      };
    });
    resolved(newColumns);
  });
};

export const addTaskAPI = (submitData) => {
  return new Promise((resolved, rejected) => {
    const { tasks: currentTasks, columns: currentColumns } =
      getAllDataFromStorage();
    let id = "task-" + Math.random().toString(16).slice(2);

    // Add the task to Local Storage
    const newTask = {
      ...submitData,
      id: id,
    };
    const newTasksOnStorage = {
      ...currentTasks,
      [id]: newTask,
    };
    LocalStorage.set("tasks", newTasksOnStorage);

    // Handle the columns
    let newTaskIds = currentColumns[submitData.column].taskIds;
    newTaskIds.push(id);
    const newColumns = {
      ...currentColumns,
      [submitData.column]: {
        ...currentColumns[submitData.column],
        taskIds: newTaskIds,
      },
    };

    LocalStorage.set("columns", newColumns);
    resolved({ tasks: newTasksOnStorage, columns: newColumns });
  });
};

export const updateTaskAPI = (taskId, startColumnId, submitData) => {
  return new Promise((resolved) => {
    const { tasks: currentTasks, columns: currentColumns } =
      getAllDataFromStorage();

    const finishColumnId = submitData.column;

    const start = currentColumns[startColumnId];
    const finish = currentColumns[finishColumnId];

    const newTasksOnStorage = {
      ...currentTasks,
      [taskId]: {
        id: taskId,
        ...submitData,
      },
    };
    LocalStorage.set("tasks", newTasksOnStorage);

    if (startColumnId === submitData.column) {
      LocalStorage.set("columns", currentColumns);
      resolved({
        tasks: newTasksOnStorage,
        columns: currentColumns,
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds).filter(
      (ctaskId) => ctaskId !== taskId
    );

    // Handle the chosen column
    let finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.push(taskId);

    // Generate New Columns
    const newColumns = {
      ...currentColumns,
      [startColumnId]: {
        ...currentColumns[startColumnId],
        taskIds: startTaskIds,
      },
      [finishColumnId]: {
        ...currentColumns[finishColumnId],
        taskIds: finishTaskIds,
      },
    };

    LocalStorage.set("columns", newColumns);
    resolved({
      tasks: newTasksOnStorage,
      columns: newColumns,
    });
  });
};

export const deleteTaskAPI = (id, columnId) => {
  return new Promise((resolved) => {
    const { tasks, columns } = getAllDataFromStorage();
    // Delete the current task and update its Local Storage
    delete tasks[id];
    LocalStorage.set("tasks", tasks);

    // Delete the task ID mapping on the columns
    const newTaskIds = columns[columnId].taskIds.filter(
      (taskId) => taskId !== id
    );

    // Generate New Columns
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: newTaskIds,
      },
    };
    LocalStorage.set("columns", newColumns);
    resolved({ tasks, columns: newColumns });
  });
};

function isSameSpot(destination, source) {
  // Code checks if the destination and source is the same
  return (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  );
}

export const reorderTaskAPI = (result, state, searchBarValue) => {
  return new Promise((resolve) => {
    const { destination, source, draggableId } = result;
    const { columns: currentColumns } = getAllDataFromStorage();
    const { columns: stateColumns } = state;

    if (isSameSpot(destination, source)) {
      return;
    }
    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    const start = currentColumns[startColumnId];
    const finish = currentColumns[finishColumnId];

    // Get the tasks IDs from storage
    const startTaskIds = Array.from(start.taskIds);
    // Get current State
    const stateTaskIds = Array.from(stateColumns[startColumnId].taskIds);

    // Reorder when on the same Column
    if (start === finish) {
      let newTaskIds;
      if (searchBarValue) {
        const temp = startTaskIds.filter(
          (taskId) => !stateTaskIds.includes(taskId)
        );
        newTaskIds = reorder(stateTaskIds, source.index, destination.index);
        newTaskIds = [...newTaskIds, ...temp];
      } else {
        newTaskIds = reorder(startTaskIds, source.index, destination.index);
      }

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      // Set the new Column arrangement
      const newColumns = {
        ...currentColumns,
        [newColumn.id]: newColumn,
      };
      LocalStorage.set("columns", newColumns);
      resolve({ columns: newColumns });
      return;
    }

    // Moving from one list to another
    let moved;
    if (startTaskIds !== stateTaskIds) {
      moved = moveBetween(
        start,
        finish,
        { ...source, index: startTaskIds.indexOf(draggableId) },
        destination
      );
    } else {
      moved = moveBetween(start, finish, source, destination);
    }

    const newColumns = {
      ...currentColumns,
      ...moved,
    };
    LocalStorage.set("columns", newColumns);
    resolve({ columns: newColumns });
  });
};
