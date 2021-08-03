import React, { useEffect } from "react";
import { Avatar, Card, Button } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";

import "./Denunciation.css";

const Denunciation = (props) => {
  useEffect(() => {
    console.log(props.denunciation);
  }, [props]);

  return (
    <Card
      size="small"
      title={
        <div className="denunciation-card-title">
          <div>{props.denunciation.title}</div>
          <div>{props.denunciation.category.name}</div>
        </div>
      }
      className="denunciation-card"
    >
      <div className="denunciation-card-publisher-date">
        <div className="denunciation-card-publisher">
          {props.denunciation.publisher ? (
            <Avatar
              size={24}
              icon={<UserOutlined />}
              src={
                props.denunciation.publisher.photo
                  ? props.denunciation.publisher.photo
                  : null
              }
            />
          ) : (
            <Avatar
              size={24}
              icon={<UserOutlined />}
            />
          )}

          <div style={{ marginLeft: "5px" }}>
            {props.denunciation.publisher
              ? props.denunciation.publisher.name
              : "Denúncia Anônima"}
          </div>
        </div>

        <div>{props.denunciation.created}</div>
      </div>

      <div className="denunciation-card-description">
        {props.denunciation.description}
      </div>

      <div className="denunciation-card-media">
        {props.denunciation.media.map((m) => {
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
        <Button type="secondary">
          <LikeOutlined /> Curtir
        </Button>

        <div>{props.denunciation.likes.length} pessoas curtiram isso.</div>
      </div>

      <div className="denunciation-card-comments-container">
        <div>Comentários:</div>

        {props.denunciation.comments.map((c) => {
          return <div key={c._id}>{c.description}</div>;
        })}
      </div>
    </Card>
  );
};

export default Denunciation;
