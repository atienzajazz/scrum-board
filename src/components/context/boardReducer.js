import LocalStorage from "../utils/LocalStorage";
import {
  getAllDataFromStorage,
  searchTasksAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  reorderTaskAPI,
} from "../utils/api";

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

export const actions = {
  initialize: () => async (dispatch) => {
    LocalStorage.init();
  },

  // Set Starting State of The Application
  setDataState: () => async (dispatch) => {
    const data = getAllDataFromStorage();
    dispatch({ type: SET_DATA_STATE, ...data });
  },

  searchTasks: (searchInput) => async (dispatch) => {
    const newColumns = await searchTasksAPI(searchInput);
    dispatch({ type: SEARCH_TASK, columns: newColumns });
  },

  addTask: (submitData) => async (dispatch) => {
    const { columns, tasks } = await addTaskAPI(submitData);
    dispatch({ type: ADD_TASK, columns, tasks });
  },

  updateTask: (taskId, startColumnId, submitData) => async (dispatch) => {
    const { tasks, columns } = await updateTaskAPI(
      taskId,
      startColumnId,
      submitData
    );
    dispatch({
      type: UPDATE_TASK,
      tasks,
      columns,
    });
  },

  deleteTask: (id, columnId) => async (dispatch) => {
    const { tasks, columns } = await deleteTaskAPI(id, columnId);
    dispatch({ type: DELETE_TASK, tasks, columns });
  },

  reorderTaskAndColumns: (result, state) => async (dispatch) => {
    const searchBarValue = document.getElementById("search-input").value;
    const { columns } = await reorderTaskAPI(result, state, searchBarValue);

    if (searchBarValue) {
      actions.searchTasks(searchBarValue.toLowerCase())(dispatch);
      return;
    }

    dispatch({ type: REORDER_TASKS, columns });
  },
};

export function reducer(state = initialState, action) {
  const { tasks, columns, columnOrder } = action;
  switch (action.type) {
    case SET_DATA_STATE:
      return {
        ...state,
        tasks,
        columns,
        columnOrder,
      };
    case REORDER_TASKS:
      return {
        ...state,
        columns,
      };
    case SEARCH_TASK:
      return {
        ...state,
        columns,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks,
        columns,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks,
        columns,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks,
        columns,
      };
    default:
      return state;
  }
}
