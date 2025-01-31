import { prisma } from '@/app/lib/prisma';

export type LinkInfo = {
  id: number;
  short_code: string;
  original_url: string;
  access_count: number;
  deactivate_in?: Date; // falta
  creation_date: Date;
  updated_date: Date;
  user_id: number;
  last_access?: Date;
  delete_after_2_years: boolean;
  is_disabled: boolean;
  ip_creation?: string;
};


export const getLinkInfo = async (code: string): Promise<LinkInfo | null> => {
  const info = await prisma.links.findUnique({
    where: { short_code: code },
  });

  if (!info) {
    return null;
  }
  return info as LinkInfo;
};