import React, { useState } from 'react';

export default function DaysCalc(props) {
    var [startDate, setStartDate] = useState(''); 
    var [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
  
  
    function fnClickHandel() {
  
      if (!startDate || !endDate) {
        setError("Please select both start and end dates.");
        return;
      }
      const fromDate = startDate;
      const toDate = endDate;
  
      if (fromDate >= toDate) {
        setError("End date must be after start date.");
        return;
      }
      setError("");
      if (startDate && endDate) { // Check if both start and end dates are selected
      
        console.log("From Date:", fromDate);
        console.log("To Date:", toDate);
        fetch('http://localhost:5055/api/DaysCalculate/DaysCalculate', {
          method: 'POST',
          headers: {
            'accept': 'text/plain',                  
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fromDate: fromDate, toDate: toDate })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {          
          setResult(data)
        })
        .catch(error => {          
          console.error('There was a problem with the fetch operation:', error);
        });
      } else {
        setError("Please select both start and end dates.");
        //console.log("Please select both start and end dates.");
      }
    }
  
    function onChangeHandelerfrom(e) {
      setStartDate(e.target.value);
    }
  
    function onChangeHandelerto(e) {
      setEndDate(e.target.value);
    }
    function clearFields() {
      setStartDate('');
      setEndDate('');
      setResult(null);
      setError('');
    }
    return (
      <>
        <div className="container">
          <h2>Select Date Range</h2>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="fromDate">From Date:</label>
              <input type="date" id="fromDate" name="fromDate" value={startDate} onChange={onChangeHandelerfrom} className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="toDate">To Date:</label>
              <input type="date" id="toDate" onChange={onChangeHandelerto} value={endDate} name="toDate" className="form-control" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <button className="btn btn-primary" onClick={fnClickHandel}>Submit</button>&nbsp;
              <button className="btn btn-secondary" onClick={clearFields}>Clear</button>
            </div>
          </div>
  
          {error && (
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            </div>
          )}
          
          <div className="row mt-3">
            <div className="col-md-6">
              {result !== null && (
                <div>
                  <p>Number of days: {result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
