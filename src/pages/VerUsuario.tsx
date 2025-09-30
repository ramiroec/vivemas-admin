import { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi } from "./interfaces/api";
import { Usuario } from "./interfaces/usuario";
import { toast } from 'react-toastify';

const VerUsuario = () => {
  const [data, setData] = useState<Usuario | null>(null);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/usuario/${id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  const handleEliminar = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar?");
    if (confirmacion) {
      const api = authenticatedApi();
      api.delete(`/usuario/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // La eliminación fue exitosa
            setDeleted(true);
            toast.success("Eliminado con éxito!");
            setTimeout(() => {
              navigate("/usuario");
            }, 3000);
          } else {
            // Ocurrió un error en la eliminación
            toast.error("Error al eliminar");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          toast.error("Error al eliminar");
        });
    }
  };

  return (
    <div>
      <ContentHeader title="Usuario Details" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
          <div className="card-header">
                <h3 className="card-title">Usuario</h3>
            
                <div className="card-tools">
                  <Link
                    className="btn bg-maroon"
                    to="#"
                    onClick={handleEliminar}
                  >
                    Eliminar Usuario
                  </Link>
                  <Link
                    className="btn bg-teal"
                    to={`/usuario/editar/${data?.id}`}
                  >
                    Editar Usuario
                  </Link>
                  <Link to={`/usuario`} className="btn btn-info">
                    Volver a la Lista
                  </Link>
                </div>
              </div>
            <div className="card-body">
              <p><b>Nombre:</b> {data?.nombre}</p>
              <p><b>Apellido:</b> {data?.apellido}</p>
              <p><b>Email:</b> {data?.email}</p>
              <p><b>Celular:</b> {data?.celular}</p>
              <p><b>Perfil:</b> {data?.perfil}</p>
              <p><b>Empresa:</b> {data?.empresa_nombre}</p>
              <p><b>Comercio:</b> {data?.comercio_nombre}</p>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default VerUsuario;
