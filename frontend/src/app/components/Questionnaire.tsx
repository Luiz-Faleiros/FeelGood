// app/components/Questionnaire.tsx
"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { calculateScore, getUserData, sendUserDataToChatbot } from "../services/api"; // Importando as funções necessárias

const questions = [
  "Eu não me sinto particularmente satisfeito com o jeito que sou",
  "Sou uma pessoa muito interessada em outras pessoas",
  "Sinto que a vida é muito gratificante",
  "Tenho sentimentos muito afetivos em relação a quase todos",
  "Raramente acordo me sentindo cansado",
  "Eu não estou, particularmente, otimista em relação ao futuro",
  "Sinto que a maioria das minhas experiências são divertidas",
  "Estou sempre comprometido e envolvido com várias iniciativas",
  "A vida é boa",
  "Eu não acho que o mundo seja um bom lugar para viver",
  "Eu me encontro, sempre sorrindo muito",
  "Estou bem satisfeito com tudo em minha vida",
  "Eu não me sinto uma pessoa atraente",
  "Existe uma lacuna entre o que gostaria de fazer e o que faço",
  "Estou muito feliz",
  "Eu encontro beleza e harmonia nas coisas",
  "Sempre consigo provocar alegria nas pessoas",
  "Sempre encontro tempo para tudo que quero realizar",
  "Sinto que não tenho controle da minha vida",
  "Sinto-me capaz de levar diversas iniciativas adiante",
  "Eu me considero uma pessoa mentalmente alerta",
  "Muitas vezes me sinto experimentando alegria e euforia",
  "Sinto que não é fácil tomar decisões, em várias situações",
  "Sinto não ter um significado e propósito em minha vida",
  "Sinto que tenho um nível elevado de energia",
  "Eu geralmente exerço uma boa influência sobre os acontecimentos",
  "Não costumo me divertir com outras pessoas",
  "Não me sinto, particularmente, uma pessoa saudável",
  "Não tenho, particularmente, lembranças felizes do meu passado",
];

const alternatives = [
  "Discordo completamente",
  "Discordo moderadamente",
  "Discordo minimamente",
  "Concordo minimamente",
  "Concordo moderadamente",
  "Concordo completamente",
];

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [isHoveringNext, setIsHoveringNext] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [happinessLevel, setHappinessLevel] = useState<{ title: string; description: string } | null>(null);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponseChange = (value: number) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await calculateScore(responses);
      setScore(result.score); // Acesse a propriedade "score" do objeto result

      // 1. Recuperar o token do cookie
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Usuário não encontrado. Faça o login novamente.");
      }

      // 2. Obter os dados do usuário
      const userData = await getUserData(token);
      
      // 3. Preparar os dados para enviar ao chatbot
      const chatbotData = {
        userId: token, // Você pode ajustar isso conforme necessário
        name: userData.name,
        age: userData.age,
        gender: userData.gender,
        score: result.score,
      };

      // 4. Enviar dados ao chatbot
      const response = await sendUserDataToChatbot(chatbotData);
      
      setHappinessLevel({
        title: "Resultado do Chatbot",
        description: response.response, // Use a descrição da resposta do chatbot
      });
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 md:min-w-[50%] max-w-full m-4">
      {score === null ? (
        <>
          <h2 className="text-2xl mb-4">{questions[currentQuestionIndex]}?</h2>

          <div className="text-sm mb-2 text-right">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </div>

          <div className="flex flex-col mb-4 w-full gap-2">
            {alternatives.map((alternative, index) => (
              <label key={index} className="flex w-full items-center mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index + 1}
                  onChange={() => handleResponseChange(index + 1)}
                  checked={responses[currentQuestionIndex] === index + 1}
                />
                <span className="ml-2">{alternative}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between w-full">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <div className="relative">
              {responses[currentQuestionIndex] === 0 && isHoveringNext && (
                <div className="absolute bottom-full right-0 mt-1 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                  Responda à pergunta antes de avançar.
                </div>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() => {
                    if (responses[currentQuestionIndex] > 0) {
                      handleNext();
                    }
                  }}
                  className={`bg-blue-500 text-white p-2 rounded transition duration-300 ease-in-out ${
                    responses[currentQuestionIndex] === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                  onMouseEnter={() => setIsHoveringNext(true)}
                  onMouseLeave={() => setIsHoveringNext(false)}
                  aria-label="Próximo"
                >
                  Próximo
                </button>
              ) : (
                responses.every((response) => response > 0) && (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white p-2 rounded mt-4"
                  >
                    {loading ? (
                      <div className="animate-spin inline-block w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    ) : (
                      "Enviar Respostas"
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Seu Score: {score}</h2>
          {happinessLevel && (
            <>
              <h3 className="text-xl font-semibold mb-2">{happinessLevel.title}</h3>
              <p className="text-base">{happinessLevel.description}</p>
            </>
          )}
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setResponses(Array(questions.length).fill(0));
              setScore(null);
              setHappinessLevel(null);
            }}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Responder novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
