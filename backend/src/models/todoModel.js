export async function insertTodo(collection, payload) {
    return await collection.insertOne(payload);
}

export async function listTodos(collection, userId) {
    return await collection.find({ userId }).toArray();
}

export async function findTodoById(collection, userId, id) {
    return await collection.findOne({ _id: id, userId });
}

export async function updateTodoById(collection, userId, id, update) {
    return await collection.updateOne({ _id: id, userId }, update);
}

export async function deleteTodoById(collection, userId, id) {
    return await collection.deleteOne({ _id: id, userId });
}

export async function deleteTodosByIds(collection, userId, ids) {
    return await collection.deleteMany({ _id: { $in: id }, userId });  // MongoDB $in operator
}