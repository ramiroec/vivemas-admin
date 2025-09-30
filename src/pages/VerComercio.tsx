import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Comercio } from "./interfaces/comercio";
import { Modal } from 'react-bootstrap'; // Asegúrate de instalar react-bootstrap
import { toast } from 'react-toastify';

const VerComercio = () => {
  const [data, setData] = useState<Comercio | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/comercio/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminarComercio = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este comercio?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/comercio/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // La eliminación fue exitosa
          setDeleted(true);
          toast.success("Comercio eliminado con éxito!");
          setTimeout(() => {
            navigate("/comercio");
          }, 3000);
        } else {
          // Ocurrió un error en la eliminación
          toast.error("Error al eliminar el comercio");
          console.error("Error al eliminar el comercio");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el comercio:", error);
      });
    }
  };

  const handleLogoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ContentHeader title="Detalles del Comercio" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Comercio</h3>
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminarComercio}
                  >
                    Eliminar Comercio
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/comercio/editar/${data.id}`}
                  >
                    Editar Comercio
                  </Link>
                  <Link to={`/comercio`}className="btn btn-info">
                  Volver a la Lista
                </Link>
                </div>
              </div>
              <div className="card-body d-flex">
                <div className="col-md-8">
                  <p><strong>ID:</strong> {data.id}</p>
                  <p><strong>RUC:</strong> {data.ruc}</p>
                  <p><strong>Nombre del Comercio:</strong> {data.nombre}</p>
                  <p><strong>Descripción:</strong> {data.descripcion}</p>
                  <p><strong>Email:</strong> {data.email}</p>
                  <p><strong>Dirección:</strong> {data.direccion}</p>
                  <p><strong>Contacto:</strong> {data.contacto_nombre_apellido}</p>
                  <p><strong>Celular de Contacto:</strong> {data.contacto_celular}</p>
                </div>
                <div className="col-md-4 text-center">
                  {data.logo_url && (
                    <div>
                      
                      <img 
                        src={data.logo_url} 
                        alt="Logo del Comercio" 
                        style={{ 
                          width: "150px", 
                          height: "150px", 
                          borderRadius: "50%", 
                          objectFit: "cover", 
                          cursor: "pointer", 
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
                        }} 
                        onClick={handleLogoClick} // Agrega el evento onClick
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          )}
        </div>
      </section>

      {/* Modal para mostrar la imagen completa */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Body>
          {data && (
            <img 
              src={data.logo_url} 
              alt="Logo Completo" 
              style={{ width: "100%", height: "auto" }} 
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VerComercio;
