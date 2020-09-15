import React from "react";
import '../contactForm/ContactForm.css'
export function NotificationError({ content }) {
  return (
    <>
      <div className='notification'>
        <h3>{content}</h3>
      </div>
    </>
  );
}
