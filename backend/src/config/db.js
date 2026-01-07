import { MongoClient } from "mongodb";
import { DB_NAME, DB_URL, TODOS_COLLECTION } from "./env.js";

export const collectionName = TODOS_COLLECTION;

const client = new MongoClient(DB_URL);

export const connection = async () => {
    const connect = await client.connect();
    return await connect.db(DB_NAME);
};


