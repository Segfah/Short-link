import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

function generateCode() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let code = '';

  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return code.split('').sort(() => Math.random() - 0.5).join('');
}

async function generateUniqueCode() {
  let short_code;
  let exists;

  do {
    short_code = generateCode();
    exists = await prisma.links.findUnique({
      where: { short_code },
    });
  } while (exists);

  return short_code;
}

const validateUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // Verifica que el protocolo sea específicamente HTTPS
    return parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};


// API POST para crear un nuevo link
export async function POST(request: NextRequest) {
  try {
    // Leer el body de la request
    const body = await request.json();
    const { originalUrl } = body;

    // Validar que la URL existe
    if (!originalUrl) {
      return NextResponse.json(
        { error: 'URL no proporcionada' },
        { status: 400 }
      );
    }

    // Validar que es una URL válida
    if (!validateUrl(originalUrl)) {
      return NextResponse.json(
        { error: 'Solo se permiten URLs HTTPS' },
        { status: 400 }
      );
    }

    const short_code = await generateUniqueCode();
    const session = await auth();
    const user = session?.user;
    let userId = null;
    if (user && user.email) {
      const userRecord = await prisma.users.findUnique({
        where: { email: user.email },
        select: { id: true }
      });
      userId = userRecord?.id || null;
    }
    const newLink = await prisma.links.create({
      data: {
        original_url: originalUrl,
        short_code,
        user_id: userId,
      },
    });

    return NextResponse.json({ 
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${newLink.short_code}`
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// API GET para obtener todos los enlaces
export async function GET() {
  try {
    const links = await prisma.links.findMany();
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
