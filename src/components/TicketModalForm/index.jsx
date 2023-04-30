import React, { useState } from 'react';
import { StatusOptions, PriorityOptions } from '../../constants';
import './styles.css';

export default function TicketModalForm({
  ticket,
  show,
  onClose,
  onSave,
  title,
}) {
  const emptyTicket = {
    subject: '',
    status: '',
    priority: '',
    description: '',
  };
  const [newTicket, setNewTicket] = useState(
    ticket ? { ...ticket } : { ...emptyTicket }
  );
  const [showValidation, setShowValidation] = useState(false);

  const validateForm = () => {
    let isValid = true;
    if (Object.keys(newTicket).length === 0) {
      setShowValidation(true);
      isValid = false;
    }

    Object.keys(newTicket).forEach((key) => {
      if (key !== 'description' && newTicket[key]?.length === 0) {
        setShowValidation(true);
        isValid = false;
      }
    });
    return isValid;
  };

  const handleClose = () => {
    if (showValidation) {
      setShowValidation(false);
    }
    setNewTicket(emptyTicket);
    onClose();
  };

  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      onSave(newTicket);
      handleClose();
    }
  };

  /// console.log(newTicket);
  if (show) {
    return (
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <h4>{title}</h4>
            <button className="closeBtn" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="modalBody">
            <form className="modalForm">
              <div className="fromField">
                <label htmlFor="subject" className="formLabel">
                  *Subject:
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="formInput"
                  required
                  placeholder="Subject..."
                  value={newTicket.subject}
                  onChange={handleChange}
                />
                {showValidation && !newTicket.subject?.trim() && (
                  <p className="validationMessage">Required</p>
                )}
              </div>
              <div className="fromField">
                <label htmlFor="status" className="formLabel">
                  *Status:
                </label>
                <select
                  id="status"
                  name="status"
                  className="formInput"
                  required
                  defaultValue={newTicket.status || 'Select Status'}
                  onChange={handleChange}
                >
                  <option disabled>Select Status</option>
                  {StatusOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {showValidation && newTicket.status.length === 0 && (
                  <p className="validationMessage">Required</p>
                )}
              </div>
              <div className="fromField">
                <label htmlFor="priority" className="formLabel">
                  *Priority:
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="formInput"
                  required
                  defaultValue={newTicket.priority || 'Select Priority'}
                  onChange={handleChange}
                >
                  <option disabled>Select Priority</option>
                  {PriorityOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {showValidation && newTicket.priority.length === 0 && (
                  <p className="validationMessage">Required</p>
                )}
              </div>
              <div className="fromField">
                <label htmlFor="description" className="formLabel">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="formInput"
                  placeholder="Description..."
                  value={newTicket.description}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modalFooter">
            <button className="saveBtn" onClick={handleSubmit}>
              Save
            </button>{' '}
            <button onClick={handleClose}>Cancel</button>{' '}
          </div>
        </div>
      </div>
    );
  }
}
