import React, { useState, useEffect } from 'react';
import './ModalDialog.css';
import './App.css';
import DateSelector from './DateSelector';

const ModalDialog = () => {
  const [rows, setRows] = useState([]);
  const [dialogHeight, setDialogHeight] = useState(150);

  // Function to fetch saved data from the server
  const fetchSavedData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/saved-data');
      if (response.ok) {
        const data = await response.json();
        setRows(data); // Set retrieved data to state
      } else {
        console.error('Failed to retrieve saved data');
      }
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  };

  useEffect(() => {
    fetchSavedData();
  }, []);

  // Function to add a new row with default type 'Amount'
  const addRow = () => {
    setRows([...rows, { rowType: 'Amount', value: '' }]);
  };

  // Function to delete a row by index
  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  // Function to handle type change in a row
  const handleTypeChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].rowType = value;
    // Reset value when type changes to 'Amount'
    updatedRows[index].value = value === 'Amount' ? '' : null;
    setRows(updatedRows);
  };

  // Function to render controls based on row type
  const renderRowControls = (row, index) => {
    const handleValueChange = (newValue) => {
      const updatedRows = [...rows];
      updatedRows[index].value = newValue;
      setRows(updatedRows);
    };

    let controls;

    switch (row.rowType) {
      case 'Amount':
        controls = (
          <>
            <select className="small-select">
              <option>Equal</option>
              <option>Greater Than</option>
              <option>Less Than</option>
            </select>
            <input
              type="number"
              className="small-input"
              value={row.value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </>
        );
        break;
      case 'Title':
        controls = (
          <>
            <select className="small-select">
              <option>Contains</option>
              <option>Equals</option>
              <option>Starts With</option>
            </select>
            <input
              type="text"
              className="small-input"
              value={row.value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </>
        );
        break;
      case 'Date':
        controls = (
          <DateSelector
            handleCompareChange={handleValueChange}
          />
        );
        break;
      default:
        controls = null;
    }

    return (
      <div key={index} className="control-row">
        <select
          value={row.rowType}
          onChange={(e) => handleTypeChange(index, e.target.value)}
        >
          <option value="Amount">Amount</option>
          <option value="Title">Title</option>
          <option value="Date">Date</option>
        </select>
        {controls}
        <button className="delete-button" onClick={() => deleteRow(index)}>
          -
        </button>
      </div>
    );
  };

  // Function to save data to the server
  const saveData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/save-modal-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
      });

      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        const errorMessage = await response.text();
        console.error('Failed to save data:', errorMessage);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
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
          setDialogHeight(newHeight);
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
      <button className="add-button" onClick={addRow}>
        +
      </button>
      <button className="save-button" onClick={saveData}>
        Save
      </button>
    </div>
  );
};

export default ModalDialog;
