import React, { useState } from "react";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearAntecedente = () => {
  const [data, setData] = useState({
    antecedente: "", // Valor por defecto
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();
    api
      .post("/antecedente", data) // Cambia la URL de la API según tu configuración
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/antecedente"); // Redirige a la página de antecedentes después de guardar
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Antecedente" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Antecedente</h3>
              <div className="card-tools">
              <Link to="/antecedente" className="btn btn-info">
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
                    onChange={(e) =>
                      setData({ ...data, antecedente: e.target.value })
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
export default CrearAntecedente;
