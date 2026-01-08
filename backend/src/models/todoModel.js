export async function insertTodo(collection, payload) {
    return await collection.insertOne(payload);
}

export async function listTodos(collection) {
    return await collection.find({}).toArray();
}

export async function findTodoById(collection, id) {
    return await collection.findOne({ _id: id });
}

export async function updateTodoById(collection, id, update) {
    return await collection.updateOne({ _id: id }, update);
}

export async function deleteTodoById(collection, id) {
    return await collection.deleteOne({ _id: id });
}

export async function deleteTodosByIds(collection, ids) {
    return await collection.deleteMany({ _id: { $in: ids } });
}