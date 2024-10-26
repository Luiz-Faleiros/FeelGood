// app/page.tsx
"use client"; // Adicione isso para tornar este um Client Component

import React from "react";
import Navbar from "../components/Navbar";
import UserScores from "../components/UserScores";
import UserProfile from "../components/UsersInformation";
import { downloadUserData } from "../services/api"; // Importa a função de download
import UserDetails from "../components/SearchUser";

const Profile: React.FC = () => {
  const handleDownload = async () => {
    try {
      // Chama a função de download
      const blob = await downloadUserData(); // Faz a requisição GET para baixar os dados

      // Processar a resposta
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'dados_usuarios.csv'; // Nome do arquivo de download
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Falha ao baixar os dados. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-4 items-center justify-center bg-gray-100" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <div className="w-full flex justify-between mb-4">
          <span className="text-xl font-semibold">Download de dados</span>
          <button onClick={handleDownload} className="bg-primary p-2 rounded-full text-white">
            Download planilha
          </button>
        </div>
        <div className="mb-4 w-full">
          <UserProfile />
        </div>
        <UserScores />
        <div className="mt-4 w-full">
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default Profile;
