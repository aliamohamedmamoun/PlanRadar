import './App.css';
import Header from './components/Header';
import TicketsList from './components/TicketsList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TicketsList />
      </main>
    </div>
  );
}

export default App;
