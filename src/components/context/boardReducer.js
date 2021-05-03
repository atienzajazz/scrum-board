import LocalStorage from "../utils/LocalStorage";

const INITIALIZE_STORAGE = "INITIALIZE_STORAGE";
const SET_DATA_STATE = "SET_DATA_STATE";
const REORDER_TASKS = "REORDER_TASKS";
const SEARCH_TASK = "SEARCH_TASK";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";


export const initialState = {
    tasks: {},
    columns: {},
    columnOrder: [],
};

const getAllDataFromStorage = () => {
    let tasksData = {};
    tasksData.tasks = LocalStorage.get('tasks');
    tasksData.columns = LocalStorage.get('columns');
    tasksData.columnOrder = LocalStorage.get('columnOrder');
    return tasksData;
}


export const actions = {
    initialize: () => async (dispatch) => {
        LocalStorage.init();
        dispatch({ type: INITIALIZE_STORAGE })
    },

    setDataState: () => async (dispatch) => {
        const columns = LocalStorage.get('columns');
        const tasks = LocalStorage.get('tasks');
        const columnOrder = LocalStorage.get('columnOrder');
        dispatch({ type: SET_DATA_STATE, columns, tasks, columnOrder });
    },

    searchTasks: (searchInput) => async (dispatch) => {
        const { tasks: currentTasks, columns: currentColumns } = getAllDataFromStorage();

        // Collect keys and values.
        const taskValues = Array.from(Object.values(currentTasks));
        const taskKeys = Array.from(Object.keys(currentTasks));

        let filtered = taskValues.filter(task => {
            const taskContent = task.content.toLowerCase();
            return taskContent.includes(searchInput);
        });

        const newTasks = {}

        // Use foreach to generate the new tasks state
        filtered.forEach((value) => {
            newTasks[value.id] = value;
        })

        // Generate the new Tasks IDs on each Column
        let newTaskIds = {};
        filtered.forEach(task => {
            newTaskIds[task.column] = [];
        });
        filtered.forEach(task => {
            newTaskIds[task.column] = [
                ...newTaskIds[task.column],
                task.id
            ];
        });
        const newColumns = { ...currentColumns };
        const columnKeys = Object.keys(currentColumns);
        columnKeys.forEach(key => {
            newColumns[key].taskIds = [];
        });

        const entries = Object.entries(newTaskIds);
        entries.forEach(([key, value]) => {
            newColumns[key] = {
                ...newColumns[key],
                taskIds: value
            }
        })
        dispatch({ type: SEARCH_TASK, tasks: newTasks, columns: newColumns });

    },

    addTask: (submitData) => async (dispatch) => {
        const { tasks: currentTasks, columns: currentColumns } = getAllDataFromStorage();
        let id = "task-" + Math.random().toString(16).slice(2);

        // Add the task to Local Storage
        const newTask = {
            ...submitData,
            id: id
        }
        const newTasksOnStorage = {
            ...currentTasks,
            [id]: newTask
        }
        LocalStorage.set('tasks', newTasksOnStorage);

        // Handle the columns
        let newTaskIds = currentColumns[submitData.column].taskIds;
        newTaskIds.push(id);
        const newColumns = {
            ...currentColumns,
            [submitData.column]: {
                ...currentColumns[submitData.column],
                taskIds: newTaskIds
            }
        }

        LocalStorage.set('columns', newColumns);
        dispatch({ type: ADD_TASK, columns: newColumns, tasks: newTasksOnStorage })
    },

    updateTask: (taskId, startColumnId, submitData) => async (dispatch) => {
        const { tasks: currentTasks, columns: currentColumns } = getAllDataFromStorage();

        const finishColumnId = submitData.column;

        const start = currentColumns[startColumnId];
        const finish = currentColumns[finishColumnId];

        const newTasksOnStorage = {
            ...currentTasks,
            [taskId]: {
                id: taskId,
                ...submitData
            }
        }
        LocalStorage.set('tasks', newTasksOnStorage);
        if (startColumnId === submitData.column) {
            LocalStorage.set('tasks', newTasksOnStorage);
            LocalStorage.set('columns', currentColumns);
            await dispatch({ type: UPDATE_TASK, tasks: newTasksOnStorage, columns: currentColumns });
            return;
        }



        const startTaskIds = Array.from(start.taskIds).filter(ctaskId => ctaskId !== taskId);

        // Handle the chosen column
        let finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.push(taskId);
        const newColumns = {
            ...currentColumns,
            [startColumnId]: {
                ...currentColumns[startColumnId],
                taskIds: startTaskIds
            },
            [finishColumnId]: {
                ...currentColumns[finishColumnId],
                taskIds: finishTaskIds
            }
        }

        LocalStorage.set('columns', newColumns);
        await dispatch({ type: UPDATE_TASK, tasks: newTasksOnStorage, columns: newColumns });
    },

    deleteTask: (id, columnId) => async (dispatch) => {
        const { tasks, columns } = getAllDataFromStorage();

        // Delete the current task and update its Local Storage
        delete tasks[id];
        LocalStorage.set('tasks', tasks);

        // Delete the task ID mapping on the columns
        const newTaskIds = columns[columnId].taskIds.filter((taskId) => taskId !== id);
        const newColumns = {
            ...columns,
            [columnId]: {
                ...columns[columnId],
                taskIds: newTaskIds
            }
        }
        LocalStorage.set('columns', newColumns);
        dispatch({ type: DELETE_TASK, tasks, columns: newColumns })
    },

    reorderTaskAndColumns: (result, state) => async (dispatch) => {
        const { destination, source, draggableId } = result;
        const { columns } = state;
        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        const newTaskIds = [...start.taskIds];


        if (start === finish) {
            // Rearrange tasks ID's
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            // Set the new Column arrangement
            const newColumns = {
                ...columns,
                [newColumn.id]: newColumn
            }
            LocalStorage.set('columns', newColumns);
            dispatch({ type: REORDER_TASKS, columns: newColumns })
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newColumns = {
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        }
        LocalStorage.set('columns', newColumns);
        dispatch({ type: REORDER_TASKS, columns: newColumns })
    }
};

export function reducer(state = initialState, action) {
    const { tasks, columns, columnOrder } = action;
    switch (action.type) {
        case SET_DATA_STATE:
            return {
                ...state,
                tasks,
                columns,
                columnOrder
            }
        case REORDER_TASKS:
            return {
                ...state,
                columns
            }
        case SEARCH_TASK:
            return {
                ...state,
                tasks,
                columns
            }
        case ADD_TASK:
            return {
                ...state,
                tasks,
                columns
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks,
                columns
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks,
                columns
            }
        default:
            return state;
    }
}
