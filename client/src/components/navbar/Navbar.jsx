import React from "react";
import "./navbar.css";
import { IoNotifications, IoChatbox, IoSettings } from "react-icons/io5";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ socket }) => {
	const [notifications, setNotifications] = useState([]);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		socket.on("getText", (data) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, [socket]);

	const displayNotification = ({ senderName, text }) => {
		// let action;
		// if (type === 1) {
		// 	action = "liked";
		// } else if (type === 2) {
		// 	action = "commented";
		// } else {
		// 	action = "shared";
		// }
		return (
			<span className="notification">{`${senderName}:  ${text} your post`}</span>
		);
	};

	const handleRead = () => {
		setNotifications([]);
		setOpen(false);
	};
	return (
		<div className="navbar">
			<span className="logo">Lama App</span>
			<div className="icons">
				<div className="icon" onClick={() => setOpen(!open)}>
					<IoNotifications className="iconImg" />
					{notifications.length > 0 && (
						<div className="counter">{notifications.length}</div>
					)}
				</div>
				<div className="icon" onClick={() => setOpen(!open)}>
					<IoChatbox className="iconImg" />
				</div>
				<div className="icon" onClick={() => setOpen(!open)}>
					<IoSettings className="iconImg" />
				</div>
			</div>
			{open && (
				<div className="notifications">
					{notifications.map((n) => displayNotification(n))}
					<button className="notifButton" onClick={handleRead}>
						Mark as read
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
