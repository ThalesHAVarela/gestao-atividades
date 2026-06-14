import { useTasks } from "./hooks/tasks";
import { KanbanBoard } from "./components/kanbanBoard";
import "./App.css";

function App() {
  const { tasks, moveTask } = useTasks();
  return (
    <div className="app">
      <header className="topo">
        <h1>Gestão de Atividades</h1>
      </header>
      <KanbanBoard tasks={tasks} onMove={moveTask} />
    </div>
  );
}

export default App;