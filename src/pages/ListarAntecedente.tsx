import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Antecedente } from "./interfaces/antecedente";

function ListarAntecedente() {
  const [antecedentes, setData] = useState<Antecedente[]>([]);
  const [loading, setLoading] = useState(true); // Variable de estado para indicar si los datos se están cargando
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = `/antecedente`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    if (antecedentes.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [antecedentes]);

  return (
    <div>
      <ContentHeader title="Antecedentes" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Antecedentes</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/antecedente/crear">
                    Crear Antecedente
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
                    <th>Antecedente</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {antecedentes.map((antecedente, index) => (
                    <tr key={antecedente.id}>
                      <td>{antecedente.id}</td>
                     
                      <td>{antecedente.antecedente}</td>
                      <td>
                        <Link
                          className="icon-block"
                          to={`/antecedente/${antecedente.id}`}
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

export default ListarAntecedente;
