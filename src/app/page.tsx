'use client';

import { useState, useEffect } from 'react';
import TaskCreationForm from '@/components/TaskCreationForm';
import TaskList from '@/components/TaskList';
import Header from '@/components/Header';
import { fetchTasks, Task } from '@/services/taskService';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State to handle editing task
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
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = () => {
    loadTasks(page);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    loadTasks(value);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setIsCreatingTask(true); // Navigate to the task creation form
  };

  const handleTaskFormClose = () => {
    setEditingTask(null); // Reset editing state
    setIsCreatingTask(false); // Navigate back to task list
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Header isCreatingTask={isCreatingTask} setIsCreatingTask={setIsCreatingTask} />
      <div className="mt-8 mx-auto max-w-4xl">
        {isCreatingTask ? (
          <TaskCreationForm
            setIsCreatingTask={handleTaskFormClose}
            refreshTasks={refreshTasks}
            editingTask={editingTask} // Pass the editing task (if any)
          />
        ) : (
          <>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <TaskList
                  tasks={tasks}
                  setEditingTask={handleEditTask} // Pass handler to edit a task
                  setIsCreatingTask={setIsCreatingTask}
                  refreshTasks={refreshTasks} // Refresh tasks after updates
                />
                <Box display="flex" justifyContent="center" marginTop="20px">
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
