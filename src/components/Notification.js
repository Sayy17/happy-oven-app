// src/components/Notifications.js
import React, { useEffect, useState } from 'react';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Make notification disappear after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return visible ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;