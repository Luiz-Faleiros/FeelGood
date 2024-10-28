# FeelGood

## Descrição do Projeto

FeelGood é um aplicativo projetado para ajudar a saúde psicológica dos usuários. O objetivo do aplicativo é oferecer acompanhamento no tratamento médico com psicólogos e psiquiatras, além de implementar uma Inteligência Artificial (IA) para auxiliar na saúde mental.

## Tecnologias Utilizadas

- **Frontend**: 
  - Next.js
  - TypeScript
  - Tailwind CSS

- **Backend**: 
  - Node.js
  - Express
  - Mongoose
  - JSON Web Token (JWT)

- **Inteligência Artificial**: 
  - IA Gemini

## Estrutura do Projeto

### Backend

```bash
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── interfaces/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── middlewares/
├── app.ts
└── .env
```

### Frontend

```bash
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── fonts/
│   ├── home/
│   ├── homeLogged/
│   ├── login/
│   ├── profile/
│   ├── register/
│   └── services/
├── next.config.ts
└── tailwind.config.ts
```

## Configurações Importantes

# ```package.json``` *(Backend)*

Certifique-se de que o arquivo ```package.json``` do backend tenha os seguintes scripts configurados:

```bash
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node dist/app.js",
    "dev": "ts-node-dev src/app.ts",
    "build": "tsc"
  }
}
```

Esses scripts permitem rodar o servidor em modo de desenvolvimento e construir o projeto.

# ```tsconfig.json``` *(Backend)*

O arquivo ```tsconfig.json``` deve conter as seguintes configurações:

```bash
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Essas opções garantem que o TypeScript esteja configurado corretamente para compilar o código do backend e gerar os arquivos na pasta ```dist```

## Instruções para Execução

## Clonando o Repositório

Para começar, clone o repositório do projeto:

```bash
git clone https://github.com/Luiz-Faleiros/FeelGood.git
```

### Backend

1. Navegue até a pasta do frontend:
```bash
cd backend
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm run dev
```

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o aplicativo:
```bash
npm run dev
```

### Contribuidores

- Luiz Mario - Frontend
- Icaro - Backend
- Alyson - Backend
- Roberto - Documentação

### Objetivo do Aplicativo

O FeelGood foi desenvolvido com a intenção de ser uma ferramenta eficaz para o acompanhamento psicológico, oferecendo suporte tanto para os usuários quanto para os profissionais da saúde mental. A IA incorporada ajuda a fornecer recomendações e suporte adicional, contribuindo para a saúde mental de todos os usuários.

## Documentação

Você pode encontrar a documentação completa [aqui](docs).
