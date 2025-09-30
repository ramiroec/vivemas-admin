import { useState } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CrearEmpresa = () => {
  const [data, setData] = useState({
    empresa: "",
    razon_social: "",
    direccion: "",
    telefono: "",
    email: "",
  });
  const navigate = useNavigate();
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
    const api = authenticatedApi();
    api
      .post("/empresa", updatedData)
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/empresa");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };
  return (
    <div>
      <ContentHeader title="Agregar Empresa" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información de la Empresa</h3>
              <div className="card-tools">
                <Link to="/empresa" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group col-md-6">
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control"
                    id="empresa"
                    placeholder="Nombre de la empresa"
                
                    value={data.empresa}
                    onChange={(e) =>
                      setData({ ...data, empresa: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="razon_social">Razón Social</label>
                  <input
                    type="text"
                    className="form-control"
                    id="razon_social"
                    placeholder="Nombre legal de la empresa"
                    required
                    value={data.razon_social}
                    onChange={(e) =>
                      setData({ ...data, razon_social: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    placeholder="Dirección de la empresa"
                    required
                    value={data.direccion}
                    onChange={(e) =>
                      setData({ ...data, direccion: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
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
                      placeholder="Número de teléfono de contacto"
                      required
                      value={data.telefono}
                      onChange={(e) =>
                        setData({ ...data, telefono: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
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
                      placeholder="Correo electrónico de la empresa"
                      required
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
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
export default CrearEmpresa;
