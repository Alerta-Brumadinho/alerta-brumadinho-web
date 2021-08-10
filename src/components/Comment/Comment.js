import React, { useState } from "react";
import axios from "axios";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { getToken, isAnExternalUser } from "../../services/user";
import { errorNotification } from "../../services/messages";

import "./Comment.css";

const Comment = (props) => {
  const [comment, setComment] = useState(props.comment);

  const likeButtonClicked = () => {
    let route = "";

    if (isAnExternalUser()) {
      errorNotification(
        "Você não tem permissão para realizar esta ação. Por favor, faça login ou se cadastre!"
      );
    } else {
      if (doILiked()) {
        route = `/comments/removeLike/${comment._id}`;
      } else {
        route = `/comments/like/${comment._id}`;
      }

      axios
        .post(route, null, {
          headers: { token: getToken() },
        })
        .then((res) => {
          setComment(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const doILiked = () => {
    if (comment.likes.includes(props.userId)) return true;
    return false;
  };

  const timeSince = (date) => {
    var seconds = (Math.floor((new Date() - date) / 1000));
    var interval = seconds / 31536000;

    if (interval > 1) {
      return "há " + Math.floor(interval) + " anos";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return "há " + Math.floor(interval) + " meses";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return "há " + Math.floor(interval) + " dias";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return "há " + Math.floor(interval) + " horas";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return "há " + Math.floor(interval) + " minutos";
    }
    return "há " + Math.floor(seconds + 1) + " segundos";
  };

  return (
    <div className="comment-container">
      <Avatar
        style={{ marginTop: "4px" }}
        size={32}
        icon={<UserOutlined />}
        src={comment.publisher.photo !== "N/A" ? comment.publisher.photo : null}
      />
      <div style={{ marginLeft: "8px" }}>
        <div className="comment-publisher-container">
          <div className="comment-publisher">{comment.publisher.name}: </div>
          <div className="comment-description">{comment.description}</div>
        </div>

        <div className="comment-like-container">
          <div
            className={
              doILiked()
                ? "like-comment-button liked"
                : "like-comment-button"
            }
            onClick={likeButtonClicked}
          >
            Curtir
          </div>
          <div>&nbsp;· {timeSince(new Date(comment.created))} ·&nbsp;</div>
          <div>{comment.likes.length} curtidas</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
