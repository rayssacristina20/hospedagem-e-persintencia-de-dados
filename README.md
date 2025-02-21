# hospedagem-e-persintencia-de-dados
# Guia de Instalação e Configuração do Sistema de Horas Complementares

## Requisitos
Antes de iniciar a instalação, certifique-se de ter os seguintes itens instalados no seu sistema:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (Recomendado: Versão LTS)
- [Firebase CLI](https://firebase.google.com/docs/cli) (caso utilize Firebase Hosting)

## 1. Clonar o Repositório
Primeiro, clone o repositório do projeto para o seu computador:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
Depois, entre na pasta do projeto:
```bash
cd seu-repositorio
```

## 2. Instalar Dependências
Se o projeto utilizar pacotes JavaScript, instale as dependências com:
```bash
npm install
```

## 3. Configurar o Firebase
Se o sistema usa Firebase para persistência de dados e hospedagem:
1. Configure o Firebase CLI:
```bash
firebase login
```
2. Configure seu projeto:
```bash
firebase init
```
Selecione **Firestore** e/ou **Hosting**, conforme necessário.

## 4. Executar o Sistema Localmente
Para testar o sistema no navegador:
```bash
npm start
```
Ou, se estiver utilizando Firebase Hosting:
```bash
firebase serve
```

## 5. Deploy para Produção
Caso utilize Firebase Hosting, faça o deploy com:
```bash
firebase deploy
```
Se estiver utilizando **Vercel**, faça o deploy com:
```bash
vercel
```

---


