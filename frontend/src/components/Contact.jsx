import React from 'react'
import '../css/Contact.css'
const Contact = () => {
  return (
    <section id="contact">
    <div class="container">
      <h2 className='head'>Contact Us</h2>

      <div class="flex">
        <div id="form-container">
          <h3 className='head'>Contact Form</h3>
          <form action="/contact" method="POST">
            <label for="name">Name</label>
            <input type="text" id="name" name="name"/>

            <label for="email">Email</label>
            <input type="text" id="email" name="email"/>

            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject"/>

            <label for="message">Message</label>
            <textarea id="message" name="message">Write your message here..</textarea>

            <button type="submit"  class="rounded">Send Message</button>
          </form>

      </div>
    </div>
    </div>
  </section>
  )

}


export default Contact;