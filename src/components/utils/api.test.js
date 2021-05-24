import { cleanup } from "@testing-library/react";
import {
  searchTasksAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  reorderTaskAPI,
  getAllDataFromStorage,
} from "./api";

const sampleTask = {
  content: "Unit Test",
  points: 2,
  column: "column-1",
};

afterEach(() => {
  cleanup();
});

test("Add Task API Test", () => {
  return addTaskAPI(sampleTask).then((data) => {
    const tasks = data.tasks;
    const [task] = Object.values(tasks).filter((task) =>
      task.content.includes("Unit Test")
    );
    expect(task.content).toBe(sampleTask.content);
    expect(task.points).toBe(sampleTask.points);
    expect(task.column).toBe(sampleTask.column);
  });
});

const updateTask = {
  content: "Updated Task Test",
  points: 5,
  column: "column-2",
};

test("Update Task API Test", async () => {
  const { tasks } = await updateTaskAPI("task-1", "column-1", updateTask);
  const [task] = Object.values(tasks).filter((task) =>
    task.content.includes("Updated Task")
  );
  expect(task.content).toBe(updateTask.content);
  expect(task.points).toBe(updateTask.points);
  expect(task.column).toBe(updateTask.column);
});

test("Delete Task API Test", async () => {
  const { tasks, columns } = await deleteTaskAPI("task-2", "column-1");
  expect(Object.values(tasks)).not.toContainObject({ id: "task-2" });
  const taskIds = [...columns["column-1"].taskIds];
  expect(taskIds).not.toContain("task-2");
});

test("Search Task API Test", () => {
  return searchTasksAPI("unit test").then((data) => {
    const firstColumn = Object.values(data)[0];
    const secondColumn = Object.values(data)[1];
    const thirdColumn = Object.values(data)[2];
    const fourthColumn = Object.values(data)[3];
    expect(firstColumn.taskIds.length).toEqual(1);
    expect(secondColumn.taskIds.length).toEqual(0);
    expect(thirdColumn.taskIds.length).toEqual(0);
    expect(fourthColumn.taskIds.length).toEqual(0);
  });
});

describe("reorder", () => {
  test("on same column", () => {
    const resultMock = {
      destination: { droppableId: "column-1", index: 1 },
      source: { index: 0, droppableId: "column-1" },
      draggableId: "task-3",
    };
    const state = getAllDataFromStorage();
    return reorderTaskAPI(resultMock, state, "").then(({ columns }) => {
      const firstColumn = Object.values(columns)[0];
      expect(firstColumn.taskIds[0]).toBe("task-4");
      expect(firstColumn.taskIds[1]).toBe("task-3");
    });
  });

  test("to another column", () => {
    const resultMock = {
      destination: { droppableId: "column-2", index: 1 },
      source: { index: 0, droppableId: "column-1" },
      draggableId: "task-4",
    };
    const state = getAllDataFromStorage();
    return reorderTaskAPI(resultMock, state, "").then(({ columns }) => {
      const firstColumn = Object.values(columns)[1];
      expect(firstColumn.taskIds[1]).toBe("task-4");
    });
  });
});
