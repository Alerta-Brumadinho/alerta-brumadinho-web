import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Radio,
  Form,
  Input,
  Select,
  Steps,
  Button,
  Upload,
  message,
} from "antd";

import {
  getLocation,
  getUserFromDb,
  getToken,
  isAnExternalUser,
} from "../../services/user";
import {
  successNotification,
  errorNotification,
} from "../../services/messages";

import "./CreateDenunciation.css";

const { Option } = Select;
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

const brumadinhoPolygon = [
  [-20.1358916, -44.3899424 ],
  [-20.009484, -43.9736273],
  [-20.3105012, -43.9722533],
];

// const brumadinhoPolygon = [
//   [-44.3090435, -20.1881017],
//   [-44.3082968, -20.1926129],
//   [-44.3000529, -20.20679],
//   [-44.295931, -20.2274089],
//   [-44.2773823, -20.2409386],
//   [-44.2588336, -20.2589763],
//   [-44.234102, -20.2518903],
//   [-44.2011266, -20.2486693],
//   [-44.1660901, -20.2441598],
//   [-44.1516634, -20.2589763],
//   [-44.1365496, -20.2866731],
//   [-44.1276188, -20.3143648],
//   [-44.1056351, -20.3272431],
//   [-44.0747206, -20.3362572],
//   [-44.0252575, -20.3375449],
//   [-43.9730463, -20.3259553],
//   [-43.9448798, -20.3105012],
//   [-43.9517497, -20.2840968],
//   [-43.9709854, -20.2441598],
//   [-43.9792292, -20.1984128],
//   [-43.9669231, -20.1494293],
//   [-43.97448, -20.1171949],
//   [-43.9875328, -20.093982],
//   [-43.9847848, -20.0507711],
//   [-44.0040205, -20.0578663],
//   [-44.0631015, -20.0701208],
//   [-44.097451, -20.0752803],
//   [-44.1256175, -20.0752803],
//   [-44.1620279, -20.0701208],
//   [-44.215613, -20.0759252],
//   [-44.2369097, -20.0836641],
//   [-44.2719461, -20.0888231],
//   [-44.2877468, -20.1036545],
//   [-44.3310271, -20.1152606],
//   [-44.338584, -20.1275106],
//   [-44.3482018, -20.161032],
//   [-44.3090435, -20.1881017],
// ];

