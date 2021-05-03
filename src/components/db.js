import Dexie from 'dexie'

const db = new Dexie('ScrumBoard');
db.version(1).stores({
    tasks: "++id,task,status,description,points,assignedTo",
    columns: "id,title,taskIds"
});


export const getTask = async (id) => {
    await db.tasks.get(id);
}

export const addTask = async (data) => {
    await db.tasks.add({ ...data });
}

export const updateTask = async (id, data) => {
    await await db.tasks.update(id, { ...data })
}

export const deleteTask = async id => {
    await db.tasks.delete(id);
}


export default db;