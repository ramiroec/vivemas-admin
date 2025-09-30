import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "@components";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { PfImage } from "@profabric/react-components";
import styled from "styled-components";
import { Persona } from "./interfaces/persona";

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const VerPerfilNutri = () => {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  const authentication = useSelector((state: any) => state.auth.authentication);
  const [activeTab, setActiveTab] = useState("ACTIVITY");

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const url = `/nutricionista/${authentication.profile.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // setData({ ...data, consultorio: data.consultorio });
        console.log(data)
        setData(data);
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
                    <p className="text-muted text-center">
                      {authentication.profile.email}
                    </p>
                    <p className="text-info text-center">{data.empresa}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card card-info card-outline">
                  <div className="card-header p-2"></div>
                  <div className="card-body">
                    <div className="col-md-12">
                      <div className="card card-light">
                        <div className="card-header">
                          <h4 className="card-title">Datos Personales</h4>
                          <div className="card-tools">
                            <Link
                              className="btn bg-info"
                              to={`/perfilnutri/${data.id}`}
                            >
                              Editar Perfil
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <p>
                                <strong>Consultorio/s: </strong>
                                {data.consultorio_id}
                              </p>
                              <p>
                                <strong>Licencia Profesional:</strong>{" "}
                                {data.licencia_profesional_nro}
                              </p>
                              <p>
                                <strong>Titulo profesional:</strong>{" "}
                                {data.titulo_profesional}
                              </p>
                              <p>
                                <strong>Agenda cada: </strong>
                                {data.agenda_cada} minutos
                              </p>
                              <p>
                                <strong>Dias de entrega:</strong>{" "}
                                {data.dias_entrega} días
                              </p>
                              <p>
                                <strong>Tipo de mediciones:</strong>{" "}
                                {data.tipo_mediciones}
                              </p>
                              <p>
                                <strong>Pliegues cutáneos:</strong>{" "}
                                {data.pliegues_cutaneos}
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p>
                                <strong>Otros pliegues:</strong>{" "}
                                {data.otros_pliegues}
                              </p>
                              <p>
                                <strong>Circunferencias:</strong>{" "}
                                {data.circunferencias}
                              </p>
                              <p>
                                <strong>Calculos utilizados:</strong>{" "}
                                {data.calculos_utilizados}
                              </p>
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

export default VerPerfilNutri;
