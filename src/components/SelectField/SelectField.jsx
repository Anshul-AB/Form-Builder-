import React, { useState } from "react";
import "./SelectField.css";
import FormField from "../formField/FormField";

const SelectField = () => {
  const [fields, setFields] = useState([]);
  const [htmlCode, setHtmlCode] = useState("");
  const [showCopyButton, setShowCopyButton] = useState(false);

  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type,
        label: type,
        options: ["Option 1", "Option 2"],
        required: false,
        placeholder: "",
        className: "",
        value: "",
        maxLength: "",
      },
    ]);
  };

  const handleEdit = (
    id,
    label,
    type,
    newRequired,
    newPlaceholder,
    newClass,
    newValue,
    newMaxLength,
    allowedRoles
  ) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              label,
              type,
              required: newRequired,
              placeholder: newPlaceholder,
              className: newClass,
              value: newValue,
              maxLength: newMaxLength,
              access: allowedRoles
            }
          : field
      )
    );
  };

  const handleDelete = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleMoveUp = (id) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index > 0) {
      const updatedFields = [...fields];
      [updatedFields[index - 1], updatedFields[index]] = [
        updatedFields[index],
        updatedFields[index - 1],
      ];
      setFields(updatedFields);
    }
  };

  const handleMoveDown = (id) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index < fields.length - 1) {
      const updatedFields = [...fields];
      [updatedFields[index], updatedFields[index + 1]] = [
        updatedFields[index + 1],
        updatedFields[index],
      ];
      setFields(updatedFields);
    }
  };

  const handleCopy = (id, type) => {
    const fieldToCopy = fields.find((field) => field.id === id);
    if (fieldToCopy) {
      setFields([
        ...fields,
        {
          id: Date.now(),
          type,
          label: type,
          options: ["Option 1", "Option 2"],
        },
      ]);
    }
  };

  const clearForm = () => {
    setFields([]);
    setHtmlCode("");
    setShowCopyButton(false);
  };

  const saveForm = () => {
    console.log("Form Saved!", fields);

    // Generate the HTML code
    const generatedHtml = `
    <form>
    ${fields
      .map((field) => {
        if (field.type === "paragraph") {
          return `
          <label for="${field.id}">${field.label}</label>
          <p class="${field.className}" access="${field.access}" >${field.value}</p>`;
        } else if (field.type === "select") {
          return `
            <label for="${field.id}">${field.label}</label>
            <select id="${field.id}" class="${field.className || ""}">
              ${field.options
                ?.map((opt) => `<option value="${opt}">${opt}</option>`)
                .join("")}
            </select>
          `;
        } else {
          return `
            <label for="${field.id}">${field.label}</label>
            <input 
              id="${field.id}"
              type="${field.type}" 
              ${field.required ? "required" : ""}
              placeholder="${field.placeholder || ""}"
              class="${field.className || ""}"
              value="${field.value || ""}"
              ${field.maxLength ? `maxLength="${field.maxLength}"` : ""}
            />
          `;
        }
      })
      .join("")}
  </form>
  
`;

    setHtmlCode(generatedHtml);
    setShowCopyButton(true);
  };

  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      alert("HTML copied to clipboard!");
    });
  };

  return (
    <div className="selectField">
      {/* Form  */}
      <div className="form-area">
        {fields.map((item) => (
          <FormField
            key={item.id}
            id={item.id}
            type={item.type}
            label={item.label}
            options={item.options}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onCopy={handleCopy}
          />
        ))}
      </div>

      <div className="sidebar">
        {/* Select field options */}
        <div className="buttons">
          <button className="field-name" onClick={() => addField("text")}>
            Text Field
          </button>
          <button className="field-name" onClick={() => addField("paragraph")}>
            Paragraph
          </button>
          <button className="field-name" onClick={() => addField("select")}>
            Select
          </button>
          <button className="field-name" onClick={() => addField("phone")}>
            Phone Number
          </button>
        </div>

        {/* save html */}
        <div className="form-actions">
          <button className="clear-form" onClick={clearForm}>
            Clear Form
          </button>
          <button className="save-form" onClick={saveForm}>
            Save Form
          </button>
        </div>
        {showCopyButton && (
          <div className="copy-section">
            <button className="copy-html" onClick={copyHtmlToClipboard}>
              Copy HTML
            </button>
            <pre className="generated-html">{htmlCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
