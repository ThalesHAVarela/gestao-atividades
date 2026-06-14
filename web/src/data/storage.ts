import type { Task } from "../types";
import { tasks as seedTasks } from "./seed";

const STORAGE_KEY = "gestao-atividades:tasks";

// lê as tarefas do localStorage; se for a primeira vez, usa o seed
export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    saveTasks(seedTasks); // primeira execução: popula com o time ficticio
    return seedTasks;
  }
  return JSON.parse(raw) as Task[];
}

// grava a lista inteira de tarefas
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}