import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Antecedente } from "./interfaces/antecedente";
import { toast } from 'react-toastify';

const VerAntecedente = () => {
  const [data, setData] = useState<Antecedente | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/antecedente/${id}`; 
    authenticatedApi()
    .get(url)
    .then((response) => {
      setData(response.data);
    })
  }, [id]);

  const handleEliminarAntecedente = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar ese antecedente?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/antecedente/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Antecedente eliminado con éxito!");
            setTimeout(() => {
              navigate("/antecedente");
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
      <ContentHeader title="Detalles del Antecedente" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Antecedente</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarAntecedente}
                  >
                    Eliminar Antecedente
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/antecedente/editar/${data.id}`}
                  >
                    Editar Antecedente
                  </Link>
                  <Link to={`/antecedente`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Antecedente:</strong> {data.antecedente}</p>
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

export default VerAntecedente;
