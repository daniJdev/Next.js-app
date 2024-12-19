const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center mt-20 text-[#808080]">
        <img src="/assets/icons/Clipboard.svg" alt="Empty State" className="h-12 w-12 mb-4 opacity-50" />
        <p className="font-bold">You don't have any tasks registered yet.</p>
        <p className="text-sm">Create tasks and organize your to-do items.</p>
    </div>
);

export default EmptyState;
