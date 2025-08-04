import { chips } from './chips';
import { Navbar } from './components/ui';
import './App.css';

function App() {


  return (
    <div className="App">
      <Navbar chipses={chips} navbarElements={5} />
    </div>
  );
}

export default App;