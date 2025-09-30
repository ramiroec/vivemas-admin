import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ActividadExtra } from "./interfaces/actividadextra";
import { toast } from 'react-toastify';

const VerActividadExtra = () => {
  const [data, setData] = useState<ActividadExtra | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/actividadextra/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarActividadExtra = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta actividad extra?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/actividadextra/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Actividad extra eliminada con éxito!");
            setTimeout(() => {
              navigate("/actividadextra");
            }, 3000);
          } else {
            // Ocurrió un error en la eliminación
            toast.error("Error al eliminar la actividad extra");
            console.error("Error al eliminar la actividad extra");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la actividad extra:", error);
        });
    }
  };

  return (
    <div>
      <ContentHeader title="Detalles de la Actividad Extra" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos de la Actividad Extra</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarActividadExtra}
                  >
                    Eliminar Actividad Extra
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/actividadextra/editar/${data.id}`}
                  >
                    Editar Actividad Extra
                  </Link>
                  <Link to={`/actividadextra`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Descripción:</strong> {data.descripcion}</p>
                    <p><strong>Fecha:</strong> {data.fecha}</p>
                    <p><strong>Puntos:</strong> {data.puntos}</p>
                    <p><strong>Costo:</strong> {data.costo}</p>
                    <p><strong>Enlace:</strong> {data.enlace}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Stock:</strong> {data.stock}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VerActividadExtra;
