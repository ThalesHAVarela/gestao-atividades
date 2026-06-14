import type { Status, Priority } from "./types";

export const statusLabels: Record<Status, string> = {
  "A fazer": "A Fazer",
  "Fazendo": "Fazendo",
  "Feito": "Feito",
};

export const priorityLabels: Record<Priority, string> = {
  "Baixa": "Baixa",
  "Media": "Média",
  "Alta": "Alta",
};