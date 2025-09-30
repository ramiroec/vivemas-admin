import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { Usuario } from "./interfaces/usuario";

function Listar_Usuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/usuario";

    authenticatedApi().get(url)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (usuarios.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [usuarios]);

  return (
    <div>
      <ContentHeader title="Usuarios" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-8">
                  <h3 className="card-title">Listado: Usuarios</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to={`/usuario/crear`}>Crear Usuario</Link></div>
              </div>
            </div>
            <div className="card-body">
              <table
                ref={tableRef}
                className="table table-bordered table-hover datatable nowrap"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Perfil</th>
                    <th>Ver más</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.celular}</td>
                      <td>{usuario.perfil}</td>
                      <td>
                        <Link to={`/usuario/${usuario.id}`}><b>+</b>Ver más</Link>
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
export default Listar_Usuario;
