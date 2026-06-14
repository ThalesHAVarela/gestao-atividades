export type Status = "A fazer" | "Fazendo" | "Feito";
export type Priority = "Baixa" | "Media" | "Alta";

export interface Person {
  id: string;
  name: string;
  role?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigneeId: string;
  dueDate: string;
  status: Status;
  priority: Priority;
}