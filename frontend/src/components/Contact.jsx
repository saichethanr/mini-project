import React from 'react';
import axios from 'axios';
import '../css/Contact.css';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isloggedin = localStorage.getItem('isloggedin');
    if (!isloggedin) {
      alert('Please log in to give feedback');
      return;
    }

    const email = localStorage.getItem('email');
    const formData = {
      email,
      name: e.target.name.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/contact', formData);
      if (response.data.success) {
        alert('Message sent successfully');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className='head'>Contact Us</h2>
        <div className="flex">
          <div id="form-container">
            <h3 className='head'>Contact Form</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required>Write your message here..</textarea>

              <button type="submit" className="rounded">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
