// app/components/LoginModal.tsx
import React from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendEmail: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  email,
  onEmailChange,
  onSendEmail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <div className="w-full justify-between flex items-center mb-4">
          <h2 className="text-xl">Recuperar Senha</h2>
          <button onClick={onClose} className="cursor-pointer">
            X
          </button>
        </div>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={onEmailChange}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <button onClick={onSendEmail} className="bg-blue-500 text-white p-2 rounded w-full">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
