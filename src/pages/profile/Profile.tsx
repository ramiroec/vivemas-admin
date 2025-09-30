import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "@components";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { authenticatedApi, API_BASE_URL } from "../interfaces/api";
import { PfImage } from "@profabric/react-components";
import { Persona } from "../interfaces/persona";
import styled from "styled-components";

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const Profile = () => {
  const [data, setData] = useState<Persona | null>(null);
  const navigate = useNavigate();

  const authentication = useSelector((state: any) => state.auth.authentication);
  const [activeTab, setActiveTab] = useState("ACTIVITY");
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const url = API_BASE_URL + `/usuario/${authentication.profile.id}`;
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
                              ? `https://cdn-icons-png.flaticon.com/512/6073/6073873.png`
                              : "https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
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
                              to={`/profile/editar`}
                            >
                              Editar Perfil
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <p>
                                <strong>Email:</strong> {data.email}
                              </p>
                              <p>
                                <strong>Celular:</strong> {data.celular}
                              </p>
                              <p>
                                <strong>Perfil:</strong> {data.perfil}
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p>
                                <strong>Comercio:</strong> {data.comercio_nombre}
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

export default Profile;
