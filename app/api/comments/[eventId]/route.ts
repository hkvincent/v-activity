import { NextRequest } from 'next/server';
import {
  connectDatabase,
  insertDocument,
  getDocumentsByEventId,
} from '../../../helpers/db-util'
export async function GET(request: Request, { params }: { params: { eventId: string }; },
) {
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    return new Response(JSON.stringify({ message: 'DB connect fail' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  try {
    const documents = await getDocumentsByEventId(client, 'comments', params.eventId, { _id: -1 })
    return new Response(JSON.stringify({ comments: documents }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  } finally {
    client.close()
  }
}

export async function POST(request: NextRequest, { params }: { params: { eventId: string }; }) {
  const body = await request.json();
  const userEmail = body.email; const { email, name, text } = body
  if (
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !text ||
    text.trim() === ''
  ) {
    return new Response(JSON.stringify({ message: 'input invaild' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 422,
    })

  }

  const newComment = {
    email,
    name,
    text,
    params: params.eventId,
  }
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    return new Response(JSON.stringify({ message: 'DB connect fail' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
  let result
  try {
    result = await insertDocument(client, 'comments', newComment)
    return new Response(JSON.stringify({ message: 'add comment successful', comment: newComment }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

}