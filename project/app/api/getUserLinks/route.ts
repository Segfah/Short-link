import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';

// API GET para obtener todos los enlaces
export async function GET() {
  try {
    const session = await auth();
    const user = session?.user;
    console.log('User:', user);
    if (!user || !user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const links = await prisma.users.findUnique({
      where: { email: user.email },
      include: { links: true }
    });
    console.log('Links:', links);

    return new Response(JSON.stringify(links), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
