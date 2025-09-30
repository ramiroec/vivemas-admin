import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Consejo } from "./interfaces/consejo";
import { toast } from 'react-toastify';

const VerConsejo = () => {
  const [data, setData] = useState<Consejo | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/consejo/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarConsejo = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este consejo?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/consejo/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Consejo eliminado con éxito!");
            setTimeout(() => {
              navigate("/consejo");
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
      <ContentHeader title="Detalles del Consejo" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Consejo</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarConsejo}
                  >
                    Eliminar Consejo
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/consejo/editar/${data.id}`}
                  >
                    Editar Consejo
                  </Link>
                  <Link to={`/consejo`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Tipo:</strong> {data.tipo}</p>
                    <p><strong>Consejo:</strong> {data.consejo}</p>
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
export default VerConsejo;
