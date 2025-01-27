import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
                <Link href="/abaout" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    À propos
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="/terms-of-service" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Conditions Générales d'Utilisation
                </Link>
            </div>
            <div className="px-5 py-2">
                <a href="mailto:corozco.dev+st@gmail.com" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Contact
                </a>
            </div>
        </nav>
        {/* Sección 2: Iconos */}
        <div className="flex justify-center mt-8 space-x-6">
            <a
                href="https://github.com/Segfah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
            >
                <FaGithub size={24} />
            </a>
            <a
                href="https://www.youtube.com/@Corozco-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
            >
                <FaYoutube size={24} />
            </a>
            <a
                href="https://www.linkedin.com/in/42corozco/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
            >
                <FaLinkedin size={24} />
            </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © {new Date().getFullYear()} Segfah. Sous {" "}
            <a
            href="https://github.com/Segfah/Short-link/blob/main/LICENSE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-400"
            >
            LICENCE MIT.
            </a>
          </p>
      </div>
    </footer>
  );
};

export default Footer;
