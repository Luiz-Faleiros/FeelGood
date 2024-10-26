// app/register/page.tsx
import Navbar from '../components/Navbar';

const Register: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl mb-4">Cadastrar</h1>
                <form className="bg-white p-6 rounded shadow-md">
                    <input
                        type="text"
                        placeholder="Nome"
                        className="border p-2 mb-4 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 mb-4 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border p-2 mb-4 w-full"
                    />
                    <button className="bg-blue-500 text-white p-2 w-full rounded">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
