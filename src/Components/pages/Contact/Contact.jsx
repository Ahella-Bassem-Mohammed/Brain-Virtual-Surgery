import "./contact.css";
import contact from "../../Assets/contact.png";
import React, { useState, useEffect } from "react";



export const Contact = () => {
  const [result, setResult] = React.useState("Submit");
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 0.0000000001);
    return () => clearTimeout(timeout);
  }, []);
  const sendMessage = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "89b1c6e5-78aa-4511-bc8b-4c86252a9987");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setResult(res.message);
    } else {
      console.log("Error", res);
      setResult(res.message);
    }
  };

  return (
    <div className="contact">
      <form onSubmit={sendMessage} className="contact-left">
        <div className="contact-left-title">
          <h2>Get In Touch</h2>
          <hr></hr>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="contact-inputs"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="contact-inputs"
        />
        <textarea
          name="message"
          placeholder="Type Your  Message Here..."
          required
          className="contact-inputs"
        ></textarea>
        <button type="submit">{result}</button>
      </form>
      <div className={showImage ? "image-container show" : "image-container"}>
        {showImage && (
          <img
            id="hidden-image"
            src={contact}
            alt="logo"
            height="350px"
            width="400px"
          ></img>
        )}
      </div>
    </div>
  );
};
