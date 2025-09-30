import { useState } from "react";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrearAperitivo = () => {
  const [data, setData] = useState({
    tipo_comida: "",
    descripcion: "",
    nombre_comercial: "",
    porcion: "",
    calorias_por_porcion: 0,
    imagen: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();
    api
      .post("/aperitivos", data) // Cambia la URL de la API según tu configuración
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/aperitivos"); // Redirige a la página de consultorios después de guardar
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Aperitivo" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Aperitivo</h3>
              <div className="card-tools">
                <Link to="/aperitivos" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <label>Tipo de Comida</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setData({ ...data, tipo_comida: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setData({ ...data, descripcion: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Nombre Comercial</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setData({ ...data, nombre_comercial: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Porción</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setData({ ...data, porcion: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Calorías por Porción</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setData({ ...data, calorias_por_porcion: Number(e.target.value) })}
                    />
                </div>
                <div className="form-group">
                    <label>Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setData({ ...data, imagen: e.target.value })}
                    />
                </div>

              <button type="submit" className="btn btn-info">
                  Guardar
                </button>
              </form>
            </div>
            <div className="card-footer">
              <small>* Todos los campos son obligatorios</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrearAperitivo;
