"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLogin = () => {
    router.push("/home");
  };

  const handleSendEmail = () => {
    // Aqui você pode adicionar a lógica para enviar o email
    console.log("Email enviado para:", email);
    setEmail(""); // Limpa o campo de e-mail após o envio
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl mb-4 text-black">Acesse sua conta</h1>
        <form className="bg-white p-6 rounded-2xl shadow-md max-w-[30%]">
          <div className="mb-4">
            <label className="text-black" htmlFor="user">
              Usuário
            </label>
            <input
              type="text"
              id="user"
              placeholder="Usuário"
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4 relative">
            <label className="text-black" htmlFor="pass">
              Senha
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder="Senha"
                className="border p-2 w-full rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex items-center justify-center absolute right-2"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="button" onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full rounded">
            Login
          </button>
          <p
            onClick={() => setIsModalOpen(true)} // Abre o modal
            className="mt-4 text-blue-500 cursor-pointer hover:underline text-center"
          >
            Esqueci a senha?
          </p>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <div className="w-full justify-between flex items-center mb-4">
              <h2 className="text-xl">Recuperar Senha</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Fecha o modal
                className="cursor-pointer"
              >
                X
              </button>
            </div>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={handleEmailChange}
              className="border p-2 rounded-lg w-full mb-4"
            />
            <button
              onClick={handleSendEmail}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
