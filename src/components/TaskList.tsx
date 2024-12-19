import React from 'react';
import { updateTask } from '@/services/taskService'; // Add API call for updating tasks

interface Task {
    id: number;
    title: string;
    color: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    setEditingTask: (task: Task | null) => void; // Pass the selected task for editing
    setIsCreatingTask: (value: boolean) => void; // Toggle between views
    refreshTasks: () => void; // Refresh the task list
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setEditingTask, setIsCreatingTask, refreshTasks }) => {
    const handleToggleCompletion = async (task: Task) => {
        try {
            await updateTask(task.id, { completed: !task.completed });
            refreshTasks(); // Refresh tasks after updating
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task.');
        }
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task); // Set the task for editing
        setIsCreatingTask(true); // Navigate to task creation form
    };

    return (
        <div>
            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`flex items-center justify-between p-4 bg-[#262626] rounded-lg shadow-md ${task.completed ? 'opacity-50' : ''
                                }`}
                            onClick={() => handleEditTask(task)}
                        >
                            <div className="flex items-center gap-4">
                                <label className="relative cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={(e) => {
                                            e.stopPropagation(); // Prevent triggering `handleEditTask`
                                            handleToggleCompletion(task);
                                        }}
                                        className="peer hidden"
                                    />
                                    <div
                                        className="h-5 w-5 rounded-full"
                                        style={{
                                            backgroundColor: task.completed ? task.color : 'transparent',
                                            border: `2px solid ${task.color}`,
                                        }}
                                    ></div>
                                </label>
                                <p
                                    className={`text-sm text-[#F2F2F2] ${task.completed ? 'line-through text-[#808080]' : ''
                                        }`}
                                >
                                    {task.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center mt-20 text-[#808080]">
                    <img src="/assets/icons/Clipboard.svg" alt="Empty State" className="h-12 w-12 mb-4 opacity-50" />
                    <p className="font-bold">You don't have any tasks registered yet.</p>
                    <p className="text-sm">Create tasks and organize your to-do items.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
