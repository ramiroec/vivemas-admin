import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Comercio {
    id: number;
    nombre: string;
}
const CrearPublicidad = () => {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState({
        comercio: "",
        estado: "Activo",
        foto: "",
    });
    const [comercioOptions, setComercioOptions] = useState<Comercio[]>([]);
    useEffect(() => {
        authenticatedApi()
            .get(`/comercio`)
            .then((response) => {
                setComercioOptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Comercios:", error);
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
            formData.append("foto", file); // Cambia "file" a "foto"
        }
        try {
            const api = authenticatedApi();
            const responseUpload = await api.post("/publicidad/upload", formData);

            // Obtener el nombre del archivo desde la respuesta de Cloudinary
            const { url, public_id } = responseUpload.data;

            // Actualizar newData con el enlace y el public_id
            const newData = { ...data, foto: url, publicid: public_id };

            await api.post("/publicidad", newData);
            toast.success("Publicidad subido con éxito!");
            setTimeout(() => {
                navigate("/publicidad");
            }, 3000);
        } catch (error) {
            console.error(error);
            toast.error("Error al crear el Publicidad");
        }
    }
    return (
        <div>
            <ContentHeader title="Agregar Publicidad" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Ingresar Información de las Publicidades</h3>
                            <div className="card-tools">
                                <Link to="/publicidad" className="btn btn-info">
                                    Volver a la Lista
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="comercio">Comercio</label>
                                        <select
                                            className="form-control"
                                            id="comercio"
                                            name="comercio"
                                            value={data.comercio}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Seleccionar Comercio</option>
                                            {comercioOptions.map((comercio) => (
                                                <option key={comercio.id} value={comercio.id}>
                                                    {comercio.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="estado">Estado</label>
                                        <select
                                            className="form-control"
                                            id="estado"
                                            value={data.estado}
                                            onChange={(e) => setData({ ...data, estado: e.target.value })}
                                        >
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="foto">Imagen</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="foto"
                                            accept="image/jpeg"
                                            required
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
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
export default CrearPublicidad;
