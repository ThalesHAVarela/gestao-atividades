import { useState } from "react";
import { useTasks } from "./hooks/tasks";
import { KanbanBoard } from "./components/kanbanBoard";
import { TaskForm } from "./components/taskForm";
import type { Task } from "./types";
import "./App.css";

function App() {
  const { tasks, moveTask, addTask, updateTask, deleteTask } = useTasks();
  const [formAberto, setFormAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Task | null>(null);

  function abrirNova() {
    setTarefaEditando(null);
    setFormAberto(true);
  }
  function abrirEdicao(task: Task) {
    setTarefaEditando(task);
    setFormAberto(true);
  }
  function salvar(data: Omit<Task, "id">) {
    if (tarefaEditando) updateTask(tarefaEditando.id, data);
    else addTask(data);
    setFormAberto(false);
  }

  return (
    <div className="app">
      <header className="topo">
        <h1>Gestão de Atividades</h1>
        <button className="btn-primario" onClick={abrirNova}>+ Nova tarefa</button>
      </header>
      <KanbanBoard tasks={tasks} onMove={moveTask} onEdit={abrirEdicao} onDelete={deleteTask} />
      {formAberto && (
        <TaskForm taskToEdit={tarefaEditando} onSave={salvar} onCancel={() => setFormAberto(false)} />
      )}
    </div>
  );
}

export default App;