import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { redi_id: string } }) {
    const { redi_id } = await params;

    // Buscar en la base de datos
    const urlEntry = await prisma.links.findUnique({ where: { short_code: redi_id } });

    if (!urlEntry) {
        return NextResponse.json({ error: 'URL no encontrada' }, { status: 404 });
    }

    return NextResponse.redirect(urlEntry.original_url);
}
