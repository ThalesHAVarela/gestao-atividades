import type { Task, Status } from "../types";
import { people } from "../data/seed";

const COLUNAS: { status: Status; titulo: string }[] = [
  { status: "A fazer", titulo: "A Fazer" },
  { status: "Fazendo", titulo: "Fazendo" },
  { status: "Feito", titulo: "Feito" },
];

function nomeDoResponsavel(id: string): string {
  return people.find((p) => p.id === id)?.name ?? "Sem responsável";
}

function estaAtrasada(task: Task): boolean {
  if (task.status === "Feito") return false;
  const hoje = new Date().toISOString().slice(0, 10);
  return task.dueDate < hoje;
}

function proximo(s: Status): Status {
  return s === "A fazer" ? "Fazendo" : "Feito";
}
function anterior(s: Status): Status {
  return s === "Feito" ? "Fazendo" : "A fazer";
}

type Props = {
  tasks: Task[];
  onMove: (id: string, status: Status) => void;
};

export function KanbanBoard({ tasks, onMove }: Props) {
  return (
    <div className="board">
      {COLUNAS.map((coluna) => {
        const daColuna = tasks.filter((t) => t.status === coluna.status);
        return (
          <div key={coluna.status} className="coluna">
            <h2>{coluna.titulo} ({daColuna.length})</h2>
            {daColuna.map((task) => (
              <div key={task.id} className={`card prio-${task.priority}`}>
                <strong>{task.title}</strong>
                <p className="resp">{nomeDoResponsavel(task.assigneeId)}</p>
                <p className={estaAtrasada(task) ? "prazo atrasado" : "prazo"}>
                  {estaAtrasada(task) ? "⚠ " : ""}{task.dueDate}
                </p>
                <div className="acoes">
                  {coluna.status !== "A fazer" && (
                    <button onClick={() => onMove(task.id, anterior(coluna.status))}>←</button>
                  )}
                  {coluna.status !== "Feito" && (
                    <button onClick={() => onMove(task.id, proximo(coluna.status))}>→</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}