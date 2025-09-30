import { useEffect, useState } from "react";
import axios from "axios";
import { ContentHeader } from "@components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrearSuplemento = () => {
    const { id } = useParams();
    const [data, setData] = useState({
    descripcion: "",
    marca: "",
    caracteristicas: "",
    como_tomar: "",
    imagen: "",
  });

  const navigate = useNavigate();

  useEffect(() => {  authenticatedApi()
    .get(`/suplementos/${id}`)
      .then((res) => {
        setData(res.data);
      })}, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticatedApi().put(`/suplementos/${id}`, data) // Cambia la URL de la API según tu configuración
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/suplementos"); // Redirige a la página de consultorios después de guardar
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Consultorio" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Suplemento</h3>
              <div className="card-tools">
                <Link to="/suplementos" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <label htmlFor="nombre_suplemento">Nombre del Suplemento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre_suplemento"
                        placeholder="Escribe el nombre del suplemento aquí"
                        maxLength={100}
                        required
                        value={data.descripcion}
                        onChange={(e) =>
                        setData({ ...data, descripcion: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="marca">Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        placeholder="Escribe la marca aquí"
                        maxLength={100}
                        required
                        value={data.marca}
                        onChange={(e) =>
                        setData({ ...data, marca: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="caracteristicas">Características</label>
                    <textarea
                        className="form-control"
                        id="caracteristicas"
                        placeholder="Escribe las características aquí"
                        maxLength={500}
                        required
                        value={data.caracteristicas}
                        onChange={(e) =>
                        setData({ ...data, caracteristicas: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="como_tomar">Cómo tomar</label>
                    <input
                        type="text"
                        className="form-control"
                        id="como_tomar"
                        placeholder="Escribe cómo tomar aquí"
                        maxLength={100}
                        required
                        value={data.como_tomar}
                        onChange={(e) =>
                        setData({ ...data, como_tomar: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagen"
                        placeholder="Escribe la imagen aquí"
                        maxLength={100}
                        required
                        value={data.imagen}
                        onChange={(e) =>
                        setData({ ...data, imagen: e.target.value })
                        }
                    />
                </div>
              <button type="submit" className="btn btn-info">
                  Guardar
                </button>
              </form>
            </div>
            <div className="card-footer">
              <small>* Todos los campos son obligatorios</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrearSuplemento;
