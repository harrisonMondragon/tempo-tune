import "./BpmSelector.css";

const BpmSelector = ({ bpm, onChange}) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    // Ensure the input value is a valid number before updating the state
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="bpm-input-container">
      <input type="number"value={bpm} onChange={handleChange}/>
    </div>
  )
}

export default BpmSelector