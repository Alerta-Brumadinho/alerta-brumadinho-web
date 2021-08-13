import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./Audit.css";

import Navbar from "../../components/Navbar/Navbar";
import Denunciation from "../../components/Denunciation/Denunciation";
import { getUserFromDb, getToken } from "../../services/user";
import { errorNotification } from "../../services/messages";

const Audit = (props) => {
  const [nav, setNav] = useState(null);
  const [user, setUser] = useState(null);
  const [unverifiedDenunciations, setUnverifiedDenunciations] = useState(null);

  const getUnverifiedDenunciations = () => {
    axios
      .get(`/denunciations/fromStatus/unverified&created&-1`, {
        headers: { token: getToken() },
      })
      .then((res) => {
        console.log(res.data);
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
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const discardDenunciation = (denunciation) => {
    axios
      .put(
        `/denunciations/auditor/${denunciation._id}`,
        { status: "rejected" },
        {
          headers: { token: getToken() },
        }
      )
      .then((res) => {
        getUnverifiedDenunciations();
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
        <Navbar />

        <div className="main-layout-content">
          {unverifiedDenunciations?.map((d) => (
            <Denunciation
              key={d._id}
              denunciation={d}
              showAuditButtons={true}
              showLikesSection={false}
              showCommentsSection={false}
              approveDenunciationFunction={() => approveDenunciation(d)}
              discardDenunciationFunction={() => discardDenunciation(d)}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Audit;
