// app/components/Navbar.tsx
import Link from "next/link";
import { Raleway  } from "next/font/google";

const raleway = Raleway ({
  subsets: ["latin"], // Defina os subsets se necessário
});

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary p-4">
      <div  className="container mx-auto flex justify-between">
        <span className={`${raleway.className} text-white font-bold text-4xl`}>FeelGood</span>
        <div className="flex items-center">
          <Link href="/login" className={`${raleway.className} text-white px-4 font-bold text-xl`}>
            Login
          </Link>
          <Link href="/register" className={`${raleway.className} text-white font-bold px-4 text-xl`}>
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
