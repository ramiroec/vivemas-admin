import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Ingrediente } from "./interfaces/ingrediente";

function ListarIngredientes() {
  const [ingrediente, setIngrediente] = useState<Ingrediente[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/ingrediente";
    authenticatedApi().get(url)
      .then((response) => {
        setIngrediente(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (ingrediente.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [ingrediente]);

  return (
    <div>
      <ContentHeader title="Aperitivos" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Ingredientes</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/ingredientes/crear">
                    Crear Ingrediente
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
                    <th>Grupo de alimentos</th>
                    <th>Descripcion</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {ingrediente.map((ingrediente, index) => (
                    <tr key={ingrediente.id}>
                      <td>{ingrediente.id}</td>
                    
                      <td> {ingrediente.grupo_alimento} </td>
                      <td> {ingrediente.descripcion} </td>

                      <td>
                        <Link
                          className="icon-block"
                          to={`/ingredientes/${ingrediente.id}`}
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

export default ListarIngredientes;