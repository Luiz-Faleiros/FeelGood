/* eslint-disable prefer-const */
"use client"; // Indica que este é um componente de cliente

import React, { useState } from "react";
import { registerUser } from '../services/api'; // Importando a função de registro
import Link from "next/link";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
});
const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        cep: "",
        bairro: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        cep: "",
        bairro: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Resetando o erro do campo
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));

        // Resetando a mensagem de sucesso ao alterar os dados
        setSuccessMessage("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const validateFields = () => {
        let valid = true;
        let newErrors = { ...errors };

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key as keyof typeof newErrors] = "Este campo é obrigatório.";
                valid = false;
            }
        });

        // Validação do CEP (formato: 00000-000)
        if (formData.cep && !/^\d{5}-?\d{3}$/.test(formData.cep)) {
            newErrors.cep = "CEP inválido. Formato esperado: 00000-000";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFields()) {
            return; // Não envia os dados se a validação falhar
        }

        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: Number(formData.age),
                gender: formData.gender,
                cep: formData.cep,
                bairro: formData.bairro,
            });
            setSuccessMessage("Usuário cadastrado com sucesso!"); // Exibe a mensagem de sucesso
            setFormData({
                name: "",
                email: "",
                password: "",
                age: "",
                gender: "",
                cep: "",
                bairro: "",
            }); // Limpa o formulário
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, submit: "Erro ao cadastrar usuário." })); // Se houver erro, exibe mensagem
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full md:h-screen bg-gray-100">
            <Link href="/" className={`${raleway.className} text-black font-bold text-4xl mb-4`}>
                FeelGood
            </Link>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-2xl" onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4 w-full flex justify-center">Cadastrar</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.password ? 'border-red-500' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            name="age"
                            placeholder="Idade"
                            value={formData.age}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.age ? 'border-red-500' : ''}`}
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>
                    <div className="relative">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="">Selecione o gênero</option>
                            <option value="Male">Masculino</option>
                            <option value="Female">Feminino</option>
                            <option value="Others">Outros</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="cep"
                            placeholder="CEP"
                            value={formData.cep}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.cep ? 'border-red-500' : ''}`}
                        />
                        {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="bairro"
                            placeholder="Bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            className={`border p-2 mb-4 w-full ${errors.bairro ? 'border-red-500' : ''}`}
                        />
                        {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro}</p>}
                    </div>
                </div>
                <button className="bg-blue-500 text-white p-2 w-full rounded">
                    Cadastrar
                </button>
                {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>} {/* Mensagem de sucesso */}
            </form>
        </div>
    );
};

export default Register;
