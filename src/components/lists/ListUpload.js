import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lists } from '../../services/api';

const ListUpload = () => {
    const [file, setFile] = useState(null);
    const [listName, setListName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadResult, setUploadResult] = useState(null);
    const navigate = useNavigate();

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
        if (!file || !listName) {
            setError('Please provide both list name and CSV file');
            return;
        }

        setLoading(true);
        setError('');
        setUploadResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', listName);

        try {
            const response = await lists.upload(formData);
            setUploadResult(response.data.data);
            setFile(null);
            setListName('');
            navigate('/lists');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload list');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload New List</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
                            List Name
                        </label>
                        <input
                            type="text"
                            id="listName"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            CSV File
                        </label>
                        <input
                            type="file"
                            id="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Please upload a CSV file with contact information
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/lists')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Uploading...' : 'Upload List'}
                        </button>
                    </div>
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
    );
};

export default ListUpload; 