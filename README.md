# Gestão de Atividades de um Time
 
Ferramenta de gestão de trabalho para o time do Ricardo — um quadro Kanban com
indicadores (KPIs) que mostram, num olhar, onde o time está afogado, o que vai
estourar de prazo e o que já foi entregue.
 
Construída em **TypeScript** (React + Vite), com foco em rodar de primeira, sem
nenhuma infraestrutura para configurar.
 
---
 
## Como rodar
 
Pré-requisito: Node.js 18 ou superior.
 
```bash
git clone <url-do-repositorio>
cd gestao-atividades/web
npm install
npm run dev
```
 
Abra o endereço que aparecer no terminal (geralmente `http://localhost:5173`).
 
Ao abrir pela primeira vez, o app já vem populado com um **time fictício** (6
pessoas e 10 tarefas) — nada de telas vazias. As tarefas têm prazos variados de
propósito, incluindo algumas atrasadas, para os indicadores terem o que mostrar.
 
> Os dados ficam salvos no `localStorage` do navegador. Para voltar ao estado
> inicial, limpe os dados do site ou abra numa janela anônima.
 
---
 
## O problema e a metodologia escolhida
 
O Ricardo tem quatro dores, e cada parte da ferramenta ataca uma delas:
 
| Dor do Ricardo | O que a ferramenta faz |
|---|---|
| "Nunca sei o que está em andamento de verdade" | Quadro **Kanban** (A Fazer / Fazendo / Feito) — o trabalho do time inteiro num lugar só |
| "Tem gente afogada e gente ociosa, e só descubro quando reclamam" | KPI de **carga por responsável** |
| "Prazo estoura e eu só sei depois" | KPIs de **atrasadas** e **vence em 3 dias**, com destaque visual |
| "Na reunião de segunda ninguém tem número nenhum" | KPI de **concluídas** + dashboard com os números da semana |
 
**Caminho escolhido: Kanban como espinha dorsal, com uma camada de consciência de
prazo e prioridade.**
 
Por quê: a dor central do Ricardo é *visibilidade* — ele não enxerga o fluxo de
trabalho. O Kanban resolve isso diretamente, mostrando o que está em cada estágio.
Sobre essa base, adicionei prioridade nas tarefas (um toque da **Matriz de
Eisenhower**: urgente × importante) e indicadores de prazo, porque "saber o que
está em andamento" não basta se o Ricardo não percebe o que está prestes a estourar.
 
Considerei e descartei, de propósito, metodologias mais pesadas como **Scrum** e
**OKR**: elas pressupõem ritos (sprints, cerimônias, ciclos de objetivos) que um
time pequeno e informal como o do Ricardo não tem hoje — seria impor processo onde
o problema é falta de visibilidade. Gestão é contexto, não receita.
 
---
 
## Os indicadores e a decisão que cada um gera
 
O desafio é claro: indicador que não gera decisão é enfeite. Cada KPI aqui existe
para o Ricardo tomar uma ação concreta.
 
- **Atrasadas** — tarefas não concluídas cujo prazo já passou.
  *Decisão:* o Ricardo age sobre o que já estourou — cobra, renegocia com o
  cliente ou redistribui — em vez de descobrir tarde demais.
- **Vence em 3 dias** — tarefas ativas com prazo nos próximos 3 dias.
  *Decisão:* ele atua **antes** do prazo estourar, que é exatamente a dor de
  "só fico sabendo depois". É o alerta preventivo.
- **Concluídas** — total de tarefas no estágio Feito.
  *Decisão:* é o número que ele leva para a reunião de segunda, substituindo o
  "acho que foi uma boa semana" por um dado real de entrega.
- **Carga por responsável** — quantas tarefas ativas cada pessoa tem, em barras.
  *Decisão:* o Ricardo enxerga quem está sobrecarregado e quem está ocioso, e
  redistribui o trabalho antes de alguém estourar — sem esperar reclamação.
---
 
## Decisões de tecnologia
 
- **TypeScript + React + Vite** — exigência do desafio (TS) e a stack que melhor
  domino, o que permitiu entregar de ponta a ponta no prazo.
- **Sem backend, persistência em `localStorage`** — a escolha que mais garante o
  "roda de primeira": um `git clone` + `npm install` e está no ar, sem banco de
  dados nem servidor para subir. Toda a persistência está **isolada num único
  módulo** (`src/data/storage.ts`); o resto do app só chama `loadTasks` /
  `saveTasks`. Trocar por um backend (ex: Express + Prisma) seria reescrever
  apenas esse arquivo, sem tocar na interface.
- **CSS puro, sem framework de estilo** — para eliminar setup e concentrar o tempo
  nas funcionalidades que atacam as dores do Ricardo.
- **Estados como _union types_** (`"A fazer" | "Fazendo" | "Feito"`) — tornam
  valores inválidos impossíveis: o compilador barra qualquer status fora da lista,
  e os menus de seleção do formulário saem desses mesmos valores.
---
 
## O que cortei para caber no prazo
 
- **Backend e banco de dados reais** — substituídos por `localStorage`. Mitigado
  pelo isolamento da camada de dados (acima), que deixa a migração simples.
- **Autenticação / multiusuário** — o app assume um único usuário (o Ricardo).
- **Cadastro de pessoas** — o time é fixo, vindo dos dados de exemplo. Só as
  tarefas são editáveis.
- **Drag-and-drop no Kanban** — a movimentação entre colunas é por botões (← →),
  mais simples e sem dependência extra.
- **Limites de WIP (work in progress)** — parte "pura" do Kanban, mas não essencial
  para as dores atuais do Ricardo.
- **Notificações reais (e-mail/push)** — o "avisar antes" é resolvido por destaque
  visual no dashboard, não por notificação ativa.
---
 
## O que eu faria com mais tempo
 
- **Backend Express + Prisma** com banco real, reescrevendo só a camada de
  persistência já isolada.
- **Histórico ao longo do tempo** — throughput por semana e um burndown, para o
  Ricardo ver tendência, não só o instantâneo.
- **Limites de WIP** por coluna, alertando quando "Fazendo" passa de um teto.
- **Filtros e busca** por responsável, prioridade e prazo.
- **Cadastro de pessoas** e edição do time pela interface.
- **Testes automatizados** da lógica de KPIs (cálculo de atrasadas, carga, etc.).
---
 
## Estrutura do projeto
 
```
web/src/
├── types.ts              Tipos centrais (Task, Pessoa, Status, Priority)
├── labels.ts             Rótulos de exibição de status e prioridade
├── kpis.ts               Cálculo dos indicadores (lógica de negócio)
├── data/
│   ├── seed.ts           Dados de exemplo (time fictício, datas relativas a hoje)
│   └── storage.ts        Camada de persistência (localStorage, isolada)
├── hooks/
│   └── tasks.ts          Hook useTasks: estado das tarefas + CRUD + auto-save
└── components/
    ├── kanbanBoard.tsx   Quadro Kanban
    ├── taskForm.tsx      Formulário de criar/editar tarefa
    └── dashboard.tsx     Painel de KPIs
```
