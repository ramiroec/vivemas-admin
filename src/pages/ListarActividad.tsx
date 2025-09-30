import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";

interface Actividad {
  fecha: string;
  pasos: number;
  calorias: number;
}

interface PacienteActividades {
  nombreCompleto: string;
  actividades: Actividad[];
}

function ListarActividad() {
  const { id } = useParams<{ id: string }>();
  const [pacienteActividades, setPacienteActividades] = useState<PacienteActividades | null>(null);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<any>(null);

  useEffect(() => {
    const url = `/actividad_semana/paciente/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        const data = response.data;
        data.actividades.sort((a: Actividad, b: Actividad) => {
          const dateA = new Date(a.fecha.split("/").reverse().join("-"));
          const dateB = new Date(b.fecha.split("/").reverse().join("-"));
          return dateB.getTime() - dateA.getTime(); // Ordenar de más reciente a más antigua
        });
  
        setPacienteActividades(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener actividades:", error);
        setLoading(false);
      });
  }, [id]);
  

  useEffect(() => {
    if (tableRef.current && !dataTableRef.current && !loading && pacienteActividades?.actividades.length) {
      dataTableRef.current = initializeDataTable(tableRef.current);
    }
  }, [pacienteActividades, loading]);

  return (
    <div>
      <ContentHeader title="Actividades del Paciente" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">
                    Actividades del Paciente: {pacienteActividades?.nombreCompleto || "Cargando..."}
                  </h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/paciente">
                    Volver a Pacientes
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Cargando actividades...</p>
              ) : !pacienteActividades ? (
                <p>Error al cargar las actividades o el paciente no tiene actividades.</p>
              ) : (
                <table
                  className="table table-bordered table-hover datatable"
                >
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Pasos</th>
                      <th>Calorías</th>
                      <th>Puntos</th> {/* Nueva columna */}
                    </tr>
                  </thead>
                  <tbody>
                    {pacienteActividades.actividades.map((actividad, index) => (
                      <tr key={index}>
                        <td>{actividad.fecha}</td>
                        <td>{actividad.pasos}</td>
                        <td>{actividad.calorias}</td>
                        <td>{Math.min(Math.floor(actividad.calorias / 10),85)}</td> {/* Calcular puntos */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListarActividad;