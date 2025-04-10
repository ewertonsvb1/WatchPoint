# Watchpoint 🎥

**Watchpoint** é uma aplicação web desenvolvida com **Angular** que permite aos usuários explorar, favoritar e visualizar detalhes de filmes e séries.  
A aplicação utiliza a API **OMDb** para buscar informações sobre títulos, oferecendo uma interface moderna e responsiva.

---

## ✨ Funcionalidades

- 🎬 **Catálogo de Filmes e Séries**: Pesquise por títulos e veja detalhes como gênero, duração, idioma, sinopse e mais.
- ⭐ **Favoritos**: Adicione títulos à sua lista de favoritos e gerencie com facilidade.
- 📝 **Anotações**: Registre observações personalizadas sobre filmes e séries.
- 🌟 **Votação**: Avalie com estrelas os títulos assistidos.
- 🔗 **Filmes Relacionados**: Descubra filmes similares ao que está visualizando.
- 🎭 **Filtro por Gênero**: Explore categorias para encontrar filmes por gênero.

---

## 🛠️ Tecnologias Utilizadas

- **Angular** – Framework principal da aplicação.
- **Bootstrap** – Layout responsivo e moderno.
- **FontAwesome** – Ícones na interface.
- **SweetAlert2** – Alertas e notificações interativas.
- **OMDb API** – Fonte de dados de filmes e séries.
- **LocalStorage** – Persistência de dados como favoritos e anotações.

---

## 📁 Estrutura do Projeto

```plaintext
src/
├── app/
│   ├── app.component.ts          # Componente principal
│   ├── app.routes.ts             # Configuração de rotas
│   ├── pages/
│   │   ├── home/                 # Página de busca
│   │   ├── favoritos/            # Página de favoritos
│   │   ├── categorias/           # Filtro por gênero
│   │   ├── detalhes/             # Detalhes de filmes
│   ├── services/
│   │   ├── omdb.service.ts       # Integração com a API OMDb
│   ├── model/
│   │   ├── filme.model.ts        # Modelo de dados de filme
├── environments/
│   ├── environment.ts            # Config. ambiente dev
│   ├── environment.prod.ts       # Config. ambiente prod
├── styles.css                    # Estilos globais

````
## 🖥️ Como Rodar o Projeto:

✔️ Pré-requisitos

    Node.js (v16 ou superior)

    Angular CLI (v18.2.8 ou superior)

## 📦 Instalação

git clone https://github.com/ewertonsvb1/watchpoint.git

cd watchpoint

npm install

## 🔐 Configurar a API Key do OMDb
    Copie o arquivo de exemplo:
  
    cp src/environments/environment.example.ts src/environments/environment.ts
    cp src/environments/environment.example.ts src/environments/environment.prod.ts

  Substitua SUA_API_KEY_AQUI pela sua chave da OMDb API.

## ▶️ Rodar em Desenvolvimento

ng serve

Acesse em: http://localhost:4200


## 🤝 Contribuição

Contribuições são super bem-vindas!
Sinta-se à vontade para abrir issues ou enviar pull requests. 😄

## ✍️ Autor

Desenvolvido por Ewerton Silva.
