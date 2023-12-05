import { useContext, useEffect } from "react";
import AppContext from "../../context";

const NotificationMsg = () => {
  const {notification, setNotification} = useContext(AppContext);
  const style: React.CSSProperties = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: notification.type ? "block" : "none",
    backgroundColor: notification.type === "success" ? "green" : "red",
  };

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <div style={style}>
      {notification.message}
    </div>
  );
};

export default NotificationMsg;