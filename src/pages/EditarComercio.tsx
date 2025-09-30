import { useState, useEffect } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ComercioData {
  ruc: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  email: string;
  contacto_nombre_apellido: string;
  contacto_celular: string;
  logo?: string;
}

const EditarComercio = () => {
  const [data, setData] = useState<ComercioData>({
    ruc: "",
    nombre: "",
    descripcion: "",
    direccion: "",
    email: "",
    contacto_nombre_apellido: "",
    contacto_celular: "",
  });
  
  const [logo, setLogo] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>(); // Obtener el ID del comercio desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del comercio existente
    authenticatedApi()
      .get(`/comercio/${id}`)
      .then((res) => {
        setData(res.data); // Poblamos los datos con la información del comercio
      })
      .catch((err) => {
        console.error("Error fetching comercio data:", err);
        toast.error("Error al cargar los datos del comercio");
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      ruc: e.currentTarget.ruc.value,
      nombre: e.currentTarget.nombre.value,
      descripcion: e.currentTarget.descripcion.value,
      direccion: e.currentTarget.direccion.value,
      email: e.currentTarget.email.value,
      contacto_nombre_apellido: e.currentTarget.contacto_nombre_apellido.value,
      contacto_celular: e.currentTarget.contacto_celular.value,
    };

    const formData = new FormData();
    if (logo) {
      formData.append("logo", logo);
    }
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key as keyof ComercioData]);
    });

    authenticatedApi()
      .put(`/comercio/${id}`, formData) // Usamos PUT para actualizar el comercio existente
      .then((res) => {
        console.log(res);
        toast.success("Comercio actualizado con éxito!");
        setTimeout(() => {
          navigate("/comercio");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el comercio");
      });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <div>
      <ContentHeader title="Editar Comercio" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Editar Información del Comercio</h3>
              <div className="card-tools">
                <Link to="/comercio" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="ruc">RUC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ruc"
                    placeholder="RUC del comercio"
                    value={data.ruc}
                    onChange={(e) => setData({ ...data, ruc: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="nombre">Nombre del Comercio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre del comercio"
                    value={data.nombre}
                    onChange={(e) => setData({ ...data, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    placeholder="Descripción del comercio"
                    value={data.descripcion}
                    onChange={(e) => setData({ ...data, descripcion: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    placeholder="Dirección del comercio"
                    value={data.direccion}
                    onChange={(e) => setData({ ...data, direccion: e.target.value })}
                    required
                  />
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
                      placeholder="Correo electrónico del comercio"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contacto_nombre_apellido">Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto_nombre_apellido"
                    placeholder="Nombre y apellido del contacto"
                    value={data.contacto_nombre_apellido}
                    onChange={(e) => setData({ ...data, contacto_nombre_apellido: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contacto_celular">Celular de Contacto</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-phone" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="contacto_celular"
                      placeholder="Número de celular del contacto"
                      value={data.contacto_celular}
                      onChange={(e) => setData({ ...data, contacto_celular: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="logo">Logo del Comercio</label>
                  <input
                    type="file"
                    className="form-control"
                    id="logo"
                    onChange={handleLogoChange}
                  />
                  {data.logo && (
                    <div className="mt-2">
                      <img src={data.logo} alt="Logo actual" style={{ width: "100px" }} />
                      <p>Logo actual</p>
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-info">
                    Actualizar
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

export default EditarComercio;
