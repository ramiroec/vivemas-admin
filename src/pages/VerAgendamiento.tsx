import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Agendamiento } from "./interfaces/agendamiento";
import { toast } from "react-toastify";

const VerAgendamiento = () => {
  const [data, setData] = useState<Agendamiento | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/agendamiento/${id}`;
    authenticatedApi()
    .get(url)
    .then((response) => {
      setData(response.data);
    })
  }, [id]);

  return (
    <div>
      <ContentHeader title="Detalles del Agendamiento" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos del Agendamiento</h3>
                <div className="card-tools">
                  <button className="btn bg-teal">
                    Confirmar Agendamiento
                  </button>
                  <button className="btn bg-maroon">
                    Cancelar Agendamiento
                  </button>

                  <Link
                    className="btn bg-teal"
                    to={`/agendamiento/editar/${data.id}`}
                  >
                    Editar Agendamiento
                  </Link>
                  <Link to={`/agendamiento`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>

              <div className="card-body">
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Agenda</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Id:</strong> {data.id}
                          </p>
                          <p>
                            <strong>Fecha:</strong> {data.fecha}
                          </p>
                          <p>
                            <strong>Hora Desde:</strong> {data.hora_desde}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                          <div className={`estado-${data.estado.toLowerCase().replace(/\s/g, '-')}`}>
                            <strong>Estado:</strong>
                             {data.estado}
                            </div>
                          </p>
                          <p>
                            <strong>Consultorio:</strong>{" "}
                            {data.nombre_consultorio}
                          </p>
                          <p>
                            <strong>Hora Hasta:</strong> {data.hora_hasta}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>A Domicilio:</strong> {data.a_domicilio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos del Paciente</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Nombre:</strong> {data.nombre_paciente}
                          </p>
                          <p>
                            <strong>Tipo de Documento:</strong>{" "}
                            {data.tipo_documento_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Apellido:</strong> {data.apellido_paciente}
                          </p>
                          <p>
                            <strong>Número de Documento:</strong>{" "}
                            {data.numero_documento_paciente}
                          </p>
                          <p>
                            <strong>Email:</strong> {data.email_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Celular:</strong> {data.celular_paciente}
                          </p>
                        </div>
                        <div className="col-md-12">
                          <p>
                            <strong>Observaciones:</strong>{" "}
                            {data.celular_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Latitud:</strong> {data.celular_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Longitud:</strong> {data.celular_paciente}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos del Responsable</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Nombre:</strong> {data.nombre_paciente}
                          </p>
                          <p>
                            <strong>Tipo de Documento:</strong>{" "}
                            {data.tipo_documento_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Apellido:</strong> {data.apellido_paciente}
                          </p>
                          <p>
                            <strong>Número de Documento:</strong>{" "}
                            {data.numero_documento_paciente}
                          </p>
                          <p>
                            <strong>Email:</strong> {data.email_paciente}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Celular:</strong> {data.celular_paciente}
                          </p>
                        </div>
                        <div className="col-md-12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos de Facturación</h4>
                    </div>
                    <div className="card-body"></div>
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
export default VerAgendamiento;
