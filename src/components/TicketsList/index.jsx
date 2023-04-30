import React, { useEffect, useState } from 'react';
import { Tickets } from '../../constants';
import useWindowSize from '../../Hooks/useWindowSize';
import VirtualizedList from '../VirtualizedList';
import TicketModalForm from '../TicketModalForm';
import Ticket from '../Ticket';
import './styles.css';

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    // to mock tickets' fetching
    setTimeout(() => {
      setTickets(Tickets);
      setIsFetching(false);
    }, 1000);
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // TODO: Save to database
  const handleUpdateTicketsList = (newTicket) => {
    let newList = [];
    if (newTicket.id) {
      newList = tickets.map((ticket) => {
        if (ticket.id === newTicket.id) {
          return {
            ...newTicket,
          };
        } else {
          return ticket;
        }
      });
    } else {
      newList = [...tickets, { id: `${tickets.length + 1}`, ...newTicket }];
    }
    setTickets(newList);
  };

  if (isFetching) {
    return (
      <div>
        <p>Loading ....</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="ticketsListHeader">
          <h1>Tickets' List</h1>
          <button onClick={toggleForm} className="createTicketBtn">
            Create new Ticket
          </button>
        </div>
        <div className="tableWrapper">
          <table className="prTicketsTable">
            <thead>
              <tr>
                <th className="idCell">ID</th>
                <th className="subjectCell">Subject</th>
                <th className="statusCell">Status</th>
                <th className="priorityCell">Priority</th>
                <th className="descCell">Description</th>
                <th className="editCell"></th>
              </tr>
            </thead>
            <VirtualizedList
              container="tbody"
              numOfItems={tickets.length}
              itemHeight={70}
              windowHeight={windowSize.height}
              renderItem={({ index, style }) => {
                const ticket = tickets[index];
                return ticket ? (
                  <Ticket
                    key={ticket?.id}
                    ticket={ticket}
                    style={style}
                    handleUpdateTicket={handleUpdateTicketsList}
                  />
                ) : null;
              }}
            />
          </table>
        </div>
        <TicketModalForm
          show={showForm}
          onClose={toggleForm}
          title="Create a new ticket"
          onSave={handleUpdateTicketsList}
        />
      </div>
    );
  }
}
