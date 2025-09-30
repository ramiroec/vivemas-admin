import React from 'react';
import { ContentHeader } from "@components";

function ManualWeb() {
    return (
        <div>
            <ContentHeader title="Manual" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            Te ofrecemos la posibilidad de acceder al manual completo en un formato fácil de utilizar y compartir, permitiéndote ver su contenido de manera conveniente en cualquier momento que lo desees.
                        </div>
                        <div>
                            <iframe src="Manual_de_usuario_WEB.pdf" width="100%" height="500px"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ManualWeb;
