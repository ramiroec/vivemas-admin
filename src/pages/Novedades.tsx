import React from 'react'
import { ContentHeader } from "@components";
function Novedades() {
    return (
        <div>
            <ContentHeader title="Novedades" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            Este enlace te llevará al blog de Medcheck,
                            que está dirigido a comentar aspectos relacionados al asesoramiento integral en salud y bienestar ocupacional,
                            novedades para la profesión, aspectos científicos, y todo nuestro contenido para el bienestar de tu salud.
                            <div><a href="http://medcheck.com.py/blog/el-blog-de-medcheck-1" target="_blank" rel="noopener noreferrer">
                                Acceder al enlace</a>
                            </div>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Novedades