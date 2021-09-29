import React, { useState, useEffect } from "react";
import { Button, Card, Input } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import { SearchOutlined, FolderOpenOutlined } from "@ant-design/icons";
import axios from "axios";

import "./Search.css";
import { errorNotification } from "../../services/messages";
import Denunciation from "../../components/Denunciation/Denunciation";
import {
  getUserFromDb,
  isAnExternalUser,
} from "../../services/user";

const Search = () => {
  const [denunciationSearchId, setDenunciationSearchId] = useState("");
  const [denunciation, setDenunciation] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchDenunciation = (e) => {
    setDenunciationSearchId(e.target.value);
  };

  const searchDenunciation = () => {
    setLoading(true);
    axios
      .get(`/denunciations/fromSearchId/${denunciationSearchId}`)
      .then((res) => {
        console.log(res.data);
        setDenunciation(res.data);
        setLoading(false);
      })
      .catch((error) => {
        errorNotification();
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isAnExternalUser()) {
      getUserFromDb().then((result) => {
        setLoggedUser(result);
      });
    }
  }, []);

  return (
    <div className="main-layout">
      <Navbar menuOption="search" />
      <div className="main-layout-content">
        <div className="searchbar-container">
          <Input
            className="searchbar-input"
            placeholder="Digite o código da denúncia..."
            value={denunciationSearchId}
            onChange={handleSearchDenunciation}
          />
          <Button
            disabled={denunciationSearchId.length === 5 ? false : true}
            onClick={searchDenunciation}
            loading={loading}
            type="primary"
          >
            <SearchOutlined />
          </Button>
        </div>

        {denunciation ? (
          <Denunciation
            key={denunciation._id}
            denunciation={denunciation}
            loggedUser={loggedUser}
            showLikesSection={true}
            showResidentsCommentsSection={true}
            showPublicAgenciesCommentsSection={true}
          />
        ) : (
          <Card className="empty-card">
            <FolderOpenOutlined /> Nenhuma denúncia
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;