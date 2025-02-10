import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { redi_id: string } }) {
    const { redi_id } = await params;

    // Buscar en la base de datos
    const urlEntry = await prisma.links.findUnique({ where: { short_code: redi_id } });
    if (!urlEntry) {
        return NextResponse.json({ error: 'URL no encontrada' }, { status: 404 });
    }

    // Actualizar access_count y last_access
    await prisma.links.update({
        where: { short_code: redi_id },
        data: {
            access_count: { increment: 1 },
            last_access: new Date(),
        },
    });

    if (urlEntry.is_disabled === true) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        return NextResponse.redirect(`${baseUrl}/url-info/${redi_id}`);
    }
    return NextResponse.redirect(urlEntry.original_url);
}
