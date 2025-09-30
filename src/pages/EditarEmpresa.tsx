import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditarEmpresa = () => {
  const [data, setData] = useState({
    empresa: "",
    razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {  authenticatedApi()
    .get(`/empresa/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al obtener los datos de la empresa"); // Mostrar un mensaje de error con React-Toastify
      });
  }, [id]);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      empresa: e.target.empresa.value,
      razon_social: e.target.razon_social.value,
      direccion: e.target.direccion.value,
      telefono: e.target.telefono.value,
      email: e.target.email.value,
    };
    authenticatedApi().put(`/empresa/${id}`, updatedData)
      .then((res) => {
        console.log(res);
        toast.success("Actualizado con éxito!"); // Mostrar un mensaje de éxito con React-Toastify
        setTimeout(() => {
          navigate("/empresa");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el registro"); // Mostrar un mensaje de error con React-Toastify
      });
  };
  return (
    <div>
      <ContentHeader title="Editar Empresa" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Editar Información de la Empresa</h3>
              <div className="card-tools">
              <Link to={`/empresa/${id}`}className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="empresa">Nombre de la Empresa</label>
                      <input
                        type="text"
                        autoFocus
                        className="form-control"
                        id="empresa"
                        required
                        value={data.empresa}
                        onChange={(e) =>
                          setData({ ...data, empresa: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="razon_social">Razón Social</label>
                      <input
                        type="text"
                        className="form-control"
                        id="razon_social"
                        required
                        value={data.razon_social}
                        onChange={(e) =>
                          setData({ ...data, razon_social: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="direccion">Dirección</label>
                      <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        required
                        value={data.direccion}
                        onChange={(e) =>
                          setData({ ...data, direccion: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-phone" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="telefono"
                          required
                          value={data.telefono}
                          onChange={(e) =>
                            setData({ ...data, telefono: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-envelope" />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-info">
                      Guardar Cambios
                    </button>
                  </div>
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
export default EditarEmpresa;
