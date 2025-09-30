import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Sucursal } from "./interfaces/sucursal";

function ListarSucursal() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/sucursal";

    authenticatedApi().get(url)
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (sucursales.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [sucursales]);

  return (
    <div>
      <ContentHeader title="Sucursales" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de las Sucursales</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to={`/sucursal/crear`}>Crear Sucursal</Link></div>
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
                    <th>Comercio</th>
                    <th>Sucursal</th>
                    <th>Dirección</th>
                    <th>Email</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {sucursales.map((sucursal, index) => (
                    <tr key={sucursal.id}>
                      <td>{sucursal.id}</td>
                  
                      <td>{sucursal.nombre_comercio}</td>
                      <td>{sucursal.sucursal}</td>
                      <td>{sucursal.direccion}</td>
                      <td>{sucursal.email}</td>
                      <td>
                        <Link className="icon-block" to={`/sucursal/${sucursal.id}`}>
                          <i className="fa fa-fw fa-plus"></i>Ver más
                        </Link>
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

export default ListarSucursal;
