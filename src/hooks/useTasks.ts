import { useState, useEffect } from "react";
import { fetchTasks, Task } from "@/services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTasks = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { tasks, totalPages, currentPage } = await fetchTasks(page);
      setTasks(tasks);
      setTotalPages(totalPages);
      setPage(currentPage);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const refreshTasks = () => loadTasks(page);

  return {
    tasks,
    loading,
    error,
    page,
    totalPages,
    loadTasks,
    refreshTasks,
    setPage,
  };
};
