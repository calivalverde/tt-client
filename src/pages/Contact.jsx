
import React, { useState } from 'react';
import axiosInstance from '../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: 'loading' });
    try {
      // In a real app, you would post to your backend endpoint
      // const response = await axiosInstance.post('/contact', formData);
      console.log('Form data submitted:', formData);
      // Mocking a successful response after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus({ message: 'Thank you for your message! We will get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ message: 'Sorry, there was an error sending your message. Please try again later.', type: 'error' });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-slate-700 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bungee mb-6 text-center text-green-400">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-green-500 disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {status.type === 'loading' ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
      {status.message && (
        <p className={`mt-4 text-center text-sm ${
          status.type === 'success' ? 'text-green-400' : 
          status.type === 'error' ? 'text-red-400' : 'text-gray-300'
        }`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default Contact;
