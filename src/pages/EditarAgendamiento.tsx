import { useState, useEffect } from "react";
import axios from "axios";
import { ContentHeader } from "@components";
import { useNavigate, useParams, Link } from "react-router-dom";
import api, { authenticatedApi } from "./interfaces/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const EditarAgendamiento = () => {
  const [data, setData] = useState({
    id: "",
    fecha: "",
    hora_desde: "",
    hora_hasta: "",
    consultorio_id: null as number | null,
    paciente_id: null as number | null,
    estado: "Reservado",
    a_domicilio: "",
    tipo_documento: "",
    numero_documento: "",
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    responsable_id: null as number | null,
    responsable_tipo_documento: "",
    responsable_numero_documento: "",
    responsable_nombre: "",
    responsable_apellido: "",
    responsable_email: "",
    responsable_celular: "",
    //datos_facturacion:
    consulta: "",
    adicional: "",
    observacion: "",
    monto_total: "",
    observacion_facturacion: "",
    forma_pago: "",
    estado_pago: "",
  });


  const updateMontoTotal = () => {
    setData((prevData) => {
      const costoConsulta = parseFloat(prevData.consulta) || 0;
      const costoAdicional = parseFloat(prevData.adicional) || 0;
      const montoTotal = costoConsulta + costoAdicional;
      return { ...prevData, monto_total: montoTotal.toString() };
    });
  };


  const [consultorios, setConsultorios] = useState<
    { id: number; nombre_consultorio: string }[]
  >([]);
  const [pacientes, setPacientes] = useState<
    { id: number; nombre: string; apellido: string }[]
  >([]);
  const [initialPacienteId, setInitialPacienteId] = useState<number | null>(
    null
  );
  const [responsables, setResponsables] = useState<
    { id: number; nombre: string; apellido: string }[]
  >([]);
  const [usuarios, setUsuarios] = useState<
    { id: number; nombre: string; apellido: string }[]
  >([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {  authenticatedApi()
    .get(`/agendamiento/${id}`)
      .then((res) => {
        setData(res.data);
        // Find the preselected patient ID in the agendamiento data
        const preselectedPacienteId = res.data.paciente_id;

        // Set the initial patient ID in the state
        setInitialPacienteId(preselectedPacienteId);
        console.log("Agendamiento Recuperado Data:", data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al obtener los datos del agendamiento");
      });
  }, [id]);

      useEffect(() => {
        const url = `/consultorio`;
        authenticatedApi()
            .get(url)
            .then((response) => {
              setConsultorios(response.data);
            })}, []); 

      useEffect(() => {
        const url = `/paciente`;
        authenticatedApi()
            .get(url)
            .then((response) => {
              setPacientes(response.data);
            })}, []); 
      
            useEffect(() => {
              const url = `/paciente`;
              authenticatedApi()
                  .get(url)
                  .then((response) => {
                    setResponsables(response.data);
                  })}, []); 
        

  useEffect(() => {
    // Fetch patient details when paciente_id changes
    if (data.paciente_id) {
      const url = `/persona/${data.paciente_id}`;
      authenticatedApi()
          .get(url)
        .then((res) => {
          const pacienteDetails = res.data;
          // Update patient details in the state
          setData((prevData) => ({
            ...prevData,
            tipo_documento: pacienteDetails.tipo_documento,
            numero_documento: pacienteDetails.numero_documento,
            nombre: pacienteDetails.nombre,
            apellido: pacienteDetails.apellido,
            email: pacienteDetails.email,
            celular: pacienteDetails.celular,
          }));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al obtener los datos del paciente");
        });
    }
  }, [data.paciente_id]);

  useEffect(() => {
    // Fetch responsible user details when responsable_id changes
    if (data.responsable_id) {
      api
        .get(`/persona/${data.responsable_id}`)
        .then((res) => {
          const responsableDetails = res.data;
          // Update responsible user details in the state
          setData((prevData) => ({
            ...prevData,
            responsable_tipo_documento: responsableDetails.tipo_documento,
            responsable_numero_documento: responsableDetails.numero_documento,
            responsable_nombre: responsableDetails.nombre,
            responsable_apellido: responsableDetails.apellido,
            responsable_email: responsableDetails.email,
            responsable_celular: responsableDetails.celular,
            estado: "Reservado",
          }));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al obtener los datos del responsable");
        });
    }
  }, [data.responsable_id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticatedApi().put(`/agendamiento/${id}`, data)
      .then((res) => {
        console.log(res);
        console.log("Agendamiento Insertado Data:", data);
        toast.success("Actualizado con éxito!");
        setTimeout(() => {
          //navigate("/agendamiento");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar el registro");
      });
  };

  return (
    <div>
      <ContentHeader title="Editar Agendamiento" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">
                Editar Información del Agendamiento
              </h3>
              <div className="card-tools">
                <Link to={`/agendamiento/${id}`} className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Agenda</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="id">Id</label>
                          <input
                            type="number"
                            className="form-control"
                            id="id"
                            required
                            readOnly
                            value={data.id}
                            onChange={(e) =>
                              setData({ ...data, id: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="consultorio_id">Consultorio</label>
                          <select
                            className="form-control"
                            id="consultorio_id"
                            required
                            value={
                              data.consultorio_id === null
                                ? ""
                                : String(data.consultorio_id)
                            }
                            onChange={(e) =>
                              setData({
                                ...data,
                                consultorio_id:
                                  e.target.value !== ""
                                    ? parseInt(e.target.value, 10)
                                    : null,
                              })
                            }
                          >
                            <option value="">Seleccionar consultorio</option>
                            {consultorios.map((consultorio) => (
                              <option
                                key={consultorio.id}
                                value={consultorio.id}
                              >
                                {consultorio.nombre_consultorio}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="a_domicilio">A domicilio</label>
                          <select
                            className="form-control"
                            id="a_domicilio"
                            required
                            value={data.a_domicilio}
                            onChange={(e) =>
                              setData({ ...data, a_domicilio: e.target.value })
                            }
                          >
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      {/* Segunda columna */}
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="fecha">Fecha</label>
                          <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            required
                            value={data.fecha}
                            onChange={(e) => {
                              const formattedDate = new Date(e.target.value)
                                .toISOString()
                                .split("T")[0];
                              setData({ ...data, fecha: formattedDate });
                            }}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="hora_desde">Hora Desde</label>
                          <input
                            type="time"
                            className="form-control"
                            id="hora_desde"
                            required
                            value={data.hora_desde}
                            readOnly
                            onChange={(e) =>
                              setData({ ...data, hora_desde: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="hora_hasta">Hora Hasta</label>
                          <input
                            type="time"
                            className="form-control"
                            id="hora_hasta"
                            required
                            value={data.hora_hasta}
                            readOnly
                            onChange={(e) =>
                              setData({ ...data, hora_hasta: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos del Paciente</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="paciente_id">
                            Seleccionar Paciente
                          </label>
                          <Select
                            onChange={(selectedOption) =>
                              setData({
                                ...data,
                                paciente_id: selectedOption
                                  ? selectedOption.value
                                  : null,
                              })
                            }
                            options={pacientes.map((paciente) => ({
                              label: `${paciente.nombre} ${paciente.apellido}`,
                              value: paciente.id,
                            }))}
                          />
                          <Link
                            to={`/paciente/crear`}
                            className="btn btn-info"
                            target="_blank"
                          >
                            + Crear Nuevo Paciente
                          </Link>
                        </div>
                        {/* Display patient details */}
                        <div className="form-group col-md-4">
                          <label>Tipo de Documento</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.tipo_documento}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Número de Documento</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.numero_documento}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.email}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Celular</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.celular}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="responsable_id">
                            Seleccionar Responsable
                          </label>
                          <Select
                            onChange={(selectedOption) =>
                              setData({
                                ...data,
                                responsable_id: selectedOption
                                  ? selectedOption.value
                                  : null,
                              })
                            }
                            options={responsables.map((responsable) => ({
                              label: `${responsable.nombre} ${responsable.apellido}`,
                              value: responsable.id,
                            }))}
                          />
                          <Link
                            to={`/persona/crear`}
                            className="btn btn-info"
                            target="_blank"
                          >
                            + Crear Nuevo Responsable
                          </Link>
                        </div>
                        {/* Display responsible user details */}
                        <div className="form-group col-md-4">
                          <label>Tipo de Documento del Responsable</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.responsable_tipo_documento}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Número de Documento del Responsable</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.responsable_numero_documento}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Email del Responsable</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.responsable_email}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Celular del Responsable</label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.responsable_celular}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label htmlFor="descripcion">
                            Observaciones del Paciente
                          </label>
                          <textarea
                            className="form-control"
                            id="descripcion"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card card-light">
                    <div className="card-header">
                      <h4 className="card-title">Datos de Facturación</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                     
                      <div className="form-group col-md-4">
  <label htmlFor="consulta">Costo de la Consulta</label>
  <input
    type="text"
    className="form-control"
    id="consulta"
    value={data.consulta}
    onChange={(e) => {
      setData({ ...data, consulta: e.target.value });
      updateMontoTotal();
    }}
  />
</div>

<div className="form-group col-md-4">
  <label htmlFor="adicional">Costo del Adicional</label>
  <input
    type="text"
    className="form-control"
    id="adicional"
    value={data.adicional}
    onChange={(e) => {
      setData({ ...data, adicional: e.target.value });
      updateMontoTotal();
    }}
/>
</div>
      <div className="form-group col-md-4">
        <label htmlFor="observacion">Observación de Adicional</label>
        <input
          type="text"
          className="form-control"
          id="observacion"
          value={data.observacion}
          onChange={(e) => setData({ ...data, observacion: e.target.value })}
        />
      </div>

                        <div className="col-md-12 mt-3 mb-3">
                          <hr />
                        </div>
                        <div className="form-group col-md-4">
  <label htmlFor="monto_total">Monto Total</label>
  <input
    type="text"
    className="form-control"
    id="monto_total"
    value={data.monto_total || "0"} 
    readOnly
  />
</div>






                        <div className="form-group col-md-4">
                          <label htmlFor="forma_pago">Forma de Pago</label>
                          <Select
                            options={[
                              {
                                value: "Tarjeta de Crédito",
                                label: "Tarjeta de Crédito",
                              },
                              {
                                value: "Tarjeta de Débito",
                                label: "Tarjeta de Débito",
                              },
                              {
                                value: "Transferencia Bancaria",
                                label: "Transferencia Bancaria",
                              },
                              { value: "Efectivo", label: "Efectivo" },
                            ]}
                            onChange={(selectedOption) =>
                              setData({
                                ...data,
                                forma_pago: selectedOption?.value || "", // Use optional chaining and provide a default value
                              })
                            }
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="estado_pago">Estado de Pago</label>
                          <Select
                            options={[
                              {
                                value: "Pendiente de Pago",
                                label: "Pendiente de Pago",
                              },
                              { value: "Pagado", label: "Pagado" },
                              { value: "Pago Parcial", label: "Pago Parcial" },
                              { value: "Vencido", label: "Vencido" },
                              { value: "Cancelado", label: "Cancelado" },
                              { value: "En Proceso", label: "En Proceso" },
                              { value: "Rechazado", label: "Rechazado" },
                            ]}
                            onChange={(selectedOption) =>
                              setData({
                                ...data,
                                estado_pago: selectedOption?.value || "",
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-info">
                  Guardar Cambios
                </button>
              </form>
            </div>
            <div className="card-footer">
              <small>
                * Campos obligatorios: Por favor, complete estos campos
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default EditarAgendamiento;
