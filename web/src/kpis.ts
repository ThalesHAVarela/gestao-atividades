import type { Task } from "./types";
import { people } from "./data/seed";

const hoje = () => new Date().toISOString().slice(0, 10);

// uma tarefa está ativa se ainda não foi concluída
function ativa(t: Task): boolean {
  return t.status !== "Feito";
}

// KPI 1 — carga por responsável (fala 2: quem está afogado / ocioso)
export function cargaPorResponsavel(tasks: Task[]) {
  return people.map((pessoa) => ({
    nome: pessoa.name,
    quantidade: tasks.filter((t) => t.assigneeId === pessoa.id && ativa(t)).length,
  }));
}

// KPI 2 — prazos (fala 3: agir antes de estourar)
export function indicadoresDePrazo(tasks: Task[]) {
  const h = hoje();
  const atrasadas = tasks.filter((t) => ativa(t) && t.dueDate < h).length;
  const venceEm3Dias = tasks.filter((t) => {
    if (!ativa(t)) return false;
    const limite = new Date();
    limite.setDate(limite.getDate() + 3);
    const limiteStr = limite.toISOString().slice(0, 10);
    return t.dueDate >= h && t.dueDate <= limiteStr;
  }).length;
  return { atrasadas, venceEm3Dias };
}

// KPI 3 — concluídas (fala 4: número pra reunião de segunda)
export function totalConcluidas(tasks: Task[]): number {
  return tasks.filter((t) => t.status === "Feito").length;
}