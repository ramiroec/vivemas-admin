import React, { useState, useEffect } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

interface Consultorio {
  id: number;
  nombre_consultorio: string;
}

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

interface AgendamientoData {
  fecha: string;
  hora_desde: string;
  hora_hasta: string;
  consultorio_id: number | null;
  paciente_id: number | null;
  estado: string;
  a_domicilio: string;
  atendido_por: number | null;
}

const CrearAgendamiento = () => {
  const [data, setData] = useState<AgendamientoData>({
    fecha: "",
    hora_desde: "",
    hora_hasta: "",
    consultorio_id: null,
    paciente_id: null,
    estado: "", 
    a_domicilio: "No",
    atendido_por: null,
  });

  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {  authenticatedApi()
    .get(`/consultorio`)
      .then((response) => {
        setConsultorios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      authenticatedApi().get("/persona") 
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      authenticatedApi().get("/persona") 
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const api = authenticatedApi();
    api
      .post("/agendamiento", data)
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/agendamiento");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Agregar Agendamiento" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Agendamiento</h3>
              <div className="card-tools">
                <Link to="/agendamiento" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group col-md-6">
                  <label htmlFor="fecha">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    required
                    value={data.fecha}
                    onChange={(e) => setData({ ...data, fecha: e.target.value })}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="hora_desde">Hora Desde</label>
                  <input
                    type="time"
                    className="form-control"
                    id="hora_desde"
                    required
                    value={data.hora_desde}
                    onChange={(e) => setData({ ...data, hora_desde: e.target.value })}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="hora_hasta">Hora Hasta</label>
                  <input
                    type="time"
                    className="form-control"
                    id="hora_hasta"
                    required
                    value={data.hora_hasta}
                    onChange={(e) => setData({ ...data, hora_hasta: e.target.value })}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="consultorio_id">Consultorio</label>
                  <select
                    className="form-control"
                    id="consultorio_id"
                    required
                    value={data.consultorio_id || ""}
                    onChange={(e) => setData({ ...data, consultorio_id: parseInt(e.target.value, 10) || null })}
                  >
                    <option value="" disabled>Seleccione un consultorio</option>
                    {consultorios.map((consultorio) => (
                      <option key={consultorio.id} value={consultorio.id}>
                        {consultorio.nombre_consultorio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="paciente_id">Paciente</label>
                  <select
                    className="form-control"
                    id="paciente_id"
                    required
                    value={data.paciente_id || ""}
                    onChange={(e) => setData({ ...data, paciente_id: parseInt(e.target.value, 10) || null })}
                  >
                    <option value="" disabled>Seleccione un paciente</option>
                    {pacientes.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {`${paciente.nombre} ${paciente.apellido}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="atendido_por">Atendido por</label>
                  <select
                    className="form-control"
                    id="atendido_por"
                    required
                    value={data.atendido_por || ""}
                    onChange={(e) => setData({ ...data, atendido_por: parseInt(e.target.value, 10) || null })}
                  >
                    <option value="" disabled>Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {`${usuario.nombre} ${usuario.apellido}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="a_domicilio">A domicilio</label>
                  <select
                    className="form-control"
                    id="a_domicilio"
                    required
                    value={data.a_domicilio}
                    onChange={(e) => setData({ ...data, a_domicilio: e.target.value })}
                  >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="estado">Estado</label>
                  <select
                    className="form-control"
                    id="estado"
                    required
                    value={data.estado}
                    onChange={(e) => setData({ ...data, estado: e.target.value })}
                  >
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="En Curso">En Curso</option>
                    <option value="Concluido">Concluido</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-info">
                  Guardar
                </button>
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

export default CrearAgendamiento;