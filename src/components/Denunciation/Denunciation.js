import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Card, Button, Input } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  UserOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Comment from "../Comment/Comment";

import "./Denunciation.css";

import { getToken, getUserFromDb, isAnExternalUser } from "../../services/user";
import { errorNotification } from "../../services/messages";

const Denunciation = (props) => {
  const [denunciation, setDenunciation] = useState(props.denunciation);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAnExternalUser()) {
      getUserFromDb().then((result) => {
        setUser(result);
      });
    }
  }, []);

  const likeButtonClicked = () => {
    let route = "";

    if (isAnExternalUser()) {
      errorNotification(
        "Você não tem permissão para realizar esta ação. Por favor, faça login ou se cadastre!"
      );
    } else {
      if (doILiked()) {
        route = `/denunciations/removeLike/${denunciation._id}`;
      } else {
        route = `/denunciations/like/${denunciation._id}`;
      }

      axios
        .post(route, null, {
          headers: { token: getToken() },
        })
        .then((res) => {
          setDenunciation(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const newCommentChanged = (e) => {
    setNewComment(e.target.value);
  };

  const submitNewComment = () => {
    if (isAnExternalUser()) {
      errorNotification(
        "Você não tem permissão para realizar esta ação. Por favor, faça login ou se cadastre!"
      );
    } else {
      axios
        .post(
          `/denunciations/comment/${denunciation._id}`,
          { description: newComment },
          {
            headers: { token: getToken() },
          }
        )
        .then((res) => {
          setDenunciation(res.data);
          setNewComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const doILiked = () => {
    if (denunciation.likes.includes(props.userId)) return true;
    return false;
  };

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);
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
    <>
      <Card
        size="small"
        title={
          <div className="denunciation-card-title">
            <div>{denunciation.title}</div>
            <div>{denunciation.category.name}</div>
          </div>
        }
        className="denunciation-card"
      >
        <div className="denunciation-card-publisher-date">
          <div className="denunciation-card-publisher">
            {denunciation.publisher ? (
              <Avatar
                size={24}
                icon={<UserOutlined />}
                src={
                  denunciation.publisher.photo
                    ? denunciation.publisher.photo
                    : null
                }
              />
            ) : (
              <Avatar size={24} icon={<UserOutlined />} />
            )}

            <div style={{ marginLeft: "5px" }}>
              {denunciation.publisher
                ? denunciation.publisher.name
                : "Denúncia Anônima"}
            </div>
          </div>

          <div>{timeSince(new Date(denunciation.created))}</div>
        </div>

        <div className="denunciation-card-description">
          {denunciation.description}
        </div>

        <div className="denunciation-card-media">
          {denunciation.media.map((m) => {
            return (
              <img
                className="denunciation-card-image"
                src={m}
                key={m}
                alt="Anexo da Denúncia"
              />
            );
          })}
        </div>

        <div className="denunciation-card-likes-container">
          <Button
            type={doILiked() ? "primary" : "secondary"}
            onClick={likeButtonClicked}
          >
            {doILiked() ? <LikeFilled /> : <LikeOutlined />} Curtir
          </Button>

          <div>{denunciation.likes.length} pessoas curtiram isso.</div>
        </div>
      </Card>

      <Card
        title={<b> Comentários dos usuários:</b>}
        size="small"
        className="comments-card"
      >
        {denunciation.comments.length ? (
          denunciation.comments.map((c) => {
            return <Comment key={c._id} comment={c} userId={props.userId} />;
          })
        ) : (
          <div className="comments-empty">
            {" "}
            Nenhum comentário até o momento...
          </div>
        )}

        <div className="new-comment-container">
          {denunciation.publisher ? (
            <Avatar
              size={32}
              icon={<UserOutlined />}
              src={user ? user.photo : null}
            />
          ) : (
            <Avatar size={32} icon={<UserOutlined />} />
          )}
          <Input
            className="new-comment-input"
            placeholder="Adicionar comentário..."
            value={newComment}
            onChange={(e) => newCommentChanged(e)}
          />
          <Button
            disabled={newComment ? false : true}
            type="primary"
            onClick={submitNewComment}
          >
            <SendOutlined />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Denunciation;
