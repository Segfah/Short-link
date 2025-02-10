"use client";

import {
  HomeModernIcon,
  DocumentMagnifyingGlassIcon,
  LinkIcon,
  //ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User } from 'next-auth';

// Links públicos (sin autenticación)
const publicLinks = [
  { name: "Accueil", href: "/", icon: HomeModernIcon},
  { name: "Statistiques", href: "/url-info", icon: DocumentMagnifyingGlassIcon},
];

// Links adicionales para usuarios autenticados
const authenticatedLinks = [
  { name: "Mes Liens", href: "/my_links", icon: LinkIcon},
];

// Links para administradores
/*
  const adminLinks = [
    { name: "Tableau de Bord Liens", href: "/admin", icon: ComputerDesktopIcon},
  ];
*/

export function NavLinks({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const linksToShow = [
    ...publicLinks,
    ...(user ? authenticatedLinks : [])
  ];
  return (
    <>
      <div className="hidden sm:flex sm:items-center">
        {linksToShow.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-sky-700"
                  : "text-gray-800"
              } text-sm font-semibold hover:text-sky-700 mr-4 flex items-center`}
            >
              <LinkIcon className="w-6 h-6 mr-2" />
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export function NavLinksMobile({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const linksToShow = [
    ...publicLinks,
    ...(user ? authenticatedLinks : [])
  ];
  return (
<>
      {linksToShow.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-sky-700"
                : "text-gray-800"
            } text-gray-800 text-sm font-semibold hover:text-sky-700 mb-1`}
          >
            <LinkIcon className="w-6 h-6 mr-1" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}