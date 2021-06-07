import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Steps, Button, message } from "antd";

import "./CreateDenunciation.css";

const { Step } = Steps;
const steps = [
  {
    title: "Localização",
    content: "Primeiro, selecione o local da ocorrência.",
  },
  {
    title: "Informações",
    content: "Agora, preencha as informações básicas da denúncia",
  },
  {
    title: "Anexo",
    content: "Adicione uma foto ou vídeo do ocorrido, caso tenha.",
  },
];

const CreateDenunciation = () => {
  const [position, setPosition] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        if (firstTime) {
          map.locate();
          setFirstTime(false);
        } else {
          setPosition(e.latlng);
        }
      },

      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout-content">
        <Steps className="my-stepper" current={current} direction="horizontal" responsive={false}>
          {steps.map((item) => (
            <Step key={item.title} title={current === steps.indexOf(item) ? item.title : null} />
          ))}
        </Steps>

        <h3 className="steps-content">{steps[current].content}</h3>

        <MapContainer
          center={{ lat: -20.1182, lng: -44.201 }}
          zoom={14}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>

        <div className="steps-action">
          <Button size="large" disabled={current === 0} onClick={() => prev()}>
            Voltar
          </Button>

          {current === steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              onClick={() => message.success("Processing complete!")}
            >
              Registrar
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" size="large" onClick={() => next()}>
              Próximo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDenunciation;
