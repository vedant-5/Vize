import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvParser = () => {
  
  const [csvData, setCsvData] = useState([]);
  const [columnHeadings, setColumnHeadings] = useState([]);

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
        setColumnHeadings(Object.keys(results.data[0]));
        console.log("Columns are ", Object.keys(results.data[0]))
      },
      error: (error) => {
        console.log(error);
        
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleCsvUpload} />
      <table>
        <thead>
          <tr>
            {columnHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {columnHeadings.map((heading, index) => (
                <td key={index}>{row[heading]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CsvParser