import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

async function authenticateUser() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.email) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function GET() {
  try {
    const user = await authenticateUser();
    const email = user.email as string;
    const links = await prisma.users.findUnique({
      where: { email },
      include: { links: true }
    });

    return new Response(JSON.stringify(links), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return new Response(JSON.stringify({ error: err.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { short_code, original_url, is_disabled } = body;

  try {
    const user = await authenticateUser();
    const email = user.email as string;
    const userRecord = await prisma.users.findUnique({
      where: { email }
    });

    if (!userRecord) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedLink = await prisma.links.update({
      where: {
        short_code: short_code,
        user_id: userRecord.id
      },
      data: {
        original_url,
        is_disabled
      }
    });

    return new Response(JSON.stringify(updatedLink), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const err = error as Error;
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return new Response(JSON.stringify({ error: err.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { short_code } = body;
  try {
    const user = await authenticateUser();
    const email = user.email as string;
    const userRecord = await prisma.users.findUnique({
      where: { email }
    });

    if (!userRecord) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedLink = await prisma.links.delete({
      where: {
        short_code: short_code,
        user_id: userRecord.id
      }
    });

    return new Response(JSON.stringify(deletedLink), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return new Response(JSON.stringify({ error: err.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}