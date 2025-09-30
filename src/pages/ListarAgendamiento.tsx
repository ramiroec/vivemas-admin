import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Agendamiento } from "./interfaces/agendamiento";  // Asegúrate de importar la interfaz correcta

function ListarAgendamiento() {
  const [agendamientos, setAgendamientos] = useState<Agendamiento[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/agendamiento";  // Actualiza la URL para los agendamientos

    authenticatedApi().get(url)
      .then((response) => {
        setAgendamientos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (agendamientos.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [agendamientos]);

  return (
    <div>
      <ContentHeader title="Agendamientos" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Agendamientos</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/agendamiento/historial">
                    Historial de Agendamientos
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table
                ref={tableRef}
                className="table table-bordered table-hover datatable full-width nowrap"
              >
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>Consultorio</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamientos.map((agendamiento, index) => (
                    <tr key={agendamiento.id}>
                      <td>{agendamiento.id}</td>
                      <td>{agendamiento.fecha}</td>
                      <td>{agendamiento.hora_desde}</td>
                      <td>{agendamiento.hora_hasta}</td>
                      <td>{agendamiento.nombre_consultorio || "Libre"}</td>
                      <td>{agendamiento.nombre_paciente || "Libre"}</td>
                      <td className={`estado-${agendamiento.estado.toLowerCase().replace(/\s/g, '-')}`}>
                        {agendamiento.estado || "N/A"}
                      </td>
                      <td>
                        {agendamiento.estado === "Disponible" ? (
                          <Link
                            className="btn btn-primary"
                            to={`/agendamiento/editar/${agendamiento.id}`}
                          >
                            Reservar
                          </Link>
                        ) : (
                          <Link
                            className="icon-block"
                            to={`/agendamiento/${agendamiento.id}`}
                          >
                            <i className="fa fa-fw fa-plus"></i>Ver más
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListarAgendamiento;

// Agrega el siguiente bloque de CSS al final de tu archivo JavaScript (React)
const styles = `
.estado-reservado {
  background-color: #ffcccb; /* Rojo claro para estado Reservado */
}

.estado-pendiente {
  background-color: #ffeeba; /* Amarillo claro para estado Pendiente */
}

.estado-cancelado {
  background-color: #d3d3d3; /* Gris claro para estado Cancelado */
}

.estado-confirmado {
  background-color: #c1e7c3; /* Verde claro para estado Confirmado */
}

.estado-disponible {
  background-color: #c1e7c3; /* Verde claro para estado Confirmado */
}

.estado-en-curso {
  background-color: #cfeff9; /* Azul claro para estado En Curso */
}

.estado-concluido {
  background-color: #d6e2d5; /* Gris verdoso para estado Concluido */
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
