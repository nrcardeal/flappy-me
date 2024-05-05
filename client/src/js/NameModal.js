import React, { useState } from 'react';
import '../css/NameModal.css';

const NameModal = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // Perform any validation if needed
    if (name.trim() !== '') {
      onNameSubmit(name);
    }
  };

  return (
    <div className="NameModal">
      <h2>Escreve o teu nome!</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Primeiro e Último"
      />
      <div className='buttonContainer'>
        <button className='confirm' onClick={handleSubmit}>Confimar</button>
        <button className='cancel' onClick={() => window.location.reload()}>Cancelar</button>
      </div>
    </div>
  );
};

export default NameModal;
