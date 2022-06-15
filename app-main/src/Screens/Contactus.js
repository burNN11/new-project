import React, { useState } from 'react';
import '../Styles/contactus.scss';
import { send } from 'emailjs-com';

const Contactus = () => {
  const [sender_name, set_sender_name] = useState('');
  const [sender_email, set_sender_email] = useState('');
  const [message, set_message] = useState('');
  const [sender_phone, set_sender_phone] = useState('');

  const handleName = (e) => {
    set_sender_name(e.target.value);
  };

  const handleEmail = (e) => {
    set_sender_email(e.target.value);
  };

  const handleMessage = (e) => {
    set_message(e.target.value);
  };

  const handlePhone = (e) => {
    set_sender_phone(e.target.value);
  };

  const sendMail = (e) => {
    e.preventDefault();
    send(
      'service_3jzgqp8',
      'template_gau1gad',
      { sender_name, sender_email, sender_phone, message },
      'TgE66rC39hdYOXjVA'
    )
      .then((response) => {
        console.log(response.status, response.text);
        alert('Message sent succesfully!');
      })
      .catch((error) => {
        console.log('failed', error);
        alert('Message was not send!');
      });
    set_sender_name('');
    set_sender_email('');
    set_sender_phone('');
    set_message('');
  };
  return (
    <form className="form-container" onSubmit={sendMail}>
      <h1>Contact us</h1>
      <div className="fs-container">
        <label htmlFor="name">Full name</label>
        <input
          type="text"
          id="name"
          name="sender_name"
          value={sender_name}
          onChange={handleName}
          required
        />
      </div>

      <div className="fs-container">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="sender_phone"
          value={sender_phone}
          onChange={handlePhone}
        />
      </div>

      <div className="fs-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="sender_email"
          value={sender_email}
          onChange={handleEmail}
          required
        ></input>
      </div>

      <div className="fs-container">
        <label htmlFor="mesaj">Message</label>
        <textarea
          id="mesaj"
          value={message}
          onChange={handleMessage}
          required
        />
      </div>

      <button type="submit">Send</button>
    </form>
  );
};

export default Contactus;
