import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

import "./Audit.css";

import Navbar from "../../components/Navbar/Navbar";
import Denunciation from "../../components/Denunciation/Denunciation";
import { getUserFromDb, getToken } from "../../services/user";
import {
  errorNotification,
  successNotification,
} from "../../services/messages";

const { Option } = Select;

const Audit = (props) => {
  const [nav, setNav] = useState(null);
  const [user, setUser] = useState(null);
  const [unverifiedDenunciations, setUnverifiedDenunciations] = useState(null);
  const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);
  const [discardReason, setDiscardReason] = useState('1');

  const showDiscardModal = () => {
    setIsDiscardModalVisible(true);
  };

  const closeDiscardModal = () => {
    setIsDiscardModalVisible(false);
    setDiscardReason('1');
  };

  const handleDiscardReason = (value) => {
    setDiscardReason(value);
  };

  const getUnverifiedDenunciations = () => {
    axios
      .get(
        `/denunciations/fromStatusAndCity/unverified&MG&Brumadinho&created&-1`,
        {
          headers: { token: getToken() },
        }
      )
      .then((res) => {
        setUnverifiedDenunciations(res.data);
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const approveDenunciation = (denunciation) => {
    axios
      .put(
        `/denunciations/auditor/${denunciation._id}`,
        { status: "accepted" },
        {
          headers: { token: getToken() },
        }
      )
      .then((res) => {
        getUnverifiedDenunciations();
        successNotification("Denúncia aprovada com sucesso!");
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const discardDenunciation = (denunciation) => {
    axios
      .put(
        `/denunciations/auditor/${denunciation._id}`,
        { status: "rejected", rejection_reason: discardReason },
        {
          headers: { token: getToken() },
        }
      )
      .then((res) => {
        getUnverifiedDenunciations();
        closeDiscardModal();
        successNotification("Denúncia descartada com sucesso!");
      })
      .catch((error) => {
        errorNotification();
      });
  };

  useEffect(() => {
    getUserFromDb().then((result) => {
      if (result.type !== "auditor") {
        setNav("/feed");
      } else {
        setUser(result);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUnverifiedDenunciations();
    }
  }, [user]);

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="main-layout">
        <Navbar menuOption="audit" />

        <div className="main-layout-content">
          {unverifiedDenunciations?.map((d) => (
            <div key={d._id}>
              <Denunciation
                denunciation={d}
                showAuditButtons={true}
                showLikesSection={false}
                showCommentsSection={false}
                approveDenunciationFunction={() => approveDenunciation(d)}
                discardDenunciationFunction={() => showDiscardModal(d)}
              />

              <Modal
                title={
                  <b>
                    <DeleteOutlined style={{ color: "#ff4d4d" }} /> {d.title}
                  </b>
                }
                visible={isDiscardModalVisible}
                onOk={() => discardDenunciation(d)}
                onCancel={() => closeDiscardModal()}
                cancelText="Cancelar"
                okButtonProps={{ disabled: discardReason ? false : true }}
                okText="Confirmar"
              >
                <div style={{ marginBottom: "6px" }}>
                  Selecione o motivo do descarte desta denúncia:
                </div>

                <Select
                  style={{ width: "80%" }}
                  onChange={handleDiscardReason}
                  value={discardReason}
                  defaultValue={1}
                >
                  <Option value={'1'}>Motivo 1</Option>
                  <Option value={'2'}>Motivo 2</Option>
                  <Option value={'3'}>Motivo 3</Option>
                  <Option value={'4'}>Motivo 4</Option>
                </Select>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Audit;
