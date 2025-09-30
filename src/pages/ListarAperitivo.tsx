import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Aperitivo } from "./interfaces/aperitivo";

function ListarSuplementos() {
  const [aperitivo, setAperitivo] = useState<Aperitivo[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/aperitivos"; // Cambia la URL a la correcta para obtener consultorios
    authenticatedApi().get(url)
      .then((response) => {
        setAperitivo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (aperitivo.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [aperitivo]);

  return (
    <div>
      <ContentHeader title="Aperitivos" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Aperitivos</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/aperitivos/crear">
                    Crear Aperitivo
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
                    <th>Nombre</th>
                    <th>Tipo de comida</th>
                    <th>Descripcion</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {aperitivo.map((aperitivo, index) => (
                    <tr key={aperitivo.id}>
                      <td>{aperitivo.id}</td>
                  
                      <td>{aperitivo.nombre_comercial}</td>
                      <td> {aperitivo.tipo_comida} </td>
                      <td> {aperitivo.descripcion} </td>

                      <td>
                        <Link
                          className="icon-block"
                          to={`/aperitivos/${aperitivo.id}`}
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

export default ListarSuplementos;

