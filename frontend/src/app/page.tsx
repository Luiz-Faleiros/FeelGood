// app/page.tsx
"use client"; // Adiciona a diretiva para tornar o componente um Client Component

import Navbar from "./components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center bg-gray-100 p-4"
        style={{ minHeight: 'calc(100vh - 72px)' }}
      >
        <h2 className="text-black text-3xl font-bold mb-4">
          Descubra seu Potencial de Bem-Estar
        </h2>
        <p className="text-black text-xl text-center w-1/2">
          Bem-vindo ao nosso site, onde você pode realizar um teste de saúde e
          bem-estar para entender melhor suas necessidades e prioridades. Com
          base em suas respostas, oferecemos recomendações personalizadas para
          ajudá-lo a atingir seus objetivos de saúde. Invista em você e comece
          sua jornada rumo a uma vida mais saudável e equilibrada!
        </p>
      </div>
    </div>
  );
};

export default Home;
