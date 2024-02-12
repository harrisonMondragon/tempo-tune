import "./BpmSelector.css";

function BpmSelector({ value, onChange }) {
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        onChange(newValue);
    };

    return (
        <input
            type="number"
            value={value}
            onChange={handleChange}
        />
    );
}

export default BpmSelector;
