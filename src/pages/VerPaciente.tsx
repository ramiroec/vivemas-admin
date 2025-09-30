import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Paciente } from "./interfaces/paciente";
import { toast } from 'react-toastify';
import moment from 'moment';

const VerPaciente = () => {
  const [data, setData] = useState<Paciente | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/paciente/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminar = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/paciente/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Eliminado con éxito!");
            setTimeout(() => {
              navigate("/paciente");
            }, 3000);
          } else {
            // Ocurrió un error en la eliminación
            toast.error("Error al eliminar");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          toast.error("Error: el paciente ya tiene registros.");
        });
    }
  };

  return (
    <div>
      <ContentHeader title="Detalles del Paciente" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Información de la Paciente</h3>
                <div className="card-tools">
                <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminar}
                  >
                    Eliminar Paciente
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/paciente/editar/${data.id}`}
                  >
                    Editar Paciente
                  </Link>
                  <Link to={`/paciente`}className="btn btn-info">
                  Volver a la Lista
                </Link>
                </div>
              </div>

              <div className="card-body">
                  <div className="col-md-12">
                    <div className="card card-light">
                      <div className="card-header">
                        <h4 className="card-title">Datos Personales</h4>                      
                    </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Nombre:</strong> {data.nombre}</p>
                            <p><strong>Apellido:</strong> {data.apellido}</p>
                            <p><strong>Tipo de Documento:</strong> {data.tipo_documento}</p>
                            <p><strong>Número de Documento:</strong> {data.numero_documento}</p>
                            <p><strong>Email:</strong> {data.email}</p>
                            <p><strong>Celular:</strong> {data.celular}</p>
                            <p><strong>Empresa:</strong> {data.empresa ? data.empresa : "Sin Empresa"}</p>
                            <p><strong>Puntos:</strong> {data.puntos}</p>
                            <p><strong>Puntos Canjeados:</strong> {data.puntos_canjeados}</p>
                         
                            
                          </div>
                          <div className="col-md-6">
                            <p><strong>Sexo:</strong> {data.sexo}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {data.fecha_nacimiento}</p>
                            <p><strong>Dirección:</strong> {data.direccion}</p>
                            <p><strong>Pais:</strong> {data.pais}</p>
                            <p><strong>Departamento:</strong> {data.departamento}</p>
                            <p><strong>Ciudad:</strong> {data.ciudad}</p>
                            <p><strong>Barrio:</strong> {data.barrio ? data.barrio : "Sin Barrio"}</p>
                            <p><strong>Fecha de registro:</strong> {moment(data.fecha_registro).format('DD/MM/YYYY')}</p>
                            <p><strong>Tipo de Usuario:</strong> {data.descripcion_tipo_usuario}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="card card-light">
                      <div className="card-header">
                        <h4 className="card-title">Datos Médicos</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Realiza Actividad Física:</strong> {data.realiza_actividad_fisica}</p>
                            <p><strong>Veces por Semana que Realiza Actividad Física:</strong> {data.cantidad_veces_semana_act_fisica}</p>
                            <p><strong>Horas de Actividad Física al Día:</strong> {data.horas_dia_actividad_fisica}</p>
                            <p><strong>Horario de Actividad Física:</strong> {data.horario_actividad_fisica}<strong>   hs</strong></p>
                            <p><strong>Antecedentes Personales:</strong> {data.antecedentes_personales?.join(", ") || 'No especificado'}</p>
                            <p><strong>Antecedentes Familiares:</strong> {data.antecedentes_familiares?.join(", ") || 'No especificado'}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Litros de Agua por Día:</strong> {data.litros_agua_dia}</p>
                            <p><strong>Kilogramos de Peso:</strong> {data.kilogramos_peso}</p>
                            <p><strong>Metros de Altura:</strong> {data.metros_altura}</p>
                            <p><strong>Índice de Masa Corporal (IMC):</strong> {data.imc}</p>
                            <p><strong>Fuma:</strong> {data.fuma}</p>
                            <p><strong>Toma Alcohol:</strong> {data.toma_alcohol}</p>
                          </div>
                        </div>
                      </div>
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
export default VerPaciente;