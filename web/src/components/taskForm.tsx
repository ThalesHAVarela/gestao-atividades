import { useState } from "react";
import type { Task, Status, Priority } from "../types";
import { people } from "../data/seed";
import { statusLabels, priorityLabels } from "../labels";

type Props = {
  taskToEdit: Task | null;
  onSave: (data: Omit<Task, "id">) => void;
  onCancel: () => void;
};

function estadoInicial(task: Task | null): Omit<Task, "id"> {
  if (task) {
    const { id, ...resto } = task; // tira o id, mantém o resto
    return resto;
  }
  return {
    title: "",
    description: "",
    assigneeId: people[0].id,
    dueDate: new Date().toISOString().slice(0, 10),
    status: "A fazer",
    priority: "Media",
  };
}

export function TaskForm({ taskToEdit, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Task, "id">>(() => estadoInicial(taskToEdit));

  function handleSubmit() {
    if (form.title.trim() === "") {
      alert("A tarefa precisa de um título.");
      return;
    }
    onSave(form);
  }

  return (
    <div className="modal-fundo" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{taskToEdit ? "Editar tarefa" : "Nova tarefa"}</h2>

        <label>Título</label>
        <input value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label>Descrição</label>
        <textarea value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <label>Responsável</label>
        <select value={form.assigneeId}
          onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}>
          {people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <label>Prazo</label>
        <input type="date" value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

        <label>Status</label>
        <select value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as Status })}>
          {(Object.keys(statusLabels) as Status[]).map((s) =>
            <option key={s} value={s}>{statusLabels[s]}</option>)}
        </select>

        <label>Prioridade</label>
        <select value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}>
          {(Object.keys(priorityLabels) as Priority[]).map((p) =>
            <option key={p} value={p}>{priorityLabels[p]}</option>)}
        </select>

        <div className="modal-acoes">
          <button className="btn-secundario" onClick={onCancel}>Cancelar</button>
          <button className="btn-primario" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}