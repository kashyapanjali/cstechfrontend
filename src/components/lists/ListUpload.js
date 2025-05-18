import React, { useState } from 'react';
import { uploadList } from '../../services/api';

const ListUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadResult, setUploadResult] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid CSV file');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        setUploadResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadList(formData);
            setSuccess('File uploaded and distributed successfully');
            setUploadResult(response.data.data);
            setFile(null);
            // Reset file input
            e.target.reset();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload List</h1>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                {success}
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Select CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Only CSV files are allowed. File should contain FirstName, Phone, and Notes columns.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !file}
                            className={`w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 
                                ${(loading || !file) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Uploading...' : 'Upload and Distribute'}
                        </button>
                    </form>

                    {uploadResult && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Summary</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                    Total Items: {uploadResult.totalItems}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Items per Agent: {uploadResult.itemsPerAgent}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListUpload; 