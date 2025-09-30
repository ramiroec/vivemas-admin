import React from 'react';

const ContentHeader = ({title}: {title: string}) => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Sistema de Gestión
  <span style={{ color: '#2874A6' }}> Vive</span>
  <span style={{ color: '#1ABC9C' }}>Más</span>
            </h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="/">Inicio</a>
              </li>
              <li className="breadcrumb-item active">{title}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHeader;
