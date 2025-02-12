import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

async function authenticateUser() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.email) {
    throw new Error('Non autorisé');
  }
  const email = user.email as string;
  const userAdmin = await prisma.users.findUnique({
    where: { email },
    select: {
      is_admin: true
    }
  });

  if (!userAdmin?.is_admin) {
    throw new Error('Non autorisé');
  }
  return user;
}

export async function GET() {
  try {
    await authenticateUser();
    const userData = await prisma.links.findMany({
      select: {
        id: true,
        creation_date: true,
        is_disabled: true,
        original_url: true,
        short_code: true,
        updated_date: true,
        user_id: true
      }
    });

    return new Response(JSON.stringify({ links: userData || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message === 'Non autorisé' ? 401 : 500;
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
    await authenticateUser();

    await prisma.links.delete({
      where: {
        short_code: short_code
      }
    });

    return new Response(JSON.stringify('Link deleted successfully'), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error as Error;
    const status = err.message === 'Non autorisé' ? 401 : 500;
    return new Response(JSON.stringify({ error: err.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}