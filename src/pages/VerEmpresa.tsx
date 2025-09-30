import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Empresa } from "./interfaces/empresa";
import { toast } from 'react-toastify';

const VerEmpresa = () => {
  const [data, setData] = useState<Empresa | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/empresa/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarEmpresa = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta empresa?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/empresa/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // La eliminación fue exitosa
          setDeleted(true);
          toast.success("Empresa eliminada con éxito!");
          setTimeout(() => {
            navigate("/empresa");
          }, 3000);
        } else {
          // Ocurrió un error en la eliminación
          toast.error("Error al eliminar la empresa");
          console.error("Error al eliminar la empresa");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la empresa:", error);
      });
    }
  };

  return (
    <div>
      <ContentHeader title="Detalles de la Empresa" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos de la Empresa</h3>
                <div className="card-tools">
                <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarEmpresa}
                  >
                    Eliminar Empresa
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/empresa/editar/${data.id}`}
                  >
                    Editar Empresa
                  </Link>
                  <Link to={`/empresa`}className="btn btn-info">
                  Volver a la Lista
                </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Empresa:</strong> {data.empresa}</p>
                    <p><strong>Razón Social:</strong> {data.razon_social}</p>
                  </div>
                  <div className="col-md-6">
                  <p><strong>Dirección:</strong> {data.direccion}</p>
                    <p><strong>Teléfono:</strong> {data.telefono}</p>
                    <p><strong>Email:</strong> {data.email}</p>
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

export default VerEmpresa;
