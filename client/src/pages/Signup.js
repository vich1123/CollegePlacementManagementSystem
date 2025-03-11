import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error signing up');
      console.error('Signup error', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required />
        <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
        <select name='role' value={formData.role} onChange={handleChange}>
          <option value='student'>Student</option>
          <option value='recruiter'>Recruiter</option>
          <option value='admin'>Admin</option>
        </select>
        <button type='submit'>Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
