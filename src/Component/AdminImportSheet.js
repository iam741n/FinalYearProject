import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_IP } from './Url';
import { FaFileExcel } from "react-icons/fa";

const AdminImportSheet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = `http://${API_IP}/WaitingQueue/api/ImportSheet2/ImportExcelData`;

    const importExcelData = async (event) => {
        try {
            setLoading(true);

            const file = event.target.files[0];

            if (!file) {
                setError('No file selected');
                setLoading(false);
                return;
            }

            const data = new FormData();
            data.append('file_attachment', file);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Result:', result);
            alert(result);

            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        
        <div className="container mt-4">
             <h1 className="text-center mt-4">Waiting Queue for Admin</h1>
            <h2>Import Excel Data <FaFileExcel /></h2>
            <input
                type="file"
                onChange={importExcelData}
                accept=".xls, .xlsx" // Specify the allowed file types
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default AdminImportSheet;
