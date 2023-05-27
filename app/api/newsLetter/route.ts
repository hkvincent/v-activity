import { connectDatabase, findDoumentsByEmail, insertDocument } from '../../helpers/db-util'


export async function POST(req: Request) {

  const body = await req.json();
  const userEmail = body.email;


  if (!userEmail || !userEmail.includes('@')) {
    return new Response(JSON.stringify({ message: 'email is invalid' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 422,
    })
  }

  //将邮箱地址保存到数据库
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
    const user = await findDoumentsByEmail(client, 'newsletter', userEmail);
    if(user.length > 0){
      return new Response(JSON.stringify({ message: 'user  exist' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 422,
      })
    }
    await insertDocument(client, 'newsletter', { email: userEmail })
    client.close()
  } catch (error) {
    return new Response(JSON.stringify({ message: 'register fail' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
  return new Response(JSON.stringify({ message: 'successful' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  })
}