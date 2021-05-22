export const columnOrder = ["column-1", "column-2", "column-3", "column-4"];
export const columns = {
  "column-1": {
    id: "column-1",
    title: "To do",
    taskIds: ["task-1", "task-2", "task-3", "task-4"],
  },
  "column-2": {
    id: "column-2",
    title: "In progress",
    taskIds: [],
  },
  "column-3": {
    id: "column-3",
    title: "Testing",
    taskIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Done",
    taskIds: [],
  },
};

export const tasks = {
  "task-1": {
    id: "task-1",
    content: "Add 2FA on Credit Check",
    points: 5,
    column: "column-1",
  },
  "task-2": {
    id: "task-2",
    content: "Develop Schema for Data Mapping",
    points: 3,
    column: "column-1",
  },
  "task-3": {
    id: "task-3",
    content: "Configure an AWS EC2 Instance",
    points: 2,
    column: "column-1",
  },
  "task-4": {
    id: "task-4",
    content: "Add Billing Button on Dashboard",
    points: 4,
    column: "column-1",
  },
};
