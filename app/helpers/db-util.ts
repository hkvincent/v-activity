import { MongoClient } from 'mongodb'

export async function connectDatabase() {
    const client = await MongoClient.connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017',
    )
    return client
}


export async function insertDocument(client: { db: () => any }, collection: any, document: any) {
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)
    return result
}

export async function findDoumentsByEmail(client: { db: () => any }, collection: any, email: any) {
    const db = client.db()
    const documents = db.collection(collection);
    const query = { email };
    let user = []
    try {
        user = await documents.find(query).toArray()
    } catch (error) {
        console.log("getDocumentsByEventId" + error)
    }

    console.log("getDocumentsByEventId" + user)
    return user
}


export async function getAllDocuments(client: { db: () => any }, collection: any, sort: any) {
    const db = client.db()
    const documents = await db.collection(collection).find().sort(sort).toArray()
    return documents
}

export async function getDocumentsByEventId(client: { db: () => any }, collection: any, eventId: any, sort: any) {
    const db = client.db()
    const documents = db.collection(collection);
    const query = { eventId: eventId };
    const options = {
        sort: sort,
    };
    let myEvent = []
    try {
        myEvent = await documents.find(query, options).toArray()
    } catch (error) {
        console.log("getDocumentsByEventId" + error)
    }

    console.log("getDocumentsByEventId" + myEvent)
    return myEvent
}

