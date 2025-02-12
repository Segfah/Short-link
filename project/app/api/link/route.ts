import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

async function authenticateUser() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.email) {
    throw new Error('Non autorisé');
  }
  return user;
}

export async function GET() {
  try {
    const user = await authenticateUser();
    const email = user.email as string;
    const userData = await prisma.users.findUnique({
      where: { email },
      select: {
        links: {
          select: {
            id: true,
            creation_date: true,
            is_disabled: true,
            original_url: true,
            short_code: true,
            updated_date: true,
          }
        }
      }
    });

    return new Response(JSON.stringify({ links: userData?.links || [] }), {
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
      return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.links.update({
      where: {
        short_code: short_code,
        user_id: userRecord.id
      },
      data: {
        original_url,
        is_disabled
      }
    });

    return new Response(JSON.stringify('Lien mis à jour avec succès'), {
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
    const user = await authenticateUser();
    const email = user.email as string;
    const userRecord = await prisma.users.findUnique({
      where: { email }
    });

    if (!userRecord) {
      return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.links.delete({
      where: {
        short_code: short_code,
        user_id: userRecord.id
      }
    });

    return new Response(JSON.stringify('Lien supprimé avec succès'), {
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