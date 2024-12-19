import api from "../utils/api";

export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Fetch all tasks
export const fetchTasks = async (
  page = 1,
  limit = 10
): Promise<{
  tasks: Task[];
  totalPages: number;
  currentPage: number;
}> => {
  const response = await api.get(`/tasks?page=${page}&limit=${limit}`);
  return response.data;
};

// Create a new task
export const createTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// Update an existing task
export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
