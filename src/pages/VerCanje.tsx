import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Canje } from "./interfaces/canje"; // Asegúrate de importar la interfaz Canje adecuada
import { toast } from 'react-toastify';

const VerCanje = () => {
  const [data, setData] = useState<Canje | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/canje/${id}`;
    authenticatedApi()
    .get(url)
    .then((response) => {
      setData(response.data);
    })
  }, [id]);

  const handleCancelarCanje = async () => {
    try {
      const api = authenticatedApi();
      api.put(`/canje/cancelar/${id}`)
      .then((response) => {
        if (response.status === 200) {
        // La aprobación fue exitosa, actualiza los datos del canje
        const newData = { ...data, estado: "CANCELADO" };
        setData(newData as Canje);

        // Aquí llamas a la función setData con el nuevo valor
        toast.success("Canje cancelado con éxito!");
      } else {
        // Ocurrió un error en la aprobación
        toast.error("Error al cancelar el canje");
        console.error("Error al cancelar el canje");
      }
    })
    } catch (error) {
      console.error("Error al cancelar el canje:", error);
      toast.error("Error al cancelar el canje");
    }
  };
  const handleAprobarCanje = async () => {
    try {
      const api = authenticatedApi();
      api.put(`/canje/aprobar/${id}`)
      .then((response) => {
        if (response.status === 200) {
        // La aprobación fue exitosa, actualiza los datos del canje
        const newData = { ...data, estado: "ENTREGADO" };
        setData(newData as Canje);

        // Aquí llamas a la función setData con el nuevo valor
        toast.success("Canje aprobado con éxito!");
      } else {
        // Ocurrió un error en la aprobación
        toast.error("Error al aprobar el canje");
        console.error("Error al aprobar el canje");
      }
    })
    } catch (error) {
      console.error("Error al aprobar el canje:", error);
      toast.error("Error al aprobar el canje");
    }
  };
  return (
    <div>
      <ContentHeader title="Detalles del Canje" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Canje</h3>
                <div className="card-tools">
                  <div className="card-tools">
                    {data.estado === "PENDIENTE" && (
                      <>
                        <button className="btn bg-maroon" onClick={handleCancelarCanje}>
                          Cancelar Canje
                        </button>
                        <button className="btn bg-teal" onClick={handleAprobarCanje}>
                          Aprobar Canje
                        </button>
                      </>
                    )}
                    <Link to={`/canje`} className="btn btn-info">
                      Volver a la Lista
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <p><strong>Nombre:</strong> {data.nombre}</p>
                    <p><strong>Apellido:</strong> {data.apellido}</p>
                    <p><strong>Número de Documento:</strong> {data.numero_documento}</p>
                    <p><strong>Premio:</strong> {data.premio}</p>
                    <p><strong>Fecha:</strong> {data.fecha}</p>
                    <p><strong>Comercio:</strong> {data.comercio}</p>
                    <p><strong>Sucursal:</strong> {data.sucursal}</p>
                    <p><strong>Estado:</strong> {data.estado}</p>
                    <img
                      src={`${data.qr}`}
                      alt="QR"
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

export default VerCanje;
