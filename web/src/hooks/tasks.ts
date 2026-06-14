

import { useState, useEffect } from "react";
import type { Task, Status } from "../types";
import { loadTasks, saveTasks } from "../data/storage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function moveTask(id: string, status: Status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  return { tasks, setTasks, moveTask };
}