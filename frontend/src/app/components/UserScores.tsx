/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getUserScores } from "../services/api"; // Importa a função getUserScores
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'; // Importa o useRouter para redirecionar

const UserScores: React.FC = () => {
  const [scores, setScores] = useState<any[]>([]); // Estado para armazenar os scores
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro
  const router = useRouter(); // Inicializa o useRouter

  useEffect(() => {
    const fetchUserScores = async () => {
      setLoading(true);
      const token = Cookies.get("authToken"); // Use o cookie correto para autenticação

      if (!token) {
        setError("Usuário não encontrado. Faça o login novamente.");
        router.push('/login'); // Redireciona para a página de login
        setLoading(false);
        return;
      }

      try {
        const data = await getUserScores(token); // Chama a função para buscar os scores do usuário
        setScores(data); // Armazena os dados de scores no estado
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao buscar scores do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserScores();
  }, [router]); // Inclui router como dependência

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 md:min-w-[50%] max-w-full">
      <h2 className="text-2xl mb-4">Histórico de Scores</h2>
      {scores.length === 0 ? (
        <p>Nenhum score encontrado.</p>
      ) : (
        scores.map(score => (
          <ScoreItem key={score._id} score={score} />
        ))
      )}
    </div>
  );
};

const ScoreItem: React.FC<{ score: any }> = ({ score }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // Estado para controlar a expansão do texto

  const toggleExpand = () => {
    setIsExpanded(prev => !prev); // Alterna o estado de expansão
  };

  return (
    <div className="border-b py-2">
      <p><strong>Score:</strong> {score.score}</p>
      <p>
        <strong>Resposta:</strong>
        <span
          className={`block ${isExpanded ? '' : 'line-clamp-3'} overflow-hidden`}
          style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
        >
          {score.response || "Sem resposta"}
        </span>
      </p>
      <button
        onClick={toggleExpand}
        className="text-blue-500 mt-1"
      >
        {isExpanded ? 'Ver menos' : 'Ver mais'}
      </button>
      <p><strong>Criado em:</strong> {new Date(score.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default UserScores;
