<h1 align="center"><img src="https://i.ibb.co/JzDvNwN/AB-Capa.png" alt="Alerta Brumadinho" width="100%" height="auto"></h1>

# Alerta Brumadinho | [Acessar](https://alertabrumadinho.netlify.app/)

### Informações Gerais
Este repositório contém o código-fonte do **front-end** do Alerta Brumadinho, uma plataforma aberta para registrar ocorrências ambientais em Brumadinho - MG. Para mais informações sobre o projeto, veja: https://github.com/cewebbr/mover-se_alerta-brumadinho.

Este projeto foi desenvolvido, inicialmente, dentro do programa Mover-se na Web - Articulação Pró-Brumadinho, que surgiu em 2019, através da parceria do Centro de Estudos sobre Tecnologias Web (Ceweb.br) e do Ministério da Ciência, Tecnologia e Inovações (MCTI), com apoio do Núcleo de Informação e Coordenação do Ponto BR (NIC.br) e Comitê Gestor da Internet no Brasil (CGI.br). O programa tem como objetivo ajudar a comunidade da cidade de Brumadinho/MG, atingida pelo rompimento da barragem no mesmo ano, através do fomento de projetos que utilizem tecnologias abertas da Web e empreendedorismo.

[![Software License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cewebbr/mover-se_alerta-brumadinho)

### Equipe

Os desenvolvedores do projeto são: [Lucas Vinicius Ribeiro](https://github.com/lucasvribeiro), [Lucas Souza Santos](https://github.com/souzalucas) e [Igor Scaliante Wiese](https://github.com/igorwiese).

# Instalação e Execução

### Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/)

### Pré-requisitos

- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com)

### Etapas para executar o projeto:

#### 1. No terminal

```bash
# Clone este repositório
$ git clone https://github.com/cewebbr/mover-se_alerta-brumadinho.git

# Acesse a pasta do front-end do projeto no terminal
$ cd mover-se_alerta-brumadinho/frontend

# Crie um arquivo `.env` na raiz do diretório /frontend

# Instale as dependências
$ npm install

```

####  2. Configuração das variáveis de ambientes

Abra o arquivo `.env` na raiz do diretório /frontend e configure as variáveis de ambiente

```bash
# Endereço do back-end da aplicação (ex: <http://localhost:3001> ou a url do serviço onde o back-end está executando)
REACT_APP_BACKEND_URL = ''

# Url da API do Cloudinary onde serão hospedadas as imagens da aplicação (foto de perfil de usuário e imagens das denúncias)
REACT_APP_CLOUDINARY_URL = ''

# API Key disponibilizada pelo Cloudinary
REACT_APP_CLOUDINARY_API_KEY = ''

# Valor do upload preset disponibilizado pelo Cloudinary
REACT_APP_CLOUDINARY_UPLOAD_PRESET = ''
```

####  3. Executando a aplicação
```bash
# Execute a aplicação com o seguinte comando
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
