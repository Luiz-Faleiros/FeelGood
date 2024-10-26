// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/api"; // Importando a função de login
import { useAuth } from "../context/AuthContext"; // Importando o contexto
import { Raleway } from "next/font/google";
import Link from "next/link";
import Cookies from "js-cookie";

const raleway = Raleway({
  subsets: ["latin"],
});

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth(); // Obtendo a função de login do contexto
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      if (data.status) {
        login(); // Chamando a função de login do contexto
        Cookies.set('authToken', data.token, { expires: 7 }); // Salva o token real no cookie
        router.push("/homeLogged"); // Redireciona para a página inicial
      } else {
        setErrorMessage(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setErrorMessage("Erro ao fazer login.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link href="/" className={`${raleway.className} text-black font-bold text-4xl mb-4`}>
        FeelGood
      </Link>
      <form className="bg-white p-6 rounded-2xl shadow-md md:max-w-[30%]" onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-xl mb-4 text-black w-full flex justify-center">Acesse sua conta</h1>
        <div className="mb-4">
          <label className="text-black" htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {errorMessage && <p className="text-red-500 mb-4 w-full flex justify-center">{errorMessage}</p>}
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Login
        </button>
        <p className="mt-4 text-blue-500 cursor-pointer hover:underline text-center">
          Esqueci a senha?
        </p>
      </form>
    </div>
  );
};

export default Login;
