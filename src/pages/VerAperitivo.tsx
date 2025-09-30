import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Aperitivo } from "./interfaces/aperitivo";
import { toast } from 'react-toastify';

const VerAperitivo = () => {
  const [data, setData] = useState<Aperitivo | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false); //eslint-disable-line
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/aperitivos/${id}`; // Asegúrate de tener la URL correcta para obtener detalles de consultorios
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
      });
  }, [id]);

  const handleEliminarConsultorio = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este aperitivo?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/aperitivos/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Aperitivo eliminado con éxito!");
            setTimeout(() => {
              navigate("/aperitivos");
            }, 3000);
          } else {
            // Ocurrió un error en la eliminación
            toast.error("Error al eliminar");
            console.error("Error al eliminar");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
        });
    }
  };

  return (
    <div>
      <ContentHeader title="Detalles del Aperitivo" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Aperitivo</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarConsultorio}
                  >
                    Eliminar Aperitivo
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/aperitivos/editar/${data.id}`}
                  >
                    Editar Aperitivo
                  </Link>
                  <Link to={`/aperitivos`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <p><strong>Id:</strong> {data.id} </p>
                    <p><strong>Nombre:</strong> {data.nombre_comercial} </p>
                    <p><strong>Descripcion:</strong> {data.descripcion} </p>
                    <p><strong>Tipo de comida:</strong> { data.tipo_comida } </p>
                    <p><strong>Porcion:</strong> {data.porcion} </p>

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

export default VerAperitivo;

