import { useState } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NumericFormat } from 'react-number-format';

const CrearPlan = () => {
  const [data, setData] = useState({
    plan: "",
    descripcion: "",
    costo: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();
    api.post("/plan", data) // Cambia la URL de la API según tu configuración
      .then((res) => {
        console.log(res);
        toast.success("Plan guardado con éxito!");
        setTimeout(() => {
          navigate("/plan"); // Redirige a la página de planes después de guardar
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el plan");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Plan" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Plan</h3>
              <div className="card-tools">
                <Link to="/plan" className="btn btn-info">
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
                  <label htmlFor="descripcion">Descripción (hasta 200 caracteres, opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="Escribe una descripción (opcional)"
                    maxLength={200}
                    value={data.descripcion}
                    onChange={(e) => setData({ ...data, descripcion: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="costo">Costo del plan</label>
                  <NumericFormat
                    type="text"
                    className="form-control"
                    id="costo"
                    placeholder="Escribe el costo"
                    value={data.costo}
                    onValueChange={(values) => {
                      const { value } = values;
                      // Aquí puedes hacer lo que necesites con el valor
                      setData({ ...data, costo: value });
                    }}
                    thousandSeparator='.' // Puntos como separadores de miles
                    decimalSeparator="," // Coma como separador decimal
                    decimalScale={0} // Esto limitará la entrada a números enteros, si necesitas decimales, ajusta este valor
                    allowNegative={false} // Esto evitará números negativos
                  />
                </div>

                <button type="submit" className="btn btn-info">
                  Guardar
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

export default CrearPlan;
