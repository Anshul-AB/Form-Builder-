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
  const [newRequired, setNewRequired] = useState(false);
  const [newPlaceholder, setNewPlaceholder] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newMaxLength, setNewMaxLength] = useState("");
  const [allowedRoles, setAllowedRoles] = useState([]);

  const toggleRole = (role) => {
    setAllowedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(
      id,
      newLabel,
      newType,
      newRequired,
      newPlaceholder,
      newClass,
      newValue,
      newMaxLength,
      allowedRoles
    );
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
        <button onClick={() => onCopy(id, type)} title="Copy">
          <FaCopy />
        </button>
        <button onClick={() => onMoveUp(id)} title="Move Up">
          <FaArrowUp />
        </button>
        <button onClick={() => onMoveDown(id)} title="Move Down">
          <FaArrowDown />
        </button>
      </div>

      {/* Form Area */}
      <div>
        <label htmlFor={id}>{label}</label>
        {type === "paragraph" ? (
          <p className={`paragraph-field ${newClass}`}>{newValue}</p>
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
          <input
            id={id}
            type={type}
            className="input-field"
            required={newRequired}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        )}
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Field</h3>

            {/* required */}
            <label>
              <input
                type="checkbox"
                checked={newRequired}
                onChange={(e) => setNewRequired(e.target.checked)}
              />
              Required
            </label>

            {/* Label */}
            <label>Label:</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            {/* Paragraph-specific Fields */}
            {type === "paragraph" ? (
              <>
                <label>Content:</label>
                <textarea
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />

                <label>Class:</label>
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="space separated classes"
                />

                <label>Access</label>
                <div>
                  <input
                    type="checkbox"
                    checked={allowedRoles.includes("Administrator")}
                    onChange={() => toggleRole("Administrator")}
                  />
                  <span>Administrator</span>
                </div>
              </>
            ) : (
              <>
                <label>Type:</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="phone">Phone</option>
                  <option value="select">Select</option>
                  <option value="textarea">Textarea</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                <label>Placeholder:</label>
                <input
                  type="text"
                  value={newPlaceholder}
                  onChange={(e) => setNewPlaceholder(e.target.value)}
                />

                <label>Class:</label>
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                />

                <label>Value:</label>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />

                <label>Max Length:</label>
                <input
                  type="number"
                  value={newMaxLength}
                  onChange={(e) => setNewMaxLength(e.target.value)}
                />
              </>
            )}

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
