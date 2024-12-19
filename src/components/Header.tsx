import React from 'react';

interface HeaderProps {
    isCreatingTask: boolean;
    setIsCreatingTask: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isCreatingTask, setIsCreatingTask }) => {
    return (
        <div className="bg-[#0D0D0D] h-[200px] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Logo and Title */}
                <div className="flex items-center gap-2 mt-[60px]">
                    <img src="/assets/icons/rocket.svg" alt="Logo" className="h-8 w-8" />
                    <h1 className="text-4xl font-bold text-[#4EA8DE]">
                        Todo <span className="text-[#8284FA]">App</span>
                    </h1>
                </div>

                {!isCreatingTask && (
                    <button
                        onClick={() => setIsCreatingTask(true)}
                        className="w-[900px] mt-[60px] py-3 flex items-center gap-2 bg-[#1E6F9F] hover:bg-[#145E7C] text-white font-bold rounded-lg shadow-md justify-center"
                    >
                        <img src="/assets/icons/plus.svg" alt="Plus Icon" className="h-5 w-5" />
                        Create Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
