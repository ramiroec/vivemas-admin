import { useState } from "react";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearConsejo = () => {
  const [data, setData] = useState({
    tipo: "salud ocupacional",
    consejo: "",
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();
    api
      .post("/consejo", data) 
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/consejo"); 
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Consejo" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Consejo</h3>
              <div className="card-tools">
              <Link to="/consejo" className="btn btn-info">
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
                    onChange={(e) =>
                      setData({ ...data, tipo: e.target.value })
                    }
                  >
                    <option value="Salud Ocupacional">Salud Ocupacional</option>
                    <option value="Nutrición">Nutrición</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="consejo">Consejo (hasta 70 caracteres)</label>
                  <textarea
                    className="form-control"
                    id="consejo"
                    placeholder="Escribe tu consejo aquí"
                    maxLength={70}
                    rows={4} // Aumenta el número de filas para un textarea más largo
                    required
                    value={data.consejo}
                    onChange={(e) =>
                      setData({ ...data, consejo: e.target.value })
                    }
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

export default CrearConsejo;
