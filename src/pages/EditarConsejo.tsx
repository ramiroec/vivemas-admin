import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarConsejo = () => {
  const [data, setData] = useState({
    tipo: "N/E",
    consejo: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {  authenticatedApi()
    .get(`/consejo/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al obtener los datos del consejo");
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticatedApi().put(`/consejo/${id}`, data)
      .then((res) => {
        console.log(res);
        toast.success("Actualizado con éxito!");
        setTimeout(() => {
          navigate("/consejo");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Editar Consejo" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Editar Información del Consejo</h3>
              <div className="card-tools">
              <Link to={`/consejo/${id}`}className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="form-group col-md-6">
                  <label htmlFor="tipo">Tipo de Consejo</label>
                  <select
                    className="form-control"
                    id="tipo"
                    required
                    value={data.tipo}
                    onChange={(e) => setData({ ...data, tipo: e.target.value })}
                  >
                    <option value="Salud Ocupacional">Salud Ocupacional</option>
                    <option value="Nutrición">Nutrición</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="consejo">Consejo (hasta 400 caracteres)</label>
                  <textarea
                    className="form-control"
                    id="consejo"
                    placeholder="Escribe tu consejo aquí"
                    rows={8} // Aumenta el número de filas para un textarea más largo
                    maxLength={400}
                    required
                    value={data.consejo}
                    onChange={(e) => setData({ ...data, consejo: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-info">
                  Guardar Cambios
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

export default EditarConsejo;
