import { useState, useEffect } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarCategoriaPremios = () => {
  const [data, setData] = useState({
    nombre: "",
    descripcion: "",
  });

  const { id } = useParams(); // Captura el ID de la categoría desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos de la categoría de premios existente
    authenticatedApi()
      .get(`/categoria_premios/${id}`)
      .then((res) => {
        setData(res.data); // Asigna los datos recibidos al estado
      })
      .catch((err) => {
        console.error("Error al obtener los datos de la categoría:", err);
        toast.error("Error al obtener los datos de la categoría");
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();

    // Depuración: Verifica los datos que se envían
    console.log("Datos enviados:", data);

    api.put(`/categoria_premios/${id}`, data) // Envía los datos actualizados a la API
      .then((res) => {
        console.log("Respuesta de la API:", res);
        toast.success("Categoría de premio actualizada con éxito!");
        navigate("/ListarCategoria_premios");  // Redirige inmediatamente a la página de categorías de premios
      })
      .catch((err) => {
        console.error("Error al actualizar la categoría de premio:", err);
        toast.error("Error al actualizar la categoría de premio");
      });
  };

  return (
    <div>
      <ContentHeader title="Editar Categoría de Premio" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Actualizar Información de la Categoría de Premio</h3>
              <div className="card-tools">
                <Link to="/categoria_premios" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre (hasta 100 caracteres)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Escribe el nombre aquí"
                    maxLength={100}
                    required
                    value={data.nombre}
                    onChange={(e) => setData({ ...data, nombre: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción (hasta 255 caracteres, opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="Escribe una descripción (opcional)"
                    maxLength={255}
                    value={data.descripcion}
                    onChange={(e) => setData({ ...data, descripcion: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-info">
                  Guardar Cambios
                </button>
              </form>
            </div>
            <div className="card-footer">
              <small>* El campo "Descripción" es opcional.</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditarCategoriaPremios;
