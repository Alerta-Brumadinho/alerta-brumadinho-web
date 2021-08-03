import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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
  const [firstTime, setFirstTime] = useState(true);

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
        console.log(error.message)
        setCategoriesLoading(false);
        errorNotification(
          "Erro ao carregar a lista de categorias. Por favor, atualize a página!"
        );
      });
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setFirstStepIsValid(true);
        if (firstTime) {
          map.locate();
          setFirstTime(false);
        } else {
          setDenunciation({
            ...denunciation,
            location: {
              ...denunciation.location,
              coordinates: [e.latlng.lat, e.latlng.lng],
            },
          });
        }
      },

      locationfound(e) {
        setDenunciation({
          ...denunciation,
          location: {
            ...denunciation.location,
            coordinates: [e.latlng.lat, e.latlng.lng],
          },
        });

        map.flyTo(e.latlng, map.getZoom());
        setFirstStepIsValid(true);
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
