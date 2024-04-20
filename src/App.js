import React, { useState } from 'react';
import ModalDialog from './ModalDialog';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <div className="app">
      <h1>Test Task for Dev Position</h1>
      <button className="button-dialog" onClick={handleToggleModal}>
        {isModalOpen ? 'Hide Dialog' : 'Show Dialog'}
      </button>
      {isModalOpen && <ModalDialog onClose={handleToggleModal} />}
    </div>
  );
};

export default App;