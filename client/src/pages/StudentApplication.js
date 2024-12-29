import React, { useState } from 'react';
import axios from 'axios';

const StudentApplication = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students', formData);
            alert('Application submitted successfully!');
        } catch (err) {
            console.error(err);
            alert('Error submitting application');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md">
            <input name="name" placeholder="Name" onChange={handleChange} className="mb-4" />
            <input name="email" placeholder="Email" onChange={handleChange} className="mb-4" />
            <input name="resume" placeholder="Resume URL" onChange={handleChange} className="mb-4" />
            <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
        </form>
    );
};

export default StudentApplication;
