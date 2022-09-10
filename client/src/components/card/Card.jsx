import React, { useState } from "react";
import {
	IoAlertCircleOutline,
	IoArrowRedoOutline,
	IoChatbubbleOutline,
	IoHeart,
	IoHeartOutline,
} from "react-icons/io5";
import "./card.css";

const Card = ({ post, socket, user }) => {
	const [liked, setLiked] = useState(false);

	const handleNotification = (type) => {
		type === 1 && setLiked(true);
		socket.emit("sendText", {
			senderName: user,
			receiverName: post.username,
			text: "Hello this is chat message",
		});
	};
	console.log(post);
	return (
		<div className="card">
			<div className="info">
				<img src={post.userImg} className="userImg" alt="" />
				<span>{post.fullname}</span>
			</div>
			<img src={post.postImg} alt="post-img" className="postImg" />
			<div className="interaction">
				{liked ? (
					<IoHeart style={{ color: "red" }} className="cardIcon" />
				) : (
					<IoHeartOutline
						className="cardIcon"
						onClick={() => handleNotification(1)}
					/>
				)}
				<IoChatbubbleOutline
					className="cardIcon"
					onClick={() => handleNotification(2)}
				/>
				<IoArrowRedoOutline
					className="cardIcon"
					onClick={() => handleNotification(3)}
				/>
				<IoAlertCircleOutline className="cardIcon infoIcon" />
			</div>
		</div>
	);
};

export default Card;
