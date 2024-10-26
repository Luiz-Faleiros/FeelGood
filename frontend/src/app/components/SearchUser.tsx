/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getUserScores, getUserData } from "../services/api"; // Importa as funções para buscar os dados do usuário e scores
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const UserDetails: React.FC = () => {
    const [userId, setUserId] = useState<string>(''); // Estado para armazenar o userId
    const [userData, setUserData] = useState<any | null>(null); // Estado para armazenar os dados do usuário
    const [scores, setScores] = useState<any[]>([]); // Estado para armazenar os scores
    const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro
    const router = useRouter();

    const fetchUserDetails = async () => {
        setLoading(true);
        setError(null); // Reseta o erro

        const token = Cookies.get("authToken"); // Use o cookie correto para autenticação
        if (!token) {
            setError("Usuário não encontrado. Faça o login novamente.");
            router.push('/login'); // Redireciona para a página de login
            setLoading(false);
            return;
        }

        try {
            // Chama a função para buscar os dados do usuário
            const data = await getUserData(userId);
            setUserData(data); // Armazena os dados do usuário
            const userScores = await getUserScores(userId); // Busca os scores do usuário
            setScores(userScores); // Armazena os scores
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro ao buscar dados do usuário.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUserDetails(); // Chama a função para buscar os detalhes do usuário
    };

    const handleClear = () => {
        setUserId(''); // Limpa o campo de entrada
        setUserData(null); // Limpa os dados do usuário
        setScores([]); // Limpa os scores
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col bg-white rounded-2xl p-4">
            <h2 className="text-2xl mb-4">Buscar Usuário</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex relative">
                    <input
                        type="text"
                        placeholder="Digite o User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                    <button type="button" onClick={handleClear} className="ml-2 bg-primary text-white rounded p-2">
                        X
                    </button>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary px-2 py-1 rounded-full text-white mt-2 justify-end text-sm">
                        Buscar
                    </button>
                </div>
            </form>

            {userData && (
                <div className="mb-4">
                    <h3 className="text-xl">Dados do Usuário</h3>
                    <p><strong>Nome:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Idade:</strong> {userData.age}</p>
                    <p><strong>Gênero:</strong> {userData.gender}</p>
                    <p><strong>CEP:</strong> {userData.cep}</p>
                    <p><strong>Bairro:</strong> {userData.bairro}</p>
                </div>
            )}

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
            <button onClick={toggleExpand} className="text-blue-500 mt-1">
                {isExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
            <p><strong>Criado em:</strong> {new Date(score.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default UserDetails;
