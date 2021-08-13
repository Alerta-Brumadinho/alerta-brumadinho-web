import React, { useState } from "react";
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

import { timeSince } from "../../services/time";
import { errorNotification } from "../../services/messages";
import { getToken, isAnExternalUser } from "../../services/user";

const Denunciation = (props) => {
  const [denunciation, setDenunciation] = useState(props.denunciation);
  const [comments, setComments] = useState(props.denunciation.comments);
  const [newComment, setNewComment] = useState("");

  const handleNewCommentField = (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  const doILiked = (commentOrDenunciation) => {
    if (commentOrDenunciation.likes.includes(props.loggedUser._id)) return true;
    return false;
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
          setComments(res.data.comments)
          setNewComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const likeCommentButtonClicked = (comment) => {
    let route = "";

    if (isAnExternalUser()) {
      errorNotification(
        "Você não tem permissão para realizar esta ação. Por favor, faça login ou se cadastre!"
      );
    } else {
      if (doILiked(comment)) {
        route = `/comments/removeLike/${comment._id}`;
      } else {
        route = `/comments/like/${comment._id}`;
      }

      axios
        .post(route, null, {
          headers: { token: getToken() },
        })
        .then((res) => {
          setComments(
            comments.map((c) => {
              return c._id === res.data._id ? res.data : c;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLikeDenunciationButton = () => {
    console.log("handle like");
    let route = "";

    if (isAnExternalUser()) {
      errorNotification(
        "Você não tem permissão para realizar esta ação. Por favor, faça login ou se cadastre!"
      );
    } else {
      if (doILiked(denunciation)) {
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
              type={doILiked(denunciation) ? "primary" : "secondary"}
              onClick={() => handleLikeDenunciationButton()}
            >
              {doILiked(denunciation) ? <LikeFilled /> : <LikeOutlined />}{" "}
              Curtir
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
          {comments.length ? (
            comments.map((c) => {
              return (
                <div className="comment-container" key={c._id}>
                  <Avatar
                    style={{ marginTop: "4px" }}
                    size={32}
                    icon={<UserOutlined />}
                    src={c.publisher.photo !== "N/A" ? c.publisher.photo : null}
                  />
                  <div style={{ marginLeft: "8px" }}>
                    <div className="comment-publisher-container">
                      <div className="comment-publisher">
                        {c.publisher.name}:{" "}
                      </div>
                      <div className="comment-description">{c.description}</div>
                    </div>

                    <div className="comment-like-container">
                      <div
                        className={
                          doILiked(c)
                            ? "like-comment-button liked"
                            : "like-comment-button"
                        }
                        onClick={() => likeCommentButtonClicked(c)}
                      >
                        Curtir
                      </div>
                      <div>
                        &nbsp;· {timeSince(new Date(c.created))} ·&nbsp;
                      </div>
                      <div>{c.likes.length} curtidas</div>
                    </div>
                  </div>
                </div>
              );
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
              src={props.loggedUser ? props.loggedUser.photo : null}
            />
            <Input
              className="new-comment-input"
              placeholder="Adicionar comentário..."
              value={newComment}
              onChange={(e) => handleNewCommentField(e)}
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
  showLikesSection: PropTypes.bool,
  showAuditButtons: PropTypes.bool,
  showCommentsSection: PropTypes.bool,
  approveDenunciationFunction: PropTypes.func,
  discardDenunciationFunction: PropTypes.func,
};

Denunciation.defaultProps = {
  showLikesSection: true,
  showAuditButtons: false,
  showCommentsSection: true,
};

export default Denunciation;
