"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LoginModal from "../components/LoginModal";
import { loginUser } from "../services/api";

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      if (data.success) {
        router.push("/home"); // Redireciona para a página Home
      } else {
        setErrorMessage(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 text-black">Acesse sua conta</h1>
      <form
        className="bg-white p-6 rounded-2xl shadow-md max-w-[30%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label className="text-black" htmlFor="user">Usuário</label>
          <input
            type="text"
            id="user"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4 relative">
          <label className="text-black" htmlFor="pass">Senha</label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Login
        </button>
        <p
          onClick={() => setIsModalOpen(true)}
          className="mt-4 text-blue-500 cursor-pointer hover:underline text-center"
        >
          Esqueci a senha?
        </p>
      </form>
      
      {/* Modal para Recuperar Senha */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSendEmail={() => console.log("Enviar email para:", email)}
      />
    </div>
  );
};

export default Login;
