'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskCreationForm from '@/components/TaskCreationForm';
import TaskList from '@/components/TaskListing/TaskList';
import Header from '@/components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { Task } from '@/services/taskService';

export default function Home() {
  const {
    tasks,
    loading,
    error,
    page,
    totalPages,
    loadTasks,
    refreshTasks,
  } = useTasks();

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    loadTasks(value);
  };

  const handleEditTask = (task: Task | null) => {
    setEditingTask(task);
    setIsCreatingTask(true);
  };

  const handleTaskFormClose = () => {
    setEditingTask(null);
    setIsCreatingTask(false);
  };

  const renderContent = () => {
    if (isCreatingTask) {
      return (
        <TaskCreationForm
          setIsCreatingTask={handleTaskFormClose}
          refreshTasks={refreshTasks}
          editingTask={editingTask}
        />
      );
    }

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress color="primary" />
        </Box>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    return (
      <>
        <TaskList
          tasks={tasks}
          setEditingTask={handleEditTask}
          setIsCreatingTask={setIsCreatingTask}
          refreshTasks={refreshTasks}
        />
        <Box display="flex" justifyContent="center" marginTop="20px" marginBottom="20px">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Header isCreatingTask={isCreatingTask} setIsCreatingTask={setIsCreatingTask} />
      <div className="mt-8 mx-auto max-w-4xl">{renderContent()}</div>
    </div>
  );
}
