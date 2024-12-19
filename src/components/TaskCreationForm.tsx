'use client';

import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '@/services/taskService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useSnackbar from '@/hooks/useSnackbar';
import ColorPicker from './ColorPicker';

interface Task {
    id?: number;
    title: string;
    color: string;
    completed: boolean;
}

interface TaskCreationFormProps {
    setIsCreatingTask: (value: boolean) => void;
    refreshTasks: () => void;
    editingTask?: Task | null;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
    setIsCreatingTask,
    refreshTasks,
    editingTask,
}) => {
    const colors = [
        '#FF3B30', '#FF9500', '#FFCC00', '#34C759',
        '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E',
    ];

    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [isSaving, setIsSaving] = useState(false);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setSelectedColor(editingTask.color);
        }
    }, [editingTask]);

    const handleSaveTask = async () => {
        if (!title.trim()) {
            showSnackbar('Title is required', 'error');
            return;
        }

        setIsSaving(true);

        try {
            if (editingTask) {
                await updateTask(editingTask.id as number, { title, color: selectedColor });
                showSnackbar('Task updated successfully!', 'success');
            } else {
                await createTask({ title, color: selectedColor, completed: false });
                showSnackbar('Task created successfully!', 'success');
            }

            setTimeout(() => {
                refreshTasks();
                setIsCreatingTask(false);
            }, 3000);
        } catch (error) {
            console.error('Error saving task:', error);
            showSnackbar('Failed to save task. Please try again.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 rounded-lg shadow-lg">
            <button
                onClick={() => setIsCreatingTask(false)}
                className="text-white mb-4 flex items-center gap-2"
            >
                <img src="/assets/icons/arrow-left.svg" alt="Back" className="h-5 w-5" />
            </button>

            <h2 className="text-[#4EA8DE] font-bold mb-4">Title</h2>
            <input
                type="text"
                placeholder="Ex. Brush your teeth"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-6 rounded bg-[#333333] text-white focus:outline-none focus:ring focus:ring-[#4EA8DE]"
            />

            <h2 className="text-[#4EA8DE] font-bold mb-4">Color</h2>
            <ColorPicker colors={colors} selectedColor={selectedColor} onSelect={setSelectedColor} />

            <button
                onClick={handleSaveTask}
                disabled={isSaving}
                className={`mt-6 w-full py-2 ${isSaving ? 'bg-gray-400' : 'bg-[#1E6F9F] hover:bg-[#145E7C]'} text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300`}
            >
                {isSaving ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
            </button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TaskCreationForm;
