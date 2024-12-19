const ColorPicker: React.FC<{
    colors: string[];
    selectedColor: string;
    onSelect: (color: string) => void;
}> = ({ colors, selectedColor, onSelect }) => (
    <div className="flex gap-4">
        {colors.map((color) => (
            <button
                key={color}
                onClick={() => onSelect(color)}
                className={`h-10 w-10 rounded-full border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'
                    } transition-all duration-300`}
                style={{ backgroundColor: color }}
            ></button>
        ))}
    </div>
);

export default ColorPicker;
