import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import initializeDataTable from "./DataTableConfig";
import { CategoriaPremios } from "./interfaces/categoria_premios";

function ListarCategoriaPremios() {
  const [categoriasPremios, setCategoriasPremios] = useState<CategoriaPremios[]>([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const url = API_BASE_URL + "/categoria_premios";
    authenticatedApi().get(url)
      .then((response) => {
        setCategoriasPremios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categoriasPremios.length > 0 && tableRef.current) {
      if (dataTableRef.current === null) {
        dataTableRef.current = initializeDataTable(tableRef.current);
      } else {
        dataTableRef.current = initializeDataTable(tableRef.current);
      }
    }
  }, [categoriasPremios]);

  return (
    <div>
      <ContentHeader title="Categorías de Premios" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-9">
                  <h3 className="card-title">Listado con Información de Categorías de Premios</h3>
                </div>
                <div className="col-lg-3 text-right">
                  <Link className="btn btn-info" to={`/CrearCategoria_premios`}>Crear Categoría</Link>
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
                    <th>Descripción</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasPremios.map((categoria, index) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nombre}</td>
                      <td>{categoria.descripcion}</td>
                      <td>
                        <Link className="icon-block" to={`/categoria_premios/${categoria.id}`}>
                          <i className="fa fa-fw fa-plus"></i> Ver más
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

export default ListarCategoriaPremios;
