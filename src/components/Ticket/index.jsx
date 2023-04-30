import React, { useState } from 'react';
import TicketModalForm from '../TicketModalForm';
import './styles.css';

export default function Ticket({ ticket, style, handleUpdateTicket }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <tr style={style}>
      <td className="idCell">
        <p>{ticket.id}</p>
      </td>
      <td>
        <p>{ticket.subject}</p>
      </td>
      <td className="statusCell">
        <p>{ticket.status}</p>
      </td>
      <td className="priorityCell">
        <p>{ticket.priority}</p>
      </td>
      <td>
        <p>{ticket.description}</p>
      </td>
      <td className="editCell">
        <button className="editBtn" onClick={toggleForm}>
          Edit
        </button>
      </td>
      <td style={{ width: '0' }}>
        <TicketModalForm
          show={showForm}
          onClose={toggleForm}
          title="Update Ticket"
          ticket={ticket}
          onSave={handleUpdateTicket}
        />
      </td>
    </tr>
  );
}
