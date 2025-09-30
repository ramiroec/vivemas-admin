import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Sucursal {
  id: number;
  sucursal: string;
  nombre_comercio: string;
}

interface CategoriaPremios {
  id: number;
  nombre: string;
}
interface TipoUsuario {
  id: number;
  descripcion: string;
}

const CrearPremio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState({
    sucursal: 0,
    categoria_id: 0, // Nuevo campo para la categoría
    premio: "",
    puntos: 0,
    stock: 0,
    precio: 0,
    foto: "",
    premio_observacion: "",
    tipo_usuario_id: 0, // Nueva propiedad
  });

  const [sucursalOptions, setSucursalOptions] = useState<Sucursal[]>([]);
  const [categoriaOptions, setCategoriaOptions] = useState<CategoriaPremios[]>([]); // Estado para las categorías
  const [TipoUsuarioOptions, setTipoUsuarioOptions] = useState<TipoUsuario[]>([]);

  useEffect(() => {
    // Obtener sucursales
    authenticatedApi()
      .get(`/sucursal`)
      .then((response) => {
        setSucursalOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sucursales:", error);
      });

    // Obtener categorías de premios
    authenticatedApi()
      .get(`/categoria_premios`)
      .then((response) => {
        setCategoriaOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categorias:", error);
      });
    
      // Obtener tipo de usuario
      authenticatedApi()
      .get(`/tipo_usuario`)
      .then((response) => {
        setTipoUsuarioOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tipos de usuarios:", error);
      });

    
  }, []);


  const navigate = useNavigate();

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("foto", file);
    }
    try {
      const api = authenticatedApi();
      const responseUpload = await api.post("/premio/upload", formData);
      const { url, public_id } = responseUpload.data;

      const newData = { ...data, foto: url, publicid: public_id };

      await api.post("/premio", newData);
      toast.success("Premio subido con éxito!");
      setTimeout(() => {
        navigate("/premio");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el Premio");
    }
  }

  return (
    <div>
      <ContentHeader title="Agregar Premio" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Premio</h3>
              <div className="card-tools">
                <Link to="/premio" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="sucursal">Comercio y Sucursal</label>
                    <select
                      className="form-control"
                      id="sucursal"
                      name="sucursal"
                      value={data.sucursal}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Sucursal</option>
                      {sucursalOptions.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                          {`${sucursal.nombre_comercio} - ${sucursal.sucursal}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoria_id">Categoría del Premio</label>
                    <select
                      className="form-control"
                      id="categoria_id"
                      name="categoria_id"
                      value={data.categoria_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Categoría</option>
                      {categoriaOptions.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="premio">Premio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="premio"
                      placeholder="Nombre del premio"
                      required
                      value={data.premio}
                      onChange={(e) =>
                        setData({ ...data, premio: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="puntos">Puntos Necesarios</label>
                    <input
                      type="number"
                      className="form-control"
                      id="puntos"
                      placeholder="Cantidad de puntos"
                      required
                      value={data.puntos || ''}
                      onChange={(e) =>
                        setData({ ...data, puntos: parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="premio_observacion">Observación</label>
                    <input
                      type="text"
                      className="form-control"
                      id="premio_observacion"
                      placeholder="Observación"
                      value={data.premio_observacion}
                      onChange={(e) =>
                        setData({ ...data, premio_observacion: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="tipo_usuario_id">Tipo de Usuario</label>
                    <select
                      className="form-control"
                      id="tipo_usuario_id"
                      name="tipo_usuario_id"
                      value={data.tipo_usuario_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Tipo de Usuario</option>
                      {TipoUsuarioOptions.map((tipo_usuario) => (
                        <option key={tipo_usuario.id} value={tipo_usuario.id}>
                          {tipo_usuario.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Cantidad en Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      placeholder="Cantidad en stock"
                      required
                      value={data.stock || ''}
                      onChange={(e) =>
                        setData({ ...data, stock: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="valor">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="valor"
                      placeholder="Precio del premio"
                      required
                      value={data.precio || ''}
                      onChange={(e) =>
                        setData({ ...data, precio: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="foto">Foto</label>
                    <input
                      type="file"
                      className="form-control"
                      id="foto"
                      accept="image/jpeg"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-md-12 text-left">
                    <button type="submit" className="btn btn-info">
                      Guardar
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
export default CrearPremio;
