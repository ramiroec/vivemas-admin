import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "../interfaces/api";
import { PfImage } from '@profabric/react-components';
import { Profesional } from "../interfaces/profesional";
import styled from 'styled-components';

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const ProfileProfesional = () => {
  const [data, setData] = useState<Profesional | null>(null);
  const navigate = useNavigate();

  const authentication = useSelector((state: any) => state.auth.authentication);
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const url = API_BASE_URL + `/profesional/${authentication.profile.id}`;
    authenticatedApi()
      .get(url)
      .then((response) => {
        setData(response.data);
      });
  }, []);
  
  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
        {data && (
          <div className="row">
            <div className="col-md-3">
              <div className="card card-info card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <StyledUserImage
                      width={100}
                      height={100}
                      rounded
                      src={
                        data.foto
                          ? `/img/default-profile.png`
                          : "/img/default-profile.png"
                      }
                      alt="User profile"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                  {data.nombre} {data.apellido}
                  </h3>
                  <p className="text-muted text-center">{authentication.profile.email}</p>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card card-info card-outline">
                <div className="card-header p-2">
                </div>
                <div className="card-body">
                <div className="col-md-12">
                    <div className="card card-light">
                      <div className="card-header">
                        <h4 className="card-title">Datos Profesionales</h4>      
                        <div className="card-tools">

                        <Link
                    className="btn bg-info"
                    to={`/profileprofesional/editar`}
                  >
                    Editar Perfil
                  </Link>   
                  </div>
             
                    </div>
                    <div className="card-body">
                        <div className="row">
                    <div className="col-md-6">
                      <p><strong>Consultorios:</strong> {data.consultorios}</p>
                      <p><strong>Licencia Profesional:</strong> {data.licencia_profesional_nro}</p>
                      <p><strong>Titulo profesional:</strong> {data.titulo_profesional}</p>
                      <p><strong>Agenda cada:</strong> {data.agenda_cada}</p>
                      <p><strong>Dias de entrega:</strong> {data.dias_entrega}</p>
                    </div>
                    <div className="col-md-6">
                            <p><strong>Tipo de mediciones:</strong> {data.tipo_mediciones}</p>
                            <p><strong>Pliegues cutáneos:</strong> {data.pliegues_cutaneos}</p>
                            <p><strong>Otros pliegues:</strong> {data.otros_pliegues}</p>
                            <p><strong>Circunferencias:</strong> {data.circunferencias}</p>
                            <p><strong>Calculos utilizados:</strong> {data.calculos_utilizados}</p>
                            </div>
                </div>
                    </div>

                  </div>
                </div>
                </div>
                </div>

              </div>
            </div>
                    )}

        </div>
      </section>
    </>
  );
};

export default ProfileProfesional;
