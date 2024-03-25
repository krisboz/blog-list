import React from "react";

const Notification = ({ message }) => {
  return (
    <div style={{ border: `1px solid ${message.error ? "red" : "green"}` }}>
      {message.content}
    </div>
  );
};

export default Notification;
