import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { ActividadExtra } from "./interfaces/actividadextra";

function ListarActividadExtra() {
  const [actividadesExtras, setActividadesExtras] = useState<ActividadExtra[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/actividadextra";
    authenticatedApi().get(url)
      .then((response) => {
        setActividadesExtras(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (actividadesExtras.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [actividadesExtras]);

  return (
    <div>
      <ContentHeader title="Actividades Extras" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de Actividades Extras</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to={`/actividadextra/crear`}>Crear Actividad Extra</Link>
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
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Puntos</th>
                    <th>Costo</th>
                    <th>Enlace</th>
                    <th>Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {actividadesExtras.map((actividadExtra, index) => (
                    <tr key={actividadExtra.id}>
                      <td>{actividadExtra.id}</td>
                     
                      <td>{actividadExtra.descripcion}</td>

                      <td>
                        {
                          actividadExtra.fecha ?
                            new Date(actividadExtra.fecha).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                            : 'Fecha no disponible'
                        }
                      </td>
                      <td>{actividadExtra.puntos}</td>
                      <td>{actividadExtra.costo}</td>
                      <td>{actividadExtra.enlace}</td>
                      <td>{actividadExtra.stock}</td>
                      <td>
                        <Link className="icon-block" to={`/actividadextra/${actividadExtra.id}`}>
                          <i className="fa fa-fw fa-plus"></i> Ver más
                        </Link>
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

export default ListarActividadExtra;
