import React, { useState } from "react";
import axios from "axios";
import { Avatar, Card, Button } from "antd";
import { LikeOutlined, LikeFilled, UserOutlined } from "@ant-design/icons";

import "./Denunciation.css";

import { getToken, isAnExternalUser } from "../../services/user";
import { errorNotification } from "../../services/messages";

const Denunciation = (props) => {
  const [denunciation, setDenunciation] = useState(props.denunciation);

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
    return "há " + Math.floor(seconds) + " segundos";
  };

  return (
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

      <div className="denunciation-card-comments-container">
        <div>Comentários:</div>

        {denunciation.comments.map((c) => {
          return <div key={c._id}>{c.description}</div>;
        })}
      </div>
    </Card>
  );
};

export default Denunciation;
