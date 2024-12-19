'use client';

import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '@/services/taskService'; // Add both API calls

interface Task {
    id?: number;
    title: string;
    color: string;
    completed: boolean;
}

interface TaskCreationFormProps {
    setIsCreatingTask: (value: boolean) => void;
    refreshTasks: () => void;
    editingTask?: Task | null; // Task being edited (if any)
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({ setIsCreatingTask, refreshTasks, editingTask }) => {
    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E'];

    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [isSaving, setIsSaving] = useState(false);

    // Pre-fill the form when editing a task
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setSelectedColor(editingTask.color);
        }
    }, [editingTask]);

    const handleSaveTask = async () => {
        if (!title.trim()) return alert('Title is required');
        try {
            setIsSaving(true);

            if (editingTask) {
                // Update existing task
                await updateTask(editingTask.id as number, { title, color: selectedColor });
                alert('Task updated successfully!');
            } else {
                // Create new task
                await createTask({ title, color: selectedColor, completed: false });
                alert('Task created successfully!');
            }

            refreshTasks(); // Refresh the task list
            setIsCreatingTask(false); // Navigate back to task list
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Failed to save task. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 rounded-lg shadow-lg">
            {/* Back Button */}
            <button
                onClick={() => setIsCreatingTask(false)}
                className="text-white mb-4 flex items-center gap-2"
            >
                <img src="/assets/icons/arrow-left.svg" alt="Back" className="h-5 w-5" />
            </button>

            {/* Title Input */}
            <h2 className="text-[#4EA8DE] font-bold mb-4">Title</h2>
            <input
                type="text"
                placeholder="Ex. Brush your teeth"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-6 rounded bg-[#333333] text-white focus:outline-none focus:ring focus:ring-[#4EA8DE]"
            />

            {/* Color Selection */}
            <h2 className="text-[#4EA8DE] font-bold mb-4">Color</h2>
            <div className="flex gap-4">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 w-10 rounded-full border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'
                            } transition-all duration-300`}
                        style={{ backgroundColor: color }}
                    ></button>
                ))}
            </div>

            {/* Save/Update Task Button */}
            <button
                onClick={handleSaveTask}
                disabled={isSaving}
                className={`mt-6 w-full py-2 ${isSaving ? 'bg-gray-400' : 'bg-[#1E6F9F] hover:bg-[#145E7C]'
                    } text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300`}
            >
                {isSaving ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
            </button>
        </div>
    );
};

export default TaskCreationForm;
