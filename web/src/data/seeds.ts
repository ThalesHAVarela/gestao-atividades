import type { Pessoa, Task } from "../types";

export const people: Pessoa[] = [
  { id: "p1", name: "Ricardo", role: "Dono" },
  { id: "p2", name: "Ana", role: "Designer" },
  { id: "p3", name: "Bruno", role: "Desenvolvedor" },
  { id: "p4", name: "Carla", role: "Atendimento" },
  { id: "p5", name: "Diego", role: "Desenvolvedor" },
  { id: "p6", name: "Elaine", role: "Marketing" },
];

// helper: gera uma data ISO a partir de hoje, somando/subtraindo dias
function diasAPartirDeHoje(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10); // formato "2026-06-20"
}

export const tasks: Task[] = [
  { id: "t1", title: "Enviar proposta pro cliente X", assigneeId: "p3", dueDate: diasAPartirDeHoje(-3), status: "Fazendo", priority: "Alta" },
  { id: "t2", title: "Revisar layout da landing page", assigneeId: "p2", dueDate: diasAPartirDeHoje(-1), status: "A fazer", priority: "Alta" },
  { id: "t3", title: "Responder tickets de suporte", assigneeId: "p4", dueDate: diasAPartirDeHoje(1), status: "Fazendo", priority: "Media" },
  { id: "t4", title: "Corrigir bug no checkout", assigneeId: "p3", dueDate: diasAPartirDeHoje(2), status: "A fazer", priority: "Alta" },
  { id: "t5", title: "Planejar campanha do mês", assigneeId: "p6", dueDate: diasAPartirDeHoje(5), status: "A fazer", priority: "Media" },
  { id: "t6", title: "Atualizar documentação interna", assigneeId: "p5", dueDate: diasAPartirDeHoje(7), status: "A fazer", priority: "Baixa" },
  { id: "t7", title: "Reunião de alinhamento semanal", assigneeId: "p1", dueDate: diasAPartirDeHoje(-2), status: "Feito", priority: "Media" },
  { id: "t8", title: "Configurar relatório de vendas", assigneeId: "p5", dueDate: diasAPartirDeHoje(3), status: "Fazendo", priority: "Alta" },
  { id: "t9", title: "Onboarding do novo cliente", assigneeId: "p4", dueDate: diasAPartirDeHoje(-4), status: "Feito", priority: "Alta" },
  { id: "t10", title: "Pesquisa de satisfação", assigneeId: "p6", dueDate: diasAPartirDeHoje(10), status: "A fazer", priority: "Baixa" },
];