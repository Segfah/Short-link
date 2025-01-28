import {
  HomeModernIcon,
  DocumentMagnifyingGlassIcon,
  LinkIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { name: "Accueil", href: "/", icon: HomeModernIcon},
  { name: "Statistiques", href: "/url-info", icon: DocumentMagnifyingGlassIcon},
  { name: "Mes Liens", href: "#", icon: LinkIcon},
  { name: "Tableau de Bord Liens", href: "#", icon: ComputerDesktopIcon},
]

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden sm:flex sm:items-center">
        {links.map((link) => {
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

export function NavLinksMobile(){
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
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