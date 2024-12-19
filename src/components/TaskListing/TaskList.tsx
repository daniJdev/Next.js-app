import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { updateTask, deleteTask } from '@/services/taskService';
import useSnackbar from '@/hooks/useSnackbar';
import useDialog from '@/hooks/useDialog';
import TaskHeader from './TaskListHeader';
import TaskItem from './TaskListItems';
import EmptyState from './TaskListEmptyState';

const Dialog = dynamic(() => import('@mui/material/Dialog'), { ssr: false });
const Snackbar = dynamic(() => import('@mui/material/Snackbar'), { ssr: false });
const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false });

interface Task {
    id: number;
    title: string;
    color: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    setEditingTask: (task: Task | null) => void;
    setIsCreatingTask: (value: boolean) => void;
    refreshTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setEditingTask, setIsCreatingTask, refreshTasks }) => {
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, closeSnackbar } = useSnackbar();
    const { isDialogOpen, openDialog, closeDialog } = useDialog();

    const completedCount = tasks.filter((task) => task.completed).length;

    const handleToggleCompletion = async (task: Task) => {
        try {
            await updateTask(task.id, { completed: !task.completed });
            refreshTasks();
            showSnackbar('Task updated successfully!', 'success');
        } catch {
            showSnackbar('Failed to update task.', 'error');
        }
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsCreatingTask(true);
    };

    const handleDeleteTask = async () => {
        if (!deleteTaskId) return;
        try {
            await deleteTask(deleteTaskId);
            refreshTasks();
            showSnackbar('Task deleted successfully!', 'success');
            closeDialog();
        } catch {
            showSnackbar('Failed to delete task.', 'error');
        } finally {
            setDeleteTaskId(null);
        }
    };

    return (
        <div>
            <TaskHeader totalTasks={tasks.length} completedCount={completedCount} />

            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleCompletion={() => handleToggleCompletion(task)}
                            onEdit={() => handleEditTask(task)}
                            onDelete={() => {
                                setDeleteTaskId(task.id);
                                openDialog();
                            }}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}

            <Dialog open={isDialogOpen} onClose={closeDialog} aria-labelledby="delete-task-dialog">
                <div>
                    <h2 id="delete-task-dialog">Delete Task</h2>
                    <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                    <button onClick={closeDialog}>Cancel</button>
                    <button onClick={handleDeleteTask}>Delete</button>
                </div>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TaskList;
