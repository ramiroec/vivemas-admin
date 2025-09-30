import { useState } from "react";
import axios from "axios";
import { ContentHeader } from "@components";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ImportarPersona = () => {
    const [archivo, setArchivo] = useState(new Blob());
    const navigate = useNavigate();

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setArchivo(selectedFile);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("archivo_excel", archivo);

        axios
            .post("importar_excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                toast.success("Datos importados exitosamente.");
                setTimeout(() => {
                    navigate("/persona"); // Redirige a la página de consejos después de guardar
                }, 3000);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error al importar los datos desde el archivo Excel.");
            });
    };

    return (
        <div>
            <ContentHeader title="Crear Persona" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h3 className="card-title">
                                Importar Personas desde Archivo Excel
                            </h3>
                            <div className="card-tools">
                                <Link to="/persona" className="btn btn-info">
                                    Volver a la Lista
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <input type="file" accept=".xlsx" onChange={handleFileChange} />
                            <button onClick={handleUpload}>Importar</button>
                        </div>
                        <div className="card-footer">
                            Te ofrecemos la posibilidad de importar personas a partir de un archivo Excel.
                            <p><a href="../persona.xlsx" download="persona.xlsx">Descargar archivo con el formato de importación</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImportarPersona;



