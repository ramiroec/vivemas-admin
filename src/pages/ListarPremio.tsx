import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { useSelector } from 'react-redux';
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Premio } from "./interfaces/premio";

function ListarPremio() {
  const [premios, setPremios] = useState<Premio[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const authentication = useSelector((state: any) => state.auth.authentication);

  useEffect(() => {
    //    const url = `/premiousuario/${authentication.profile.id}`;
    const url = `/premio/todos`;
    authenticatedApi().get(url)
      .then((response) => {
        setPremios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (premios.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [premios]);

  return (
    <div>
      <ContentHeader title="Premios" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Premios</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/premio/crear">
                    Crear Premio
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
                    <th>ID</th>
                    <th>Comercio</th>
                    <th>Sucursal</th>
                    <th>Premio</th>
                    <th>Puntos</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Tipo Usuario</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {premios.map((premio) => (
                    <tr key={premio.id}>
                      <td>{premio.id}</td>
                      <td>{premio.nombre_comercio}</td>
                      <td>{premio.sucursal}</td>
                      <td>{premio.premio}</td>
                      <td>{premio.puntos}</td>
                      <td>{premio.stock}</td>
                      <td>{premio.precio}</td>
                      <td>{premio.tipo_usuario_descripcion}</td>
                      <td>
                        <Link
                          className="icon-block"
                          to={`/premio/${premio.id}`}
                        >
                          <i className="fa fa-fw fa-plus"></i>Ver más
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
export default ListarPremio;