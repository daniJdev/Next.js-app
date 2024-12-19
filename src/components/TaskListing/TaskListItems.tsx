import { Task } from "@/services/taskService";

const TaskItem: React.FC<{
    task: Task;
    onToggleCompletion: () => void;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ task, onToggleCompletion, onEdit, onDelete }) => (
    <div
        className={`flex items-center justify-between p-4 bg-[#262626] rounded-lg shadow-md ${task.completed ? 'opacity-50' : ''
            }`}
    >
        <label
            className="relative cursor-pointer flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
        >
            <input type="checkbox" checked={task.completed} onChange={onToggleCompletion} className="peer hidden" />
            <div
                className="h-5 w-5 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: task.completed ? task.color : 'transparent',
                    border: `2px solid ${task.color}`,
                }}
            >
                {task.completed && <img src="/assets/icons/tick.svg" alt="Completed" className="h-4 w-4" />}
            </div>
        </label>
        <div className="flex-1 cursor-pointer ml-2" onClick={onEdit}>
            <p className={`text-sm text-[#F2F2F2] ${task.completed ? 'line-through text-[#808080]' : ''}`}>
                {task.title}
            </p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="opacity-70 hover:opacity-100">
            <img src="/assets/icons/trash.svg" alt="Delete" className="h-5 w-5" />
        </button>
    </div>
);

export default TaskItem;
