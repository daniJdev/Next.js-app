const TaskHeader: React.FC<{ totalTasks: number; completedCount: number }> = ({ totalTasks, completedCount }) => (
    <div className="flex justify-between items-center my-4">
        <div className="text-[#4EA8DE] font-bold">
            Tasks <span className="bg-[#333333] text-white px-2 rounded-full">{totalTasks}</span>
        </div>
        <div className="text-[#8284FA] font-bold">
            Completed{' '}
            <span className="bg-[#333333] text-white px-2 rounded-full">
                {completedCount} of {totalTasks}
            </span>
        </div>
    </div>
);

export default TaskHeader;
