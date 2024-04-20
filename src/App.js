import React, { useState } from 'react';
import './App.css';
import './ModalDialog.css';
import ModalDialog from './ModalDialog';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <div className="app">
      <h1>Test task for dev position</h1>
      <button className="button-dialog" onClick={toggleModal}>Show Dialog</button>
      {isModalOpen && <ModalDialog />} 
    </div>
  );
}

export default App;