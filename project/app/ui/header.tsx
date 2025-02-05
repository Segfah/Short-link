import Link from "next/link";
import Image from "next/image";
import { NavLinks, NavLinksMobile } from "./nav-links";
import AuthButton from "./auth-button";

const Header = () => {
  return (
    <header className="bg-gray-100">
      <div className="bg-gray-100 font-sans w-full m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            {/* Input de control para el menú móvil (solo en pantallas pequeñas) */}
            <input
              type="checkbox"
              id="mobile-menu-toggle"
              className="peer hidden sm:hidden"
            />

            {/* Fila superior del header */}
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <div>
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={55}
                    height={55}
                    alt="Logo"
                  />
                </Link>
              </div>

              {/* Menú en pantallas grandes */}
              <NavLinks />

              {/* Botones de Sign In y Sign Up */}
              <AuthButton is_mobile={false}/>

              {/* Botón de menú móvil (solo visible en pantallas pequeñas) */}
              <div className="sm:hidden">
                <label
                  htmlFor="mobile-menu-toggle"
                  className="cursor-pointer inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-sky-700"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.95,17c-.23,1.14-1.24,2-2.45,2-1.21,0-2.22-0.86-2.45-2H3.5c-.28,0-.5-.22-.5-.5s.22-.5.5-.5h4.55c.23-1.14,1.24-2,2.45-2,1.21,0,2.22.86,2.45,2H20.5c.28,0,.5.22.5.5s-.22.5-.5.5H12.95Zm6-5c-.23,1.14-1.24,2-2.45,2-1.21,0-2.22-0.86-2.45-2H3.5c-.28,0-.5-.22-.5-.5s.22-.5.5-.5h10.55c.23-1.14,1.24-2,2.45-2,1.21,0,2.22.86,2.45,2H20.5c.28,0,.5.22.5.5s-.22.5-.5.5H18.95Zm-9-5c-.23,1.14-1.24,2-2.45,2-1.21,0-2.22-0.86-2.45-2H3.5C3.22,7,3,6.78,3,6.5S3.22,6,3.5,6h1.55c.23-1.14,1.24-2,2.45-2,1.21,0,2.22.86,2.45,2H20.5c.28,0,.5.22.5.5s-.22.5-.5.5H7.95Z"
                    />
                  </svg>
                </label>
              </div>
            </div>

            {/* Menú móvil: se muestra debajo del header al activarse el input */}

            <div className="sm:hidden peer-checked:block hidden bg-white  py-2">
              <div className="flex flex-col block sm:hidden">
                <NavLinksMobile />
                <AuthButton is_mobile={true}/>
              </div>
            </div>


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;