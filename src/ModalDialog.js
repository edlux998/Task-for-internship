import React, { useState, useEffect } from 'react';
import './ModalDialog.css';
import './App.css';
import DateSelector from './DateSelector';

const ModalDialog = () => {
  const [rows, setRows] = useState([{ rowType: 'Amount' }]);
  const [dialogHeight, setDialogHeight] = useState(150); 

  const addRow = () => {
    setRows([...rows, { rowType: 'Amount' }]);
  };
  const DisplaySavedData = () => {
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        const fetchSavedData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/saved-data');
                if (response.ok) {
                    const data = await response.json();
                    setSavedData(data);
                } else {
                    console.error('Failed to retrieve saved data');
                }
            } catch (error) {
                console.error('Error fetching saved data:', error);
            }
        };

        fetchSavedData();
    }, []);

    return (
        <div>
            {savedData ? (
                <p>Saved Data: {JSON.stringify(savedData)}</p>
            ) : (
                <p>Loading saved data...</p>
            )}
        </div>
    );
};

const ModalDialog = () => {


    return (
        <div className="modal">
            <DisplaySavedData />
        </div>
    );
};

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const handleTypeChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].rowType = value;
    setRows(updatedRows);
  };

  const handleResize = (newHeight) => {
    setDialogHeight(newHeight);
  };

const saveData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/save-modal-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rows)
        });

        if (response.ok) {
            console.log('Data saved successfully');
            // Handle success 
        } else {
            const errorMessage = await response.text();
            console.error('Failed to save data:', errorMessage);
            // Handle error 
        }
    } catch (error) {
        console.error('Error saving data:', error);
        // Handle error 
    }
};


  const renderRowControls = (row, index) => {
    return (
      <div key={index} className="control-row">
        <select value={row.rowType} onChange={(e) => handleTypeChange(index, e.target.value)}>
          <option value="Amount">Amount</option>
          <option value="Title">Title</option>
          <option value="Date">Date</option>
        </select>
        {row.rowType === 'Amount' && (
          <>
            <select className="small-select">
              <option>Equal</option>
              <option>Greater Than</option>
              <option>Less Than</option>
            </select>
            <input type="number" className="small-input" />
          </>
        )}
        {row.rowType === 'Title' && (
          <>
            <select className="small-select">
              <option>Contains</option>
              <option>Equals</option>
              <option>Starts With</option>
            </select>
            <input type="text" className="small-input" />
          </>
        )}
        {row.rowType === 'Date' && <DateSelector />}
        <button className="delete-button" onClick={() => deleteRow(index)}>-</button>
        
      </div>
      
    );
  };

  return (
    <div
    
      className="modal"
      style={{ height: dialogHeight }}
      onMouseDown={(e) => {
        const startY = e.clientY;
        const startHeight = dialogHeight;

        const handleMouseMove = (e) => {
          const newHeight = startHeight + (e.clientY - startY);
          handleResize(newHeight);
        };

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }}
    >
      {rows.map((row, index) => renderRowControls(row, index))}
      <button className="add-button" onClick={addRow}>+</button>
      <button className="save-button" onClick={saveData}>Save</button>
    </div>
  );
};

export default ModalDialog;
