import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Empresa } from "./interfaces/empresa";

function Listar_Empresa() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/empresa";

    authenticatedApi().get(url)
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (empresas.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [empresas]);

  return (
    <div>
      <ContentHeader title="Empresas" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de las Empresas
                  </h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/empresa/crear">
                    Crear Empresa
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
                    <th>Empresa</th>
                    <th>Razón Social</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {empresas.map((empresa, index) => (
                    <tr key={empresa.id}>
                      <td>{empresa.id}</td>
                      <td>{empresa.empresa}</td>
                      <td>{empresa.razon_social}</td>
                      <td>{empresa.telefono}</td>
                      <td>{empresa.email}</td>
                      <td>
                        <Link
                          className="icon-block"
                          to={`/empresa/${empresa.id}`}
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
export default Listar_Empresa;
