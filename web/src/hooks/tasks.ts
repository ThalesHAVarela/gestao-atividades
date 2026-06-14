

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

  function addTask(data: Omit<Task, "id">) {
    const novaTarefa: Task = { ...data, id: crypto.randomUUID() };
    setTasks((prev) => [...prev, novaTarefa]);
  }

  function updateTask(id: string, data: Omit<Task, "id">) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...data, id } : t)));
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, setTasks, moveTask, addTask, updateTask, deleteTask };

}