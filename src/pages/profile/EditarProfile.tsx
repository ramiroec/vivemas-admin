import { useState, useEffect, FormEvent } from "react";
import { ContentHeader } from "@components";
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "../interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarProfile = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const id = `${authentication.profile.id}`
  const [data, setData] = useState({
    sexo: "",
    fecha_nacimiento: "2000-01-01",
    direccion: "",
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    area_trabajo: "",
    perfil: "",
    empresa_id: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    authenticatedApi()
    .get(`/usuario/${id}`)
      .then((res) => {
        const personaData = res.data;
        setData(personaData);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar los datos de la persona");
      });
  }, [id]);
  

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    authenticatedApi().put(`/usuario/${id}`, data)
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
  };

  return (
    <div>
      <ContentHeader title="Editar Perfil" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Perfil</h3>
              <div className="card-tools">
                <Link to={`/profile`} className="btn btn-info">
                  Volver al Perfil
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos Personales</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="nombre">Nombre *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nombre"
                              placeholder="Nombre de la persona"
                              required
                              value={data.nombre}
                              onChange={(e) =>
                                setData({ ...data, nombre: e.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="apellido">Apellido *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="apellido"
                              placeholder="Apellido de la persona"
                              required
                              value={data.apellido}
                              onChange={(e) =>
                                setData({ ...data, apellido: e.target.value })
                              }
                            />
                          </div>  
                          <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-envelope" />
                                </span>
                              </div>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                required
                                value={data.email}
                                onChange={(e) =>
                                  setData({ ...data, email: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="celular">Celular *</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-phone" />
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                id="celular"
                                name="celular"
                                placeholder="Número de celular"
                                required
                                value={data.celular}
                                onChange={(e) =>
                                  setData({ ...data, celular: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-info">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <small>
                * Campos obligatorios: Por favor, complete estos campos
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default EditarProfile;
