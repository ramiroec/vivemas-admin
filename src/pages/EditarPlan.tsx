import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarPlan = () => {
  const [data, setData] = useState({
    plan: "",
    costo: "",
    descripcion: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();

    useEffect(() => {  authenticatedApi()
      .get(`/plan/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al obtener los datos del plan");
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticatedApi().put(`/plan/${id}`, data)
      .then((res) => {
        console.log(res);
        toast.success("Actualizado con éxito!");
        setTimeout(() => {
          navigate("/plan");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el registro");
      });
  };
  return (
    <div>
      <ContentHeader title="Editar Plan" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Editar Información del Plan</h3>
              <div className="card-tools">
                <Link to={`/plan/${id}`} className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="plan">Plan (hasta 50 caracteres)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="plan"
                    placeholder="Escribe el plan aquí"
                    maxLength={50}
                    required
                    value={data.plan}
                    onChange={(e) => setData({ ...data, plan: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="costo">Costo</label>
                  <input
                    type="number"
                    className="form-control"
                    id="costo"
                    required
                    value={data.costo}
                    onChange={(e) => setData({ ...data, costo: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción (hasta 200 caracteres, opcional)</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    placeholder="Escribe una descripción (opcional)"
                    maxLength={200}
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
              <small>* Todos los campos son obligatorios excepto "Fecha de Fin" y "Descripción".</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditarPlan;
