import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Premio } from "./interfaces/premio";
import { toast } from 'react-toastify';

const VerPremio = () => {
  const [data, setData] = useState<Premio | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/premio/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarPremio = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este premio?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/premio/${id}`)
        .then((response) => {
        if (response.status === 200) {
          // La eliminación fue exitosa
          setDeleted(true);
          toast.success("Premio eliminado con éxito!");
          setTimeout(() => {
            navigate("/premio");
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
      <ContentHeader title="Detalles del Premio" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Premio</h3>
                <div className="card-tools">
                <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarPremio}
                  >
                    Eliminar Premio
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/premio/editar/${data.id}`}
                  >
                    Editar Premio
                  </Link>
                  <Link to={`/premio`}className="btn btn-info">
                  Volver a la Lista
                </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Nombre del Premio:</strong> {data.premio}</p>
                    <p><strong>Puntos Necesarios:</strong> {data.puntos}</p>
                    <p><strong>Cantidad en Stock:</strong> {data.stock}</p>
                    <p><strong>Tipo de Usuario:</strong> {data.tipo_usuario_descripcion}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Precio:</strong> {data.precio}</p>
                    <p><strong>Nombre del Comercio:</strong> {data.nombre_comercio}</p>
                    <p><strong>Sucursal:</strong> {data.sucursal}</p>
                    <p><strong>Observación:</strong> {data.premio_observacion}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-9">
                    <img
                      src={`${data.foto_enlace}`}
                      alt="Foto del Premio" 
                      style={{ maxWidth: "100%" }}
                      className="img-fluid" 
                    />
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

export default VerPremio;
