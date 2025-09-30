import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Paciente } from "./interfaces/paciente"; // Asegúrate de importar la interfaz Paciente desde el lugar correcto

function ListarPaciente() {
  const [pacientes, setData] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true); // Variable de estado para indicar si los datos se están cargando
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = `/paciente`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Cambiar el estado de loading a false cuando se reciban los datos
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    // Solo inicializar la tabla si no hay una instancia previa y si los datos no se están cargando
    if (tableRef.current && !dataTableRef.current && !loading) {
      // Guardar la instancia de DataTables en el ref
      dataTableRef.current = initializeDataTable(tableRef.current);
    }
  }, [pacientes, loading]);

  return (
    <div>
      <ContentHeader title="Pacientes" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Pacientes</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/paciente/crear">
                    Crear Paciente
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? ( // Mostrar un mensaje si los datos se están cargando
                <p>Cargando datos...</p>
              ) : ( // Mostrar la tabla si los datos no se están cargando
                <table
                  ref={tableRef}
                  className="table table-bordered table-hover datatable full-width nowrap"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Documento</th>
                      <th>Email</th>
                      <th>Celular</th>
                      <th>Puntos</th>
                      <th>Puntos Canjeados</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((paciente, index) => (
                      <tr key={paciente.id}>
                        <td>{paciente.id}</td>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.numero_documento}</td>
                        <td>{paciente.email}</td>
                        <td>{paciente.celular}</td>
                        <td>{paciente.puntos}</td>
                        <td>{paciente.puntos_canjeados}</td>
                        <td>
                          {/* Botón para ver más información del paciente */}
                          <Link
                            className="btn btn-sm btn-info mr-2"
                            to={`/paciente/${paciente.id}`}
                          >
                            <i className="fa fa-eye"></i> Ver más
                          </Link>
                          {/* Enlace elegante para ver actividades */}
                          <Link
                            className="btn btn-sm btn-primary"
                            to={`/actividad/${paciente.id}`}
                          >
                            <i className="fa fa-running"></i> Actividades
                          </Link>
                        </td>
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

export default ListarPaciente;