const CreateDenunciation = () => {
  const [nav, setNav] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Categories Settings States
  const [categories, setCategories] = useState(null);
  const [photo, setPhoto] = useState(null);

  // Loading States
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [registerDenunciationLoading, setRegisterDenunciationLoading] =
    useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  // Map Settings States
  const [zoom, setZoom] = useState(14);
  const [denunciation, setDenunciation] = useState({
    category: null,
    title: null,
    description: null,
    anonymous: null,
    publisher: null,
    media: [],
    location: { type: "Point", coordinates: null },
    uf: null,
    city: null,
  });

  const getDenunciationBasicData = () => {
    if (getToken() === "externalUser") {
      setDenunciation({
        ...denunciation,
        anonymous: true,
        publisher: "externalUser",
        uf: getLocation().uf,
        city: getLocation().city,
      });
    } else {
      const userPromise = getUserFromDb();
      userPromise.then((result) => {
        setDenunciation({
          ...denunciation,
          publisher: result._id,
          uf: result.uf,
          city: result.city,
        });
      });
    }
  };

  // Steps Validation States
  const [firstStepIsValid, setFirstStepIsValid] = useState(false);
  const [secondStepIsValid, setSecondStepIsValid] = useState(false);
  const [thirdStepIsValid, setThirdStepIsValid] = useState(false);

  const [form] = Form.useForm();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to validate second step values
  const secondStepValidation = () => {
    const fields = form.getFieldsValue();

    if (
      fields["anonymous"] !== null &&
      fields["category"] &&
      fields["title"] &&
      fields["description"]
    ) {
      setSecondStepIsValid(true);
    } else {
      setSecondStepIsValid(false);
    }
  };

  const registerDenunciation = () => {
    getDenunciationBasicData();
  };

  const getCategories = () => {
    setCategoriesLoading(true);

    axios
      .get("/categories/list")
      .then((res) => {
        setCategoriesLoading(false);
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        setCategoriesLoading(false);
        errorNotification(
          "Erro ao carregar a lista de categorias. Por favor, atualize a página!"
        );
      });
  };

  const isMarkerInsidePolygon = (marker) => {
    var polyPoints = brumadinhoPolygon;
    var x = marker.lat,
      y = marker.lng;

    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      var xi = polyPoints[i][0],
        yi = polyPoints[i][1];
      var xj = polyPoints[j][0],
        yj = polyPoints[j][1];

      var intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    console.log(inside);
    return inside;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if(isMarkerInsidePolygon(e.latlng)) {
          setFirstStepIsValid(true);
          setDenunciation({
            ...denunciation,
            location: {
              ...denunciation.location,
              coordinates: [e.latlng.lat, e.latlng.lng],
            },
          });
        } else {
          errorNotification('Você deve selecionar um local dentro de Brumadinho - MG!')
        }

      },
      zoomend(e) {
        setZoom(e.target._zoom);
      },
    });

    return denunciation.location.coordinates === null ? null : (
      <Marker
        position={{
          lat: denunciation.location.coordinates[0],
          lng: denunciation.location.coordinates[1],
        }}
      />
    );
  };

  const beforeUpload = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      return true;
    }

    message.error("Erro! Só é permitido extensões JPG, JPEG ou PNG.");
    return false;
  };

  const uploadImage = ({ file }) => {
    setPhotoLoading(true);

    const formData = new FormData();
    formData.append("api_key", "131724773834346");
    formData.append("upload_preset", "jpdyw4h7");
    formData.append("file", file);
    formData.append("folder", "profile-pictures");

    axios
      .post("https://api.cloudinary.com/v1_1/brumadinho/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        setPhoto(res.data.secure_url);
        setPhotoLoading(false);
        setThirdStepIsValid(true);
        setDenunciation({ ...denunciation, media: [res.data.secure_url] });
      })
      .catch((error) => {
        setPhotoLoading(false);
        errorNotification();
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (denunciation.publisher) {
      setRegisterDenunciationLoading(true);
      axios
        .post("/denunciations/create", denunciation, {
          headers: !isAnExternalUser() ? { token: getToken() } : {},
        })
        .then((res) => {
          setNav("/feed");
          setRegisterDenunciationLoading(false);
          successNotification(
            "Denúncia registrada com sucesso. Ela está sendo verificada e em breve estará disponível no Feed."
          );
        })
        .catch((error) => {
          setRegisterDenunciationLoading(false);
          errorNotification();
        });
    }
  }, [denunciation]);

  if (nav) return <Redirect to={nav} />;
  else {
    return (
      <div className="main-layout">
        <Navbar />

        <div className="main-layout-content">
          <Steps
            className="my-stepper"
            current={currentStep}
            direction="horizontal"
            responsive={false}
          >
            {steps.map((item) => (
              <Step
                key={item.title}
                title={currentStep === steps.indexOf(item) ? item.title : null}
              />
            ))}
          </Steps>

          <h3 className="steps-content">{steps[currentStep].content}</h3>

          {/* Step 1 - Occurrency Location */}
          {currentStep === 0 ? (
            <MapContainer
              center={
                denunciation.location.coordinates
                  ? {
                      lat: denunciation.location.coordinates[0],
                      lng: denunciation.location.coordinates[1],
                    }
                  : { lat: -20.1182, lng: -44.201 }
              }
              zoom={zoom}
              zoomControl={true}
              className="map-container"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
              <Polygon
                pathOptions={{ color: "transparent", fillColor: "black" }}
                positions={brumadinhoPolygon}
              />
            </MapContainer>
          ) : /* Step 2 - Basic Info */
          currentStep === 1 ? (
            <div>
              <Form
                name="info"
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
              >
                <Form.Item
                  label="Identificação:"
                  name="anonymous"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione uma opção!",
                    },
                  ]}
                >
                  <Radio.Group
                    value={denunciation.anonymous}
                    onChange={(e) => {
                      setDenunciation({
                        ...denunciation,
                        anonymous: e.target.value,
                      });
                      secondStepValidation();
                    }}
                  >
                    <Radio value={true}>Quero Denunciar Anonimamente</Radio>
                    <Radio value={false}>Quero Ser Identificado</Radio>
                  </Radio.Group>
                </Form.Item>

                {/* Category */}
                <Form.Item
                  label="Categoria:"
                  name="category"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione uma categoria!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    optionFilterProp="children"
                    placeholder="Selecione uma Categoria..."
                    filterOption={true}
                    loading={categoriesLoading}
                    value={denunciation.category}
                    onChange={secondStepValidation}
                    notFoundContent={<div> Nenhuma Categoria </div>}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    onSelect={(value, option) =>
                      setDenunciation({ ...denunciation, category: option.key })
                    }
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.name}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Title */}
                <Form.Item
                  label="Título:"
                  name="title"
                  hasFeedback
                  rules={[
                    {
                      whitespace: true,
                      message: "Por favor, insira um título válido!",
                    },
                    {
                      required: true,
                      message: "Por favor, insira um título!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    maxLength={60}
                    placeholder="Adicione um título à denúnca..."
                    value={denunciation.title ? denunciation.title : ""}
                    onChange={(e) => {
                      secondStepValidation();
                      setDenunciation({
                        ...denunciation,
                        title: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                {/* Description */}
                <Form.Item
                  label="Descrição:"
                  name="description"
                  hasFeedback
                  rules={[
                    {
                      whitespace: true,
                      message: "Por favor, insira uma descrição válida!",
                    },
                    {
                      required: true,
                      message: "Por favor, insira uma descrição!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    size="large"
                    maxLength={255}
                    placeholder="Adicione uma descrição da ocorrência..."
                    style={{ maxHeight: "200px", minHeight: "120px" }}
                    value={
                      denunciation.description ? denunciation.description : ""
                    }
                    onChange={(e) => {
                      secondStepValidation();
                      setDenunciation({
                        ...denunciation,
                        description: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form>
            </div>
          ) : /* Step 3 - Attachments */
          currentStep === 2 ? (
            <div className="denunciation-content">
              <Upload
                listType="picture-card"
                customRequest={uploadImage}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                {photo ? (
                  <img src={photo} alt="Foto" style={{ width: "100%" }} />
                ) : (
                  <div>
                    {photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="ant-upload-text">
                      {photoLoading ? "Adicionando..." : "Adicionar"}
                    </div>
                  </div>
                )}
              </Upload>
            </div>
          ) : null}

          <div className="steps-action">
            <Button
              size="large"
              disabled={currentStep === 0}
              onClick={() => previousStep()}
            >
              Voltar
            </Button>

            {currentStep < steps.length - 1 && (
              <Button
                type="primary"
                size="large"
                onClick={() => nextStep()}
                disabled={
                  currentStep === 0 ? !firstStepIsValid : !secondStepIsValid
                }
              >
                Próximo
              </Button>
            )}

            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                size="large"
                disabled={!thirdStepIsValid}
                onClick={registerDenunciation}
                loading={registerDenunciationLoading}
              >
                Registrar
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default CreateDenunciation;
