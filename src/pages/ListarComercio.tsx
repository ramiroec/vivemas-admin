import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Comercio } from "./interfaces/comercio";
import moment from 'moment';

function Listar_Comercio() {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = "/comercio";
    authenticatedApi().get(url)
      .then((response) => {
        setComercios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (comercios.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [comercios]);

  return (
    <div>
      <ContentHeader title="Comercios" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Comercios</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to={`/comercio/crear`}>Crear Comercio</Link></div>
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
                    <th>RUC</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Dirección</th>
                    <th>Fecha Registro</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {comercios.map((comercio, index) => (
                    <tr key={comercio.id}>
                      <td>{comercio.id}</td>
                     
                      <td>{comercio.ruc}</td>
                      <td>{comercio.nombre}</td>
                      <td>{comercio.descripcion}</td>
                      <td>{comercio.direccion.length > 80 ? comercio.direccion.substring(0, 80) + '...' : comercio.direccion}</td>
                      <td>{moment(comercio.fecha_registro).format('DD/MM/YYYY')}</td>
                      <td>
                        <Link className="icon-block" to={`/comercio/${comercio.id}`}><i className="fa fa-fw fa-plus"></i>Ver más</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Listar_Comercio;
