import React, { useState, useEffect } from "react";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { Publicidad } from "./interfaces/publicidad";
import { toast } from 'react-toastify';

const VerPublicidad = () => {
    const [data, setData] = useState<Publicidad | null>(null);
    const { id } = useParams();
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `/publicidad/${id}`;
        authenticatedApi()
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });
    }, [id]);

    const handleEliminarPublicidad = () => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este publicidad?");
        if (confirmacion) {
            const api = authenticatedApi();
            api.delete(`/publicidad/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        // La eliminación fue exitosa
                        setDeleted(true);
                        toast.success("Publicidad eliminada con éxito!");
                        setTimeout(() => {
                            navigate("/publicidad");
                        }, 3000);
                    } else {
                        // Ocurrió un error en la eliminación
                        toast.error("Error al eliminar");
                        console.error("Error al eliminar");
                    }
                })
                .catch((error) => {
                    console.error("Error al eliminar:", error);
                });
        }
    };


    return (
        <div>
            <ContentHeader title="Detalles de la Publicidad" />
            <section className="content">
                <div className="container-fluid">
                    {data && (
                        <div className="card card-info card-outline">
                            <div className="card-header">
                                <h3 className="card-title">Datos de la Publicidad</h3>
                                <div className="card-tools">
                                    <Link
                                        className="btn bg-maroon"
                                        to="#"
                                        onClick={handleEliminarPublicidad}
                                    >
                                        Eliminar Publicidad
                                    </Link>
                                    <Link
                                        className="btn bg-teal"
                                        to={`/publicidad/editar/${data.id}`}
                                    >
                                        Editar Publicidad
                                    </Link>
                                    <Link to={`/publicidad`} className="btn btn-info">
                                        Volver a la Lista
                                    </Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Nombre del Comercio:</strong> {data.nombre_comercio}</p>
                                        <p><strong>Estado:</strong> {data.estado}</p>

                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-9">
                                        <img
                                            src={`${data.foto_enlace}`}
                                            alt="Foto de la publicidad"
                                            style={{ maxWidth: "100%" }}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VerPublicidad;
