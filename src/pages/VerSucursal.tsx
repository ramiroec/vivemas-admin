import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Sucursal } from "./interfaces/sucursal";
import { toast } from 'react-toastify';

const VerSucursal = () => {
  const [data, setData] = useState<Sucursal | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/sucursal/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarSucursal = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta sucursal?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/sucursal/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Sucursal eliminada con éxito!");
            setTimeout(() => {
              navigate("/sucursal");
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
      <ContentHeader title="Detalles de la Sucursal" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos de la Sucursal</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarSucursal}
                  >
                    Eliminar Sucursal
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/sucursal/editar/${data.id}`}
                  >
                    Editar Sucursal
                  </Link>
                  <Link to={`/sucursal`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>ID:</strong> {data.id}</p>                    
                    <p><strong>Nombre del Comercio:</strong> {data.nombre_comercio}</p>
                    <p><strong>Sucursal:</strong> {data.sucursal}</p>
                    <p><strong>Dirección:</strong> {data.direccion}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Contacto:</strong> {data.contacto_nombre_apellido}</p>
                    <p><strong>Celular de Contacto:</strong> {data.contacto_celular}</p>
                    <p><strong>Email de Contacto:</strong> {data.email}</p>
                    <p>
                      <strong>Ubicación:</strong>{" "}
                      <a
                        href={`${data.ubicacion}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Ubicación
                      </a>
                    </p>
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
export default VerSucursal;
