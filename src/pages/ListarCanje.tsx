import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { useSelector } from 'react-redux';
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Canje } from "./interfaces/canje";

function ListarCanje() {
  const [canjes, setData] = useState<Canje[]>([]);
  const [loading, setLoading] = useState(true); // Variable de estado para indicar si los datos se están cargando
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const authentication = useSelector((state: any) => state.auth.authentication);

  useEffect(() => {


    const url = authentication.profile.perfil === 'Administrador' 
    ? '/canje' 
    : `/canje/comercio/${authentication.profile.comercio}`;
  

    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Cambiar el estado de loading a false cuando se reciban los datos
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
  }, [canjes, loading]);

  return (
    <div>
      <ContentHeader title="Canjes" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de los Canjes</h3>
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
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Documento</th>
                      <th>Premio</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Comercio</th>
                      <th>Sucursal</th>
                      <th>Ver más</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canjes.map((canje, index) => (
                      <tr key={canje.id}>
                        <td>{canje.id}</td>


                        <td>{canje.nombre}</td>
                        <td>{canje.apellido}</td>
                        <td>{canje.numero_documento}</td>
                        <td>{canje.premio}</td>
                        <td>{canje.fecha}</td>
                        <td>{canje.estado}</td>
                        <td>{canje.comercio}</td>
                        <td>{canje.sucursal}</td>
                        <td>
                          <Link
                            className="icon-block"
                            to={`/canje/${canje.id}`}
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
export default ListarCanje;
