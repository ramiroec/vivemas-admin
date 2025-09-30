import { useState } from "react";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NumericFormat } from 'react-number-format';

const CrearActividadExtra = () => {
  const [data, setData] = useState({
    descripcion: "",
    fecha: "",
    puntos: "",
    costo: "",
    enlace: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      descripcion: e.target.descripcion.value,
      fecha: e.target.fecha.value,
      puntos: e.target.puntos.value,
      costo: e.target.costo.value.replace(/\./g, ''),
      enlace: e.target.enlace.value,
      stock: e.target.stock.value,
    };

    const api = authenticatedApi();
    api
      .post("/actividadextra", updatedData)
      .then((res) => {
        console.log(res);
        toast.success("Actividad Extra guardada con éxito!");
        setTimeout(() => {
          navigate("/actividadextra");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar la Actividad Extra");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Actividad Extra" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información de la Actividad Extra</h3>
              <div className="card-tools">
                <Link to="/actividadextra" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    placeholder="Descripción de la Actividad Extra"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fecha">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="puntos">Puntos</label>
                  <input
                    type="number"
                    className="form-control"
                    id="puntos"
                    placeholder="Puntos de la Actividad Extra"
                    required
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



                <div className="form-group col-md-6">
                  <label htmlFor="enlace">Enlace</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enlace"
                    placeholder="Enlace de la Actividad Extra"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    placeholder="Stock de la Actividad Extra"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-info">
                    Guardar
                  </button>
                </div>
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

export default CrearActividadExtra;
