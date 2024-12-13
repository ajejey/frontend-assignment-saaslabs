import React from 'react';
import ProjectTable from './components/ProjectTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Kickstarter Projects</h1>
      </header>
      <main>
        <ProjectTable />
      </main>
    </div>
  );
}

export default App;
