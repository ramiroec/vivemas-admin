import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { CategoriaPremios } from "./interfaces/categoria_premios";
import { toast } from 'react-toastify';

const VerCategoriaPremios = () => {
  const [data, setData] = useState<CategoriaPremios | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/categoria_premios/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la categoría de premios:", error);
        toast.error("Error al obtener los datos de la categoría de premios");
      });
  }, [id]);

  const handleEliminarCategoria = async () => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
      if (!confirmacion) return;

      const api = authenticatedApi();
      const response = await api.delete(`/categoria_premios/${id}`);
      if (response.status === 200) {
        toast.success("Categoría de premios eliminada con éxito!");
        navigate("/categoria_premios"); // Redirige a la lista de categorías
      } else {
        toast.error("Error al eliminar la categoría de premios");
      }
    } catch (error) {
      console.error("Error al eliminar la categoría de premios:", error);
      toast.error("Error al eliminar la categoría de premios");
    }
  };

  return (
    <div>
      <ContentHeader title="Detalles de la Categoría de Premio" />
      <section className="content">
        <div className="container-fluid">
          {data && (
            <div className="card card-info card-outline">
              <div className="card-header">
                <h3 className="card-title">Datos de la Categoría de Premio</h3>
                <div className="card-tools">
                  <button className="btn bg-maroon" onClick={handleEliminarCategoria}>
                    Eliminar Categoría
                  </button>
                  <Link to={`/categoria_premios/editar/${data.id}`} className="btn bg-teal">
                    Editar Categoría
                  </Link>
                  <Link to={`/ListarCategoria_premios`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Nombre:</strong> {data.nombre}</p>
                    <p><strong>Descripción:</strong> {data.descripcion}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VerCategoriaPremios;
