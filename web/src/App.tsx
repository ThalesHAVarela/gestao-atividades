import { useState } from "react";
import type { Task } from "./types";
import { useTasks } from "./hooks/tasks";
import { KanbanBoard } from "./components/kanbanBoard";
import { TaskForm } from "./components/taskForm";
import { Dashboard } from "./components/dashboard";
import "./App.css";

function App() {
  const { tasks, moveTask, addTask, updateTask, deleteTask } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  function handleSave(data: Omit<Task, "id">) {
    if (taskToEdit) {
      updateTask(taskToEdit.id, data);
    } else {
      addTask(data);
    }
    setTaskToEdit(null);
    setShowForm(false);
  }

  function handleEdit(task: Task) {
    setTaskToEdit(task);
    setShowForm(true);
  }

  function handleCancel() {
    setTaskToEdit(null);
    setShowForm(false);
  }

  return (
    <div className="app">
      <header className="topo">
        <h1>Gestão de Atividades</h1>
        <button className="btn-primario" onClick={() => setShowForm(true)}>+ Nova tarefa</button>
      </header>
      <Dashboard tasks={tasks} />
      {showForm && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <KanbanBoard
        tasks={tasks}
        onMove={moveTask}
        onEdit={handleEdit}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;