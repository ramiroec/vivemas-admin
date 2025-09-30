import React, { useState, useEffect } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Comercio } from "./interfaces/comercio";
import { Empresa } from "./interfaces/empresa";
import 'react-toastify/dist/ReactToastify.css';

const CrearUsuario = () => {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    contrasena: "",
    perfil: "",
    empresa: "",
    comercio: "",
  });


  const [empresaOptions, setEmpresaOptions] = useState<Empresa[]>([]);
  useEffect(() => {
    const url = `/empresa`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setEmpresaOptions(response.data);
      })
  }, []);

  const [comercioOptions, setComercioOptions] = useState<Comercio[]>([]);
  useEffect(() => {
    const url = `/comercio`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setComercioOptions(response.data);
      })
  }, []);


  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedData = {
      ...data,

      contrasena: e.target.contrasena.value,
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      perfil: e.target.perfil.value,
      email: e.target.email.value,
      celular: e.target.celular.value,
      empresa: e.target.empresa.value,
      comercio: e.target.comercio.value,
    };
    const api = authenticatedApi();
    api
      .post("/usuario", updatedData)
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/usuario");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };
  return (
    <div>
      <ContentHeader title="Agregar Usuario" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Usuario</h3>
              <div className="card-tools">
                <Link to="/usuario" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-6">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre"
                    required
                    value={data.nombre}
                    onChange={(e) =>
                      setData({ ...data, nombre: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Apellido *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    placeholder="Apellido"
                    required
                    value={data.apellido}
                    onChange={(e) =>
                      setData({ ...data, apellido: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Contraseña *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contrasena"
                    placeholder="Contraseña"
                    required
                    value={data.contrasena}
                    onChange={(e) =>
                      setData({ ...data, contrasena: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Email *</label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Teléfono (WhatsApp) *</label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control"
                    id="celular"
                    placeholder="Teléfono"
                    required
                    value={data.celular}
                    onChange={(e) =>
                      setData({ ...data, celular: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Perfil *</label>
                  <select
                    className="form-control"
                    id="perfil"
                    value={data.perfil}
                    onChange={(e) => setData({ ...data, perfil: e.target.value })}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Comercio">Comercio</option>
                  </select>
                </div>


                <div className="form-group col-md-6">
                  <label>Empresa</label>
                  <select
                    className="form-control"
                    id="empresa"
                    value={data.empresa}
                    onChange={(e) =>
                      setData({ ...data, empresa: e.target.value })
                    }
                  >
                    <option value="">Seleccionar Empresa</option>
                    {empresaOptions.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.empresa}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label>Comercio</label>
                  <select
                    className="form-control"
                    id="comercio"
                    value={data.comercio}
                    onChange={(e) =>
                      setData({ ...data, comercio: e.target.value })
                    }
                  >
                    <option value="">Seleccionar Comercio</option>
                    {comercioOptions.map((comercio) => (
                      <option key={comercio.id} value={comercio.id}>
                        {comercio.nombre}
                      </option>
                    ))}
                  </select>
                </div>



                <button type="submit" className="btn btn-info">
                  Guardar
                </button>
              </form>
            </div>
            <div className="card-footer">
              <small>* Campos obligatorios: favor completar estos campos.</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CrearUsuario;