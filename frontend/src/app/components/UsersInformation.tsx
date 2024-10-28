/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getUserData, getUserId } from "../services/api"; // Importa a função getUserData
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'; // Use o import correto para o Next.js 13 e superior
import { FaCheck, FaClipboard } from 'react-icons/fa'; // Importa apenas o ícone de check

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUser] = useState<any>();
  const [copied, setCopied] = useState<boolean>(false); // Estado para controlar a exibição do ícone de check
  const router = useRouter(); // Inicializa o useRouter

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = Cookies.get("authToken"); // Use o cookie correto para autenticação
      setUser(token);
      if (!token) {
        setError("Usuário não encontrado. Faça o login novamente.");
        router.push('/login'); // Redireciona para a página de login
        setLoading(false);
        return;
      }

      try {
        const data = await getUserData(token); // Use o token para buscar os dados do usuário
        setUserData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao buscar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]); // Inclui router como dependência

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true); // Altera o estado para indicar que o texto foi copiado
        setTimeout(() => setCopied(false), 2000); // Reseta o estado após 2 segundos
      })
      .catch(err => alert("Falha ao copiar: " + err));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 w-full">
      <h2 className="text-2xl mb-4">Dados do Usuário</h2>
      {userData && (
        <div>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Idade:</strong> {userData.age}</p>
          <p><strong>Gênero:</strong> {userData.gender}</p>
          <p><strong>CEP:</strong> {userData.cep}</p>
          <p><strong>Bairro:</strong> {userData.bairro}</p>
          <p className="flex items-center w-full flex-wrap">
            <strong>Número de Identificação:</strong> <span>{userId} </span>
            <button
              onClick={() => copyToClipboard(userId)}
              className="ml-2 text-black hover:text-gray-700" // Altera a cor do ícone de copiar para preto
              aria-label="Copiar número de identificação"
              disabled={copied} // Desabilita o botão após a cópia
            >
              {!copied && <FaClipboard />} {/* Exibe ícone de check verde se copiado */}
            </button>
            {copied && <FaCheck className="ml-2 text-green-500" aria-label="Copiado!" />} {/* Ícone de check verde */}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
