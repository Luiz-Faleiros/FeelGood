// app/page.tsx
"use client"; // Certifique-se de que este arquivo esteja marcado como um componente de cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionar
import { useAuth } from "../context/AuthContext"; // Importando o contexto de autenticação
import Navbar from "../components/Navbar";
import Questionnaire from "../components/Questionnaire";

const Home: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Obtendo o estado de autenticação

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <h1 className="text-4xl mb-4 mt-4">Questionário</h1>
        <Questionnaire />
      </div>
    </div>
  );
};

export default Home;
