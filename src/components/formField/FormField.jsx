import React, { useState } from "react";
import "./FormField.css";
import {
  FaArrowDown,
  FaArrowUp,
  FaCopy,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const FormField = ({
  id,
  type,
  label,
  options,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onCopy,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [newType, setNewType] = useState(type);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, newLabel, newType);
    setIsEditing(false);
  };

  return (
    <div className="form-field">
      {/* Edit buttons */}
      <div className="button-group">
        <button onClick={handleEditClick} title="Edit">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(id)} title="Delete">
          <FaTrash />
        </button>
        <button onClick={() => onCopy(id)} title="Copy">
          <FaCopy />
        </button>
        <button onClick={() => onMoveUp(id)} title="Move Up">
          <FaArrowUp />
        </button>
        <button onClick={() => onMoveDown(id)} title="Move Down">
          <FaArrowDown />
        </button>
      </div>

      {/* Input  */}
      <div>
        <label htmlFor={id}>{label}</label>

        {type === "paragraph" ? (
          <p className="paragraph-field">{label}</p>
        ) : type === "select" ? (
          <select id={id} className="select-field">
            {options &&
              options.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        ) : (
          <input id={id} type={type} className="input-field" />
        )}
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Field</h3>
            <label>Label:</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            <label>Type:</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="phone">Phone</option>
              <option value="select">Select</option>
              <option value="textarea">Textarea</option>
            </select>

            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default FormField;
