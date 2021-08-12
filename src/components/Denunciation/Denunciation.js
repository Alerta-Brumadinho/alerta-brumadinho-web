import React, { useState, useEffect } from "react";
import { Avatar, Card, Button, Input } from "antd";
import PropTypes from "prop-types";
import axios from "axios";
import {
  LikeOutlined,
  LikeFilled,
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./Denunciation.css";

import Comment from "../Comment/Comment";
import { timeSince } from "../../services/time";
import { errorNotification } from "../../services/messages";
import { getToken, getUserFromDb, isAnExternalUser } from "../../services/user";

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

        {props.showLikesSection ? (
          <div className="denunciation-card-likes-container">
            <Button
              type={doILiked() ? "primary" : "secondary"}
              onClick={likeButtonClicked}
            >
              {doILiked() ? <LikeFilled /> : <LikeOutlined />} Curtir
            </Button>

            <div>{denunciation.likes.length} pessoas curtiram isso.</div>
          </div>
        ) : null}

        {props.showAuditButtons ? (
          <div className="denunciation-card-audit-container">
            <Button type="primary" onClick={props.approveDenunciationFunction}>
              <CheckCircleOutlined /> Aprovar Denúncia
            </Button>

            <Button type="danger" onClick={props.discardDenunciationFunction}>
              <DeleteOutlined /> Descartar Denúncia
            </Button>
          </div>
        ) : null}
      </Card>

      {props.showCommentsSection ? (
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
            <Avatar
              size={32}
              icon={<UserOutlined />}
              src={user ? user.photo : null}
            />
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
      ) : null}
    </>
  );
};

Denunciation.propTypes = {
  type: PropTypes.oneOf(["feed", "audit"]),
  showLikesSection: PropTypes.bool,
  showAuditButtons: PropTypes.bool,
  showCommentsSection: PropTypes.bool,
  approveDenunciationFunction: PropTypes.func,
  discardDenunciationFunction: PropTypes.func,
};

Denunciation.defaultProps = {
  type: "feed",
  showLikesSection: true,
  showAuditButtons: false,
  showCommentsSection: true,
};

export default Denunciation;
