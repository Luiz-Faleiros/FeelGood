import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://c465-187-72-143-220.ngrok-free.app';

export const loginUser = async (email: string, password: string) => {
  // Validação básica de entrada
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Tratamento de erro baseado na resposta da API
      if (error.response) {
        // O servidor respondeu com um código de status fora do intervalo 2xx
        const { status, message } = error.response.data; // Aqui você extrai status e message
        console.error('Erro na resposta da API:', error.response.data);
        throw new Error(`Erro ${status}: ${message || 'Erro ao fazer login.'}`);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Erro na requisição:', error.request);
        throw new Error('Servidor não está respondendo. Tente novamente mais tarde.');
      } else {
        // Alguma outra coisa aconteceu ao configurar a requisição
        console.error('Erro:', error.message);
        throw new Error('Erro ao fazer login. Tente novamente.');
      }
    } else {
      console.error('Erro inesperado:', error);
      throw new Error('Erro ao fazer login. Tente novamente.');
    }
  }
};

export const calculateScore = async (responses: any[]) => {
  // Validação básica de entrada
  if (!Array.isArray(responses) || responses.length === 0) {
    throw new Error('Respostas devem ser um array e não podem estar vazias.');
  }

  // Recuperar o userId do cookie
  const userId = Cookies.get('userId'); // Substitua 'userId' pelo nome do cookie onde você armazena o ID do usuário

  try {
    const response = await axios.post(`${API_BASE_URL}/api/scores/calculate`, { responses, userId });
    return response.data; // Aqui você receberá o número real e o score
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Tratamento de erro baseado na resposta da API
      if (error.response) {
        const { status, message } = error.response.data;
        console.error('Erro na resposta da API:', error.response.data);
        throw new Error(`Erro ${status}: ${message || 'Erro ao calcular o score.'}`);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
        throw new Error('Servidor não está respondendo. Tente novamente mais tarde.');
      } else {
        console.error('Erro:', error.message);
        throw new Error('Erro ao calcular o score. Tente novamente.');
      }
    } else {
      console.error('Erro inesperado:', error);
      throw new Error('Erro ao calcular o score. Tente novamente.');
    }
  }
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  cep: string;
  bairro: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, message } = error.response.data;
        console.error("Erro na resposta da API:", error.response.data);
        throw new Error(`Erro ${status}: ${message || 'Erro ao registrar usuário.'}`);
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        throw new Error("Servidor não está respondendo. Tente novamente mais tarde.");
      } else {
        console.error("Erro:", error.message);
        throw new Error("Erro ao registrar usuário. Tente novamente.");
      }
    } else {
      console.error("Erro inesperado:", error);
      throw new Error("Erro ao registrar usuário. Tente novamente.");
    }
  }
};

export const getUserData = async (userId: string) => {
  if (!userId) {
    throw new Error("O userId é necessário para buscar os dados do usuário.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
    
    if (response.status === 204) {
      throw new Error("Nenhum dado encontrado para o usuário com este ID.");
    }

    console.log(response.data); // Log para ver os dados retornados
    return response.data; // Retorna os dados do usuário
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, message } = error.response.data;
        console.error("Erro na resposta da API:", error.response.data);
        throw new Error(`Erro ${status}: ${message || 'Erro ao buscar dados do usuário.'}`);
      } else {
        console.error("Erro inesperado:", error);
        throw new Error("Erro ao buscar dados do usuário. Tente novamente.");
      }
    } else {
      console.error("Erro inesperado:", error);
      throw new Error("Erro ao buscar dados do usuário. Tente novamente.");
    }
  }
};
