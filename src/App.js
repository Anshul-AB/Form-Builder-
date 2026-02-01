import './App.css';
import SelectField from './components/SelectField/SelectField';

function App() {
  return (
    <div className="app">
  <header className="app-header">
<h1>No-Code Form Builder</h1>
<p>Create custom forms visually and generate code instantly</p>
  </header>
  <main className="main">
    <SelectField />
  </main>
</div>

  );
}

export default App;
