# ⚡ PokéDex (Work in Progress)

Uma aplicação interativa para exploração de Pokémon, desenvolvida com **JavaScript Vanilla**, focada no consumo técnico da [PokéAPI](https://pokeapi.co/).

---

## 📝 Resumo do Projeto
Este projeto demonstra a integração de APIs RESTful e a manipulação dinâmica do DOM. O objetivo principal é consolidar conceitos de **programação assíncrona** e gerenciamento de requisições encadeadas, onde uma lista inicial de dados é utilizada para disparar buscas detalhadas de cada entidade.

### 🛠️ Tecnologias & Conceitos
* **JS Vanilla (ES6+):** Utilização de `async/await` e `Fetch API`.
* **Encadeamento de Requisições:** Fluxo de dados em dois níveis (Listagem -> Detalhes).
* **Template Literals:** Geração dinâmica de componentes HTML via script.
* **CSS Moderno:** Grid Layout e Flexbox para interface responsiva.

---

## 🏗️ Status: Em Desenvolvimento

Atualmente, o projeto conta com:
- [x] Integração base com a PokéAPI.
- [x] Renderização dinâmica dos primeiros 151 Pokémon.
- [x] Estilização básica dos cards e sistema de grid.
- [x] Estrutura de interface (Header, Search Bar e Pagination).

**Próximas implementações:**
- [x] Lógica funcional para a barra de busca (filtro em tempo real).
- [ ] Implementação da lógica de paginação (offset/limit).
- [ ] Tratamento de erros para falhas na requisição (Try/Catch).
- [ ] Refatoração para melhorar a performance das chamadas (Promise.all).

---

## 🚀 Como Executar
1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/pokedex-js.git](https://github.com/SEU_USUARIO/pokedex-js.git)
