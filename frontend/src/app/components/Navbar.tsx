"use client";

import Link from "next/link";
import { Raleway } from "next/font/google";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionar
import {  useState } from "react"; // Importando useState e useEffect


const raleway = Raleway({
  subsets: ["latin"],
});

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtendo o estado de autenticação
  const router = useRouter(); // Inicializando o roteador
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu



  const handleLogout = () => {
    logout(); // Chama a função de logout
    router.push("/"); // Redireciona para a página inicial
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  const handleLogoClick = () => {
    // Redireciona dependendo do estado de autenticação
    if (isAuthenticated) {
      router.push("/homeLogged");
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span 
          className={`${raleway.className} text-white font-bold text-4xl cursor-pointer`} 
          onClick={handleLogoClick} // Adicionando o manipulador de clique
        >
          FeelGood
        </span>

        {/* Ícone de hambúrguer para mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Overlay escuro quando o menu está aberto */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10" // Fundo escuro
            onClick={toggleMenu} // Fecha o menu ao clicar no fundo
          />
        )}

        {/* Menu de navegação */}
        <div
          className={`fixed top-0 right-0 h-screen w-10/12 bg-primary transition-transform duration-300 ease-in-out z-20 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`} // Adiciona a classe de transformação e transição suave
        >
          <div className="flex flex-col justify-start items-start h-full w-full pt-4">
            {/* Botão para fechar o menu */}
            <div className="flex justify-end w-full pr-4">
              <button onClick={toggleMenu} className="text-white text-2xl">
                &times; {/* "X" para fechar */}
              </button>
            </div>

            {/* Links de navegação para mobile */}
            <div className="flex flex-col">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className={`${raleway.className} text-white px-4 py-2 font-bold text-xl`}
                  >
                    Perfil
                  </Link>
                  <span
                    className={`${raleway.className} text-white px-4 py-2 font-bold text-xl cursor-pointer`}
                    onClick={handleLogout} // Atualizando para usar a nova função de logout
                  >
                    Sair
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`${raleway.className} text-white px-4 py-2 font-bold text-xl`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`${raleway.className} text-white font-bold px-4 py-2 text-xl`}
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Links de navegação visíveis em dispositivos desktop */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className={`${raleway.className} text-white font-bold text-xl`}
              >
                Perfil
              </Link>
              <span
                className={`${raleway.className} text-white font-bold text-xl cursor-pointer`}
                onClick={handleLogout}
              >
                Sair
              </span>
            </>
          ) : (
            <>
              <Link href="/login" className={`${raleway.className} text-white font-bold text-xl`}>
                Login
              </Link>
              <Link href="/register" className={`${raleway.className} text-white font-bold text-xl`}>
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
