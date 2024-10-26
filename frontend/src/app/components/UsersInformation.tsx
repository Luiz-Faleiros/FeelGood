"use client";

import React, { useEffect, useState } from "react";
import { getUserData } from "../services/api"; // Importa a função getUserData
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'; // Use o import correto para o Next.js 13 e superior

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializa o useRouter

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userId = Cookies.get("userId"); // Obtém o ID do usuário do cookie

      if (!userId) {
        setError("Usuário não encontrado. Faça o login novamente.");
        router.push('/login'); // Redireciona para a página de login
        setLoading(false);
        return;
      }

      try {
        const data = await getUserData(userId); // Chama a função para buscar os dados do usuário
        setUserData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao buscar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    // Verifica se o router está montado antes de chamar fetchUserData
    if (router) {
      fetchUserData();
    }
  }, [router]); // Inclui router como dependência

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 md:min-w-[50%] max-w-full m-4">
      <h2 className="text-2xl mb-4">Dados do Usuário</h2>
      {userData && (
        <div>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Idade:</strong> {userData.age}</p>
          <p><strong>Gênero:</strong> {userData.gender}</p>
          <p><strong>CEP:</strong> {userData.cep}</p>
          <p><strong>Bairro:</strong> {userData.bairro}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
