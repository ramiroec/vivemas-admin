import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Consejo } from "./interfaces/consejo";

function Listar_Consejo() {
  const [consejos, setData] = useState<Consejo[]>([]);
  const [loading, setLoading] = useState(true); // Variable de estado para indicar si los datos se están cargando
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = `/consejo`;
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
    // Solo inicializar la tabla si no hay una instancia previa y si los datos no se están cargando
    if (tableRef.current && !dataTableRef.current && !loading) {
      // Guardar la instancia de DataTables en el ref
      dataTableRef.current = initializeDataTable(tableRef.current);
    }
  }, [consejos, loading]);

  return (
    <div>
      <ContentHeader title="Consejos" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Consejos</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to="/consejo/crear">
                    Crear Consejo
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
                      <th>Tipo</th>
                      <th>Consejo</th>
                      <th>Ver más</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consejos.map((consejo, index) => (
                      <tr key={consejo.id}>
                        <td>{consejo.id}</td>                       
                        <td>{consejo.tipo}</td>
                        <td>{consejo.consejo}</td>
                        <td>
                          <Link
                            className="icon-block"
                            to={`/consejo/${consejo.id}`}
                          >
                            <i className="fa fa-fw fa-plus"></i>Ver más
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

export default Listar_Consejo;