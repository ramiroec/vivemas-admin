import { useState, useEffect } from "react";
import { authenticatedApi } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Departamentos from "./interfaces/departamentos";
import Ciudades from "./interfaces/ciudades";
type Departamento = keyof typeof Ciudades;
type Ciudad = typeof Ciudades[Departamento][number];
interface TipoUsuario {
    id: number;
    descripcion: string;
}
interface Empresa {
    id: number;
    empresa: string;
}
const EditarPaciente = () => {
    const [data, setData] = useState({
        tipo_documento: "",
        tipo_usuario: 0,
        numero_documento: "",
        nombre: "",
        apellido: "",
        email: "",
        empresa: "",
        celular: "",
        contrasena: "",
        sexo: "",
        fecha_nacimiento: "",
        direccion: "",
        pais: "",
        departamento: "",
        ciudad: "",
        barrio: "",
        litros_agua_dia: "",
        kilogramos_peso: "",
        metros_altura: "",
        realiza_actividad_fisica: "",
        cantidad_veces_semana_act_fisica: "",
        horas_dia_actividad_fisica: "",
        horario_actividad_fisica: "",
        fuma: "",
        toma_alcohol: "",
        antecedentes_personales: [],
        antecedentes_familiares: [],
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [TipoUsuarioOptions, setTipoUsuarioOptions] = useState<TipoUsuario[]>([]);
    const [EmpresaOptions, setEmpresaOptions] = useState<Empresa[]>([]);
    const [antecedentesOptions, setAntecedentesOptions] = useState([]);
    const [selectedAntecedentesPersonales, setSelectedAntecedentesPersonales] =
        useState<{ value: string; label: string }[]>([]);
    const [selectedAntecedentesFamiliares, setSelectedAntecedentesFamiliares] =
        useState<{ value: string; label: string }[]>([]);
    useEffect(() => {
        authenticatedApi().get(`/antecedente`)
            .then((response) => {
                const antecedentesOptions = response.data.map(
                    (antecedente: { id: number; antecedente: string }) => ({
                        value: antecedente.antecedente,
                        label: antecedente.antecedente,
                    })
                );
                setAntecedentesOptions(antecedentesOptions);
            })
            .catch((error) => {
                console.error(error);
            });
        //Obtener tipo de usuario
        authenticatedApi()
            .get(`/tipo_usuario`)
            .then((response) => {
                setTipoUsuarioOptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tipos de usuarios:", error);
            });
        //Obtener Empresas
        authenticatedApi()
            .get(`/empresa`)
            .then((response) => {
                setEmpresaOptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching empresas:", error);
            });
    }, []);

    useEffect(() => {
        authenticatedApi()
            .get(`/paciente/${id}`)
            .then((res) => {
                const pacienteData = res.data;
                // Mapear los antecedentes personales y familiares a la estructura esperada por el Select
                const antecedentesPersonalesSeleccionados = pacienteData.antecedentes_personales.map((antecedente: any) => ({
                    value: antecedente,
                    label: antecedente
                }));
                const antecedentesFamiliaresSeleccionados = pacienteData.antecedentes_familiares.map((antecedente: any) => ({
                    value: antecedente,
                    label: antecedente
                }));
                // Actualizar los estados con los valores mapeados
                setSelectedAntecedentesPersonales(antecedentesPersonalesSeleccionados);
                setSelectedAntecedentesFamiliares(antecedentesFamiliaresSeleccionados);
                setData({ ...pacienteData, antecedentes_personales: antecedentesPersonalesSeleccionados, antecedentes_familiares: antecedentesFamiliaresSeleccionados });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const datosAEnviar = {
            ...data,
            antecedentes_personales: selectedAntecedentesPersonales.map(
                (antecedente) => antecedente.value
            ),
            antecedentes_familiares: selectedAntecedentesFamiliares.map(
                (antecedente) => antecedente.value
            ),
        };
        const api = authenticatedApi();
        api.put(`/paciente/${id}`, datosAEnviar)
            .then((res) => {
                console.log(res);
                toast.success("Guardado con éxito!");
                setTimeout(() => {
                    navigate(`/paciente/${id}`);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error al guardar el registro");
            });
    };
    const handleAntecedentesPersonalesChange = (selectedOptions: any) => {
        setSelectedAntecedentesPersonales(selectedOptions);
    };
    const handleAntecedentesFamiliaresChange = (selectedOptions: any) => {
        setSelectedAntecedentesFamiliares(selectedOptions);
    };
    return (
        <div>
            <ContentHeader title="Crear Paciente" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Ingresar Información del Paciente</h3>
                            <div className="card-tools">
                                <Link to="/paciente" className="btn btn-info">
                                    Volver a la Lista
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="nombre">Nombre *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Nombre de la persona"
                                        required autoFocus
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData({ ...data, nombre: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="apellido">Apellido *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        placeholder="Apellido de la persona"
                                        required
                                        value={data.apellido}
                                        onChange={(e) =>
                                            setData({ ...data, apellido: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="tipo_usuario_id">Tipo de Usuario *</label>
                                    <select
                                        className="form-control"
                                        id="tipo_usuario"
                                        name="tipo_usuario"
                                        value={data.tipo_usuario}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                tipo_usuario: Number(e.target.value),
                                            })
                                        } required
                                    >
                                        <option value="">Seleccionar Tipo de Usuario</option>
                                        {TipoUsuarioOptions.map((tipo_usuario) => (
                                            <option key={tipo_usuario.id} value={tipo_usuario.id}>
                                                {tipo_usuario.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="fecha_nacimiento">
                                        Fecha de Nacimiento *
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fecha_nacimiento"
                                        value={data.fecha_nacimiento}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                fecha_nacimiento: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="tipo_documento">
                                        Tipo de Documento *
                                    </label>
                                    <select
                                        className="form-control"
                                        id="tipo_documento"
                                        name="tipo_documento"
                                        required
                                        value={data.tipo_documento}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                tipo_documento: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            Seleccionar el tipo de Documento
                                        </option>
                                        <option value="CEDULA">
                                            Cédula de Identidad
                                        </option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="numero_documento">
                                        Número de Documento *
                                    </label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-id-card" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="numero_documento"
                                            name="numero_documento"
                                            placeholder="Número de Documento"
                                            required
                                            value={data.numero_documento}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    numero_documento: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="sexo">Sexo *</label>
                                    <select
                                        className="form-control"
                                        id="sexo"
                                        required
                                        value={data.sexo}
                                        onChange={(e) =>
                                            setData({ ...data, sexo: e.target.value })
                                        }
                                    >
                                        <option value="">Seleccionar sexo</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="email">Email *</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-envelope" />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            required
                                            value={data.email}
                                            onChange={(e) =>
                                                setData({ ...data, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="celular">Celular *</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-phone" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="celular"
                                            name="celular"
                                            placeholder="Número de celular"
                                            required
                                            value={data.celular}
                                            onChange={(e) =>
                                                setData({ ...data, celular: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="pais">Pais *</label>
                                    <select
                                        className="form-control"
                                        id="pais"
                                        required
                                        value={data.pais}
                                        onChange={(e) => setData({ ...data, pais: e.target.value })}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Alemania">Alemania</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Brasil">Brasil</option>
                                        <option value="Canadá">Canadá</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Corea del Sur">Corea del Sur</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="España">España</option>
                                        <option value="Estados Unidos">Estados Unidos</option>
                                        <option value="Francia">Francia</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Italia">Italia</option>
                                        <option value="Japón">Japón</option>
                                        <option value="México">México</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Perú">Perú</option>
                                        <option value="Polonia">Polonia</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Reino Unido">Reino Unido</option>
                                        <option value="Rusia">Rusia</option>
                                        <option value="Sudáfrica">Sudáfrica</option>
                                        <option value="Suiza">Suiza</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Venezuela">Venezuela</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="departamento">Departamento *</label>
                                    <select
                                        className="form-control"
                                        id="departamento"
                                        required
                                        value={data.departamento}
                                        onChange={(e) => {
                                            const selectedDepartamento = e.target
                                                .value as Departamento;
                                            const defaultCiudad =
                                                selectedDepartamento in Ciudades
                                                    ? Ciudades[
                                                    selectedDepartamento as Departamento
                                                    ][0]
                                                    : "";
                                            setData({
                                                ...data,
                                                departamento: selectedDepartamento,
                                                ciudad: defaultCiudad,
                                            });
                                        }}
                                    >
                                        <option value="">
                                            Seleccionar el Departamento
                                        </option>
                                        {Departamentos.map((departamento) => (
                                            <option key={departamento} value={departamento}>
                                                {departamento}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="ciudad">Ciudad *</label>
                                    <select
                                        className="form-control"
                                        id="ciudad"
                                        required
                                        value={data.ciudad || ""}
                                        onChange={(e) =>
                                            setData({ ...data, ciudad: e.target.value })
                                        }
                                    >
                                        <option value="">Seleccionar la Ciudad</option>
                                        {data.departamento in Ciudades
                                            ? Ciudades[
                                                data.departamento as Departamento
                                            ].map((ciudad: Ciudad) => (
                                                <option key={ciudad} value={ciudad}>
                                                    {ciudad}
                                                </option>
                                            ))
                                            : null}
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Barrio</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="barrio"
                                        placeholder="Barrio"
                                        value={data.barrio}
                                        onChange={(e) =>
                                            setData({ ...data, barrio: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="direccion">Dirección</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-map-marker-alt" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="direccion"
                                            placeholder="Dirección de la persona"
                                            value={data.direccion}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    direccion: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                    <label htmlFor="empresa">Empresa </label>
                    <select
                      className="form-control"
                      id="empresa"
                      name="empresa"
                      value={data.empresa}
                      onChange={(e) =>
                        setData({
                            ...data,
                            empresa: e.target.value,
                        })
                    } 
                    >
                      <option value="">Seleccionar Empresa</option>
                      {EmpresaOptions.map((empresa) => (
                        <option key={empresa.id} value={empresa.id}>
                          {empresa.empresa}
                        </option>
                      ))}
                    </select>
                  </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="realiza_actividad_fisica">
                                        Realiza Actividad Física
                                    </label>
                                    <select
                                        className="form-control"
                                        id="realiza_actividad_fisica"
                                        value={data.realiza_actividad_fisica}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                realiza_actividad_fisica: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Sí">Sí</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="cantidad_veces_semana_act_fisica">
                                        Veces por Semana
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="cantidad_veces_semana_act_fisica"
                                        placeholder="Número de veces por semana"
                                        value={
                                            data.cantidad_veces_semana_act_fisica || ""
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                cantidad_veces_semana_act_fisica: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="horas_dia_actividad_fisica">
                                        Horas al Día
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="horas_dia_actividad_fisica"
                                        placeholder="Horas de actividad física al día"
                                        value={data.horas_dia_actividad_fisica || ""}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                horas_dia_actividad_fisica: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="horario_actividad_fisica">
                                        Horario de Actividad Física
                                    </label>
                                    <select
                                        className="form-control"
                                        id="horario_actividad_fisica"
                                        value={data.horario_actividad_fisica}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                horario_actividad_fisica: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Seleccionar horario</option>
                                        <option value="5:00">5:00hs</option>
                                        <option value="6:00">6:00hs</option>
                                        <option value="7:00">7:00hs</option>
                                        <option value="8:00">8:00hs</option>
                                        <option value="9:00">9:00hs</option>
                                        <option value="10:00">10:00hs</option>
                                        <option value="11:00">11:00hs</option>
                                        <option value="12:00">12:00hs</option>
                                        <option value="13:00">13:00hs</option>
                                        <option value="14:00">14:00hs</option>
                                        <option value="15:00">15:00hs</option>
                                        <option value="16:00">16:00hs</option>
                                        <option value="17:00">17:00hs</option>
                                        <option value="18:00">18:00hs</option>
                                        <option value="19:00">19:00hs</option>
                                        <option value="20:00">20:00hs</option>
                                        <option value="21:00">21:00hs</option>
                                        <option value="22:00">22:00hs</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="kilogramos_peso">
                                        Kilogramos de Peso
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="kilogramos_peso"
                                        placeholder="Peso en kilogramos"
                                        value={data.kilogramos_peso || ""}
                                        min={30}
                                        max={300}
                                        step="0.01"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                kilogramos_peso: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="metros_altura">
                                        Altura en Centímetros
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="metros_altura"
                                        placeholder="Altura en centímetros"
                                        value={data.metros_altura || ""}
                                        min={50}
                                        max={300}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                metros_altura: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="litros_agua_dia">
                                        Litros de Agua por Día
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="litros_agua_dia"
                                        placeholder="Litros de agua consumidos por día"
                                        value={data.litros_agua_dia || ""}
                                        min={0}
                                        max={10}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                litros_agua_dia: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="fuma">Fuma</label>
                                    <select
                                        className="form-control"
                                        id="fuma"
                                        value={data.fuma}
                                        onChange={(e) =>
                                            setData({ ...data, fuma: e.target.value })
                                        }
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Sí">Sí</option>
                                        <option value="No">No</option>
                                        <option value="SOCIALMENTE">Socialmente</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="toma_alcohol">Toma Alcohol</label>
                                    <select
                                        className="form-control"
                                        id="toma_alcohol"
                                        value={data.toma_alcohol}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                toma_alcohol: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Sí">Sí</option>
                                        <option value="No">No</option>
                                        <option value="SOCIALMENTE">Socialmente</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="antecedentes_personales">
                                        Antecedentes Personales
                                    </label>
                                    <Select
                                        id="antecedentes_personales"
                                        name="antecedentes_personales"
                                        placeholder="Seleccionar antededentes personales"
                                        options={antecedentesOptions}
                                        isMulti
                                        value={selectedAntecedentesPersonales}
                                        onChange={handleAntecedentesPersonalesChange}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="antecedentes_familiares">
                                        Antecedentes Familiares
                                    </label>
                                    <Select
                                        id="antecedentes_familiares"
                                        name="antecedentes_familiares"
                                        placeholder="Seleccionar antededentes familiares"
                                        options={antecedentesOptions}
                                        isMulti
                                        value={selectedAntecedentesFamiliares}
                                        onChange={handleAntecedentesFamiliaresChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-info">
                                    Guardar
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <small>* Campos obligatorios: favor completar estos campos.</small>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
};
export default EditarPaciente;
