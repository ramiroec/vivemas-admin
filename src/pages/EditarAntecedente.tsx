import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarAntecedente = () => {
  const [data, setData] = useState({
    antecedente: "", 
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {  authenticatedApi()
    .get(`/antecedente/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al obtener los datos del antecedente");
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticatedApi().put(`/antecedente/${id}`, data)
      .then((res) => {
        console.log(res);
        toast.success("Actualizado con éxito!");
        setTimeout(() => {
          navigate("/antecedente");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Editar Antecedente" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Editar Información del Antecedente</h3>
              <div className="card-tools">
              <Link to={`/antecedente/${id}`}className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group col-md-6">
                  <label htmlFor="antecedente">Antecedente (hasta 50 caracteres)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="antecedente"
                    placeholder="Escribe el antecedente aquí"
                    maxLength={50}
                    required
                    value={data.antecedente}
                    onChange={(e) => setData({ ...data, antecedente: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-info">
                  Guardar Cambios
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
export default EditarAntecedente;
