import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ContentHeader } from "@components";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "../interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Consultorio } from "../interfaces/consultorio";

interface Nutricionista {
  id: string;
  usuario_id: string;
  nombre: string;
  apellido: string;
  consultorios: string[];
  licencia_profesional_nro: string;
  titulo_profesional: string;
  agenda_cada: string;
  dias_entrega: string;
  tipo_mediciones: string;
  pliegues_cutaneos: string[];
  otros_pliegues: string[];
  circunferencias: string[];
  calculos_utilizados: string[];
  foto: string;
}

const EditarProfileProfesional = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const id = `${authentication.profile.id}`;
  const [nutricionistaData, setNutricionistaData] = useState<Nutricionista>({
    nombre: "",
    apellido: "",
    id: "",
    usuario_id: "",
    licencia_profesional_nro: "",
    titulo_profesional: "",
    agenda_cada: "",
    dias_entrega: "",
    tipo_mediciones: "",
    pliegues_cutaneos: [],
    otros_pliegues: [],
    circunferencias: [],
    calculos_utilizados: [],
    consultorios: [],
    foto: "",
  });

  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);

  const fetchNutricionistaData = async () => {
    if (id === "undefined") {
      return;
    }
    const url = `/profesional/${authentication.profile.id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Nutricionista Data:", data);
    setNutricionistaData({
      ...data,
      pliegues_cutaneos: JSON.parse(data.pliegues_cutaneos),
      otros_pliegues: JSON.parse(data.otros_pliegues),
      circunferencias: JSON.parse(data.circunferencias),
      calculos_utilizados: JSON.parse(data.calculos_utilizados),
    });
  };

  const [selectedOtrosPliegues, setSelectedOtrosPliegues] =
    useState<{ value: string; label: string }[]>([]);
  const handleOtrosPlieguesChange = (selectedOptions: any) => {
    setSelectedOtrosPliegues(selectedOptions);
  };

  const [selectedCalculosUtilizados, setSelectedCalculosUtilizados] =
    useState<{ value: string; label: string }[]>([]);
  const handleCalculosUtilizadosChange = (selectedOptions: any) => {
    setSelectedCalculosUtilizados(selectedOptions);
  };

  const [selectedCircunsferencias, setSelectedCircunferencias] =
    useState<{ value: string; label: string }[]>([]);
  const handleCircunferenciasChange = (selectedOptions: any) => {
    setSelectedCircunferencias(selectedOptions);
  };

  const [selectedPliegues_Cutaneos, setSelectedPlieguesCutaneos] =
    useState<{ value: string; label: string }[]>([]);
  const handlePlieguesCutaneosChange = (selectedOptions: any) => {
    setSelectedPlieguesCutaneos(selectedOptions);
  };



  const fetchConsultorios = async () => {
    const url = `/consultorio`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Consultorios Data:", data);
    setConsultorios(data);
  };

  useEffect(() => {
    fetchNutricionistaData();
    fetchConsultorios();
  }, []);


  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {  authenticatedApi()
    .get(`/profesional/${id}`)
      .then((res) => {
        const personaData = res.data;
        setNutricionistaData(personaData);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar los datos del profesional");
      });
  }, [id]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file); // Adjunta la foto al FormData
    }

    const responseUpload = await axios.post(
      "sin enlace x ahoraz",
      formData
    ); // Cambia la URL de la API para subir la foto
    const { filename } = responseUpload.data;
    const newData = { ...setNutricionistaData, foto: filename };
    await authenticatedApi().put(`/perfilprofesional/${id}`, newData) // Replace with your API endpoint
      .then((res) => {
        toast.success("Datos actualizados con éxito!");
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al actualizar los datos del perfil");
      });
  }
  return (
    <div>
      <ContentHeader title="Editar Perfil" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h4 className="card-title">Ingresar Información del Perfil</h4>
              <div className="card-tools">
                <Link to={`/profileprofesional`} className="btn btn-info">
                  Volver al Perfil
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos Profesionales</h4>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="consultorio">Consultorio</label>
                            <Select
                              options={consultorios.map((consultorio) => ({
                                value: consultorio.nombre,
                                label: consultorio.nombre,
                              }))}
                              onChange={(e) => {
                                const consultorio = e.map(
                                  (consultorio) => consultorio.value
                                );
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  consultorios: consultorio,
                                });
                              }}
                              isMulti={true}
                              value={
                                Array.isArray(nutricionistaData.consultorios)
                                  ? nutricionistaData.consultorios.map((value) => ({
                                    value: value,
                                    label: value,
                                  }))
                                  : []
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="licencia">Licencia</label>
                            <input
                              type="text"
                              className="form-control"
                              id="licencia"
                              placeholder="Licencia"
                              required
                              value={nutricionistaData.licencia_profesional_nro}
                              onChange={(e) =>
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  licencia_profesional_nro: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="tituloProfesional">Título Profesional</label>
                            <select
                              className="form-control"
                              id="tituloProfesional"
                              required
                              value={nutricionistaData.titulo_profesional}
                              onChange={(e) =>
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  titulo_profesional: e.target.value,
                                })
                              }
                            >
                              <option value="">Seleccionar</option>
                              <option value="Licenciado/a">Licenciado/a</option>
                              <option value="Doctor/a">Doctor/a</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="agendaCada">Agenda Cada</label>
                            {/* make a select input con los siguientes campos: Cada 15 minutos, Cada 30 minutos, Cada 45 minutos, Cada 60 minutos, Cada 90 minutos, Cada 120 minutos */}
                            <select
                              className="form-control"
                              id="agendaCada"
                              required
                              value={nutricionistaData.agenda_cada}
                              onChange={(e) =>
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  agenda_cada: e.target.value,
                                })
                              }
                            >
                              <option value="">Seleccionar</option>
                              <option value="15">Cada 15 minutos</option>
                              <option value="30">Cada 30 minutos</option>
                              <option value="45">Cada 45 minutos</option>
                              <option value="60">Cada 60 minutos</option>
                              <option value="90">Cada 90 minutos</option>
                              <option value="120">Cada 120 minutos</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="diasEntregaResultado">
                              Días Entrega Resultado
                            </label>
                            {/* make a select input with field from 1 dia to 15 dias  */}
                            <select
                              className="form-control"
                              id="diasEntregaResultado"
                              required
                              value={nutricionistaData.dias_entrega}
                              onChange={(e) =>
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  dias_entrega: e.target.value,
                                })
                              }
                            >
                              <option value="">Seleccionar</option>
                              <option value="1">1 día</option>
                              <option value="2">2 días</option>
                              <option value="3">3 días</option>
                              <option value="4">4 días</option>
                              <option value="5">5 días</option>
                              <option value="6">6 días</option>
                              <option value="7">7 días</option>
                              <option value="8">8 días</option>
                              <option value="9">9 días</option>
                              <option value="10">10 días</option>
                              <option value="11">11 días</option>
                              <option value="12">12 días</option>
                              <option value="13">13 días</option>
                              <option value="14">14 días</option>
                              <option value="15">15 días</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="tipoDeMediciones">Tipo de Mediciones</label>
                            {/* make a select input with the following fields: Solo Basico, Con Antropometria */}
                            <select
                              className="form-control"
                              id="tipoDeMediciones"
                              required
                              value={nutricionistaData.tipo_mediciones}
                              onChange={(e) =>
                                setNutricionistaData({
                                  ...nutricionistaData,
                                  tipo_mediciones: e.target.value,
                                })
                              }
                            >
                              <option value="">Seleccionar</option>
                              <option value="Basico">Solo Basico</option>
                              <option value="Antropometria">Con Antropometria</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {nutricionistaData.tipo_mediciones === "Antropometria" ? (
                    // new form with antropometria data
                    <div className="card card-light">
                      <div className="card-header">
                        <h4 className="card-title">Datos de Antropometria</h4>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="pliegues_cutaneos">Pliegues Cutaneos</label>
                              <Select
                                /*value={nutricionistaData.pliegues_cutaneos.map((pliegue) => {
                                    return {value: pliegue, label: pliegue}
                                })
                                }*/
                                onChange={handlePlieguesCutaneosChange}
                                isMulti={true}
                                options={[
                                  { value: "Triceps", label: "Triceps" },
                                  { value: "Subescapular", label: "Subescapular" },
                                  { value: "Abdominal", label: "Abdominal" },
                                  { value: "Muslo", label: "Muslo" },
                                  { value: "Pantorrilla", label: "Pantorrilla" },
                                ]}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="otro">Otros pliegues</label>
                              <Select
                                id="otros_pliegues"
                                name="otros_pliegues"
                                placeholder="Seleccionar Otros Pliegues"
                                onChange={handleOtrosPlieguesChange}
                                isMulti={true}
                                options={[
                                  { value: "Biceps", label: "Biceps" },
                                  { value: "Cresta Iliaca", label: "Cresta Iliaca" },
                                ]}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="circunferencias"> Circunferencias </label>
                              <Select
                                onChange={handleCircunferenciasChange}
                                isMulti={true}
                                options={[
                                  { value: "Cintura", label: "Cintura" },
                                  { value: "Cadera", label: "Cadera" },
                                ]}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="calculosUtilizados">
                                Calculos utilizados
                              </label>
                              <Select
                                onChange={handleCalculosUtilizadosChange}
                                isMulti={true}
                                options={[
                                  { value: "Masa Corporal", label: "Masa Corporal" },
                                  { value: "Grasa DW", label: "Grasa DW" },
                                  { value: "Grasa Yuhasz", label: "Grasa Yuhasz" },
                                  { value: "Masa Grasa", label: "Masa Grasa" },
                                  { value: "Masa magra", label: "Masa magra" },
                                  { value: "Grasa reducidos", label: "Grasa reducidos" },
                                  { value: "Peso reducido", label: "Peso reducido" },
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                </div>

                <div className="col-md-12">
                  <button type="submit"
                    className="btn btn-info"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};
export default EditarProfileProfesional;
