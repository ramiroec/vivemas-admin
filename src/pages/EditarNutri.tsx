import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Consultorio } from "./interfaces/consultorio";

interface Nutricionista {
  consultorio: string[];
  licencia_profesional_nro: string;
  titulo_profesional: string;
  agenda_cada: string;
  dias_entrega: string;
  tipo_mediciones: string;
  pliegues_cutaneos: string[];
  otros_pliegues: string[];
  circunferencias: string[];
  calculos_utilizados: string[];
}

export default function EditarNutri() {
  const navigate = useNavigate();
  const authentication = useSelector((state: any) => state.auth.authentication);
  const [nutricionistaData, setNutricionistaData] = useState<Nutricionista>({
    consultorio: [],
    licencia_profesional_nro: "",
    titulo_profesional: "",
    agenda_cada: "",
    dias_entrega: "",
    tipo_mediciones: "",
    pliegues_cutaneos: [],
    otros_pliegues: [],
    circunferencias: [],
    calculos_utilizados: [],
  });
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);

  const { id } = useParams();

  const fetchNutricionistaData = async () => {
    if (id === "undefined") {
      return;
    }
    const url = `/nutricionista/${authentication.profile.id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Nutricionista Data:", data);
    setNutricionistaData({
      ...data,
      pliegues_cutaneos: JSON.parse(data.pliegues_cutaneos),
      otros_pliegues: JSON.parse(data.otros_pliegues),
      circunferencias: JSON.parse(data.circunferencias),
      calculos_utilizados: JSON.parse(data.calculos_utilizados),
    });
  };

  const fetchConsultorios = async () => {
    const url = `/consultorio`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Consultorios Data:", data);
    setConsultorios(data);
  };

  useEffect(() => {
    fetchNutricionistaData();
    fetchConsultorios();
  }, []);

  const updateNutricionista = () => {
    const formatNutricionistaData = {
      ...nutricionistaData,
      pliegues_cutaneos: JSON.stringify(nutricionistaData.pliegues_cutaneos),
      otros_pliegues: JSON.stringify(nutricionistaData.otros_pliegues),
      circunferencias: JSON.stringify(nutricionistaData.circunferencias),
      calculos_utilizados: JSON.stringify(
        nutricionistaData.calculos_utilizados
      ),
    };
    if (id === "undefined") {
      console.log(formatNutricionistaData, authentication.profile.id);
      axios
        .post("nutricionista/add", {
          ...formatNutricionistaData,
          usuario_id: authentication.profile.id,
        })
        .then((res) => {
          console.log(res);
          toast.success("Perfil creado con exito!");
          setTimeout(() => {
            navigate("/perfilNutri");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .put(
        `nutricionista/${id}`,
        formatNutricionistaData
      )
      .then((res) => {
        toast.success("Perfil actualizado con exito!");
        setTimeout(() => {
          navigate("/perfilNutri");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const consultoriosMap = consultorios.map((consultorio) => {
    return { value: consultorio.id, label: consultorio.nombre };
  });

  console.log(consultoriosMap);

  return (
    <div>
      <div className="card card-light">
        <div className="card-header">
          <h4 className="card-title">Datos de Nutricionista</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              {/* make a form with nutricionistaData fields */}
              <div className="form-group">
                <label htmlFor="consultorio">Consultorio</label>
                <Select
                  options={consultorios.map((consultorio) => ({
                    value: consultorio.nombre,
                    label: consultorio.nombre,
                  }))}
                  onChange={(e) => {
                    const consultorio = e.map(
                      (consultorio) => consultorio.value
                    );
                    setNutricionistaData({
                      ...nutricionistaData,
                      consultorio: consultorio,
                    });
                  }}
                  isMulti={true}
                  value={
                    Array.isArray(nutricionistaData.consultorio)
                      ? nutricionistaData.consultorio.map((value) => ({
                          value: value,
                          label: value,
                        }))
                      : []
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="licencia">Licencia</label>
                <input
                  type="text"
                  className="form-control"
                  id="licencia"
                  placeholder="Licencia"
                  required
                  value={nutricionistaData.licencia_profesional_nro}
                  onChange={(e) =>
                    setNutricionistaData({
                      ...nutricionistaData,
                      licencia_profesional_nro: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="tituloProfesional">Título Profesional</label>
                <select
                  className="form-control"
                  id="tituloProfesional"
                  required
                  value={nutricionistaData.titulo_profesional}
                  onChange={(e) =>
                    setNutricionistaData({
                      ...nutricionistaData,
                      titulo_profesional: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="Licenciado/a">Licenciado/a</option>
                  <option value="Doctor/a">Doctor/a</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="agendaCada">Agenda Cada</label>
                {/* make a select input con los siguientes campos: Cada 15 minutos, Cada 30 minutos, Cada 45 minutos, Cada 60 minutos, Cada 90 minutos, Cada 120 minutos */}
                <select
                  className="form-control"
                  id="agendaCada"
                  required
                  value={nutricionistaData.agenda_cada}
                  onChange={(e) =>
                    setNutricionistaData({
                      ...nutricionistaData,
                      agenda_cada: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="15">Cada 15 minutos</option>
                  <option value="30">Cada 30 minutos</option>
                  <option value="45">Cada 45 minutos</option>
                  <option value="60">Cada 60 minutos</option>
                  <option value="90">Cada 90 minutos</option>
                  <option value="120">Cada 120 minutos</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="diasEntregaResultado">
                  Días Entrega Resultado
                </label>
                {/* make a select input with field from 1 dia to 15 dias  */}
                <select
                  className="form-control"
                  id="diasEntregaResultado"
                  required
                  value={nutricionistaData.dias_entrega}
                  onChange={(e) =>
                    setNutricionistaData({
                      ...nutricionistaData,
                      dias_entrega: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="1">1 día</option>
                  <option value="2">2 días</option>
                  <option value="3">3 días</option>
                  <option value="4">4 días</option>
                  <option value="5">5 días</option>
                  <option value="6">6 días</option>
                  <option value="7">7 días</option>
                  <option value="8">8 días</option>
                  <option value="9">9 días</option>
                  <option value="10">10 días</option>
                  <option value="11">11 días</option>
                  <option value="12">12 días</option>
                  <option value="13">13 días</option>
                  <option value="14">14 días</option>
                  <option value="15">15 días</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tipoDeMediciones">Tipo de Mediciones</label>
                {/* make a select input with the following fields: Solo Basico, Con Antropometria */}
                <select
                  className="form-control"
                  id="tipoDeMediciones"
                  required
                  value={nutricionistaData.tipo_mediciones}
                  onChange={(e) =>
                    setNutricionistaData({
                      ...nutricionistaData,
                      tipo_mediciones: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="Basico">Solo Basico</option>
                  <option value="Antropometria">Con Antropometria</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {nutricionistaData.tipo_mediciones === "Antropometria" ? (
        // new form with antropometria data
        <div className="card card-light">
          <div className="card-header">
            <h4 className="card-title">Datos de Antropometria</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="pliegues_cutaneos">Pliegues Cutaneos</label>
                  <Select
                    /*value={nutricionistaData.pliegues_cutaneos.map((pliegue) => {
                        return {value: pliegue, label: pliegue}
                    })
                    }*/
                    onChange={(e) => {
                      const plieguesCutaneos = e.map(
                        (pliegue) => pliegue.value
                      );
                      setNutricionistaData({
                        ...nutricionistaData,
                        pliegues_cutaneos: plieguesCutaneos,
                      });
                    }}
                    isMulti={true}
                    options={[
                      { value: "Triceps", label: "Triceps" },
                      { value: "Subescapular", label: "Subescapular" },
                      { value: "Abdominal", label: "Abdominal" },
                      { value: "Muslo", label: "Muslo" },
                      { value: "Pantorrilla", label: "Pantorrilla" },
                    ]}
                  />
                </div>
                {/* otros pliegues */}
                <div className="form-group">
                  <label htmlFor="otro">Otros pliegues</label>
                  <Select
                    /*                    value={nutricionistaData.otros_pliegues.map((pliegue) => {
                        return {value: pliegue, label: pliegue}
                    })
                    }*/
                    onChange={(e) => {
                      const otrosPliegues = e.map((pliegue) => pliegue.value);
                      setNutricionistaData({
                        ...nutricionistaData,
                        otros_pliegues: otrosPliegues,
                      });
                    }}
                    isMulti={true}
                    options={[
                      { value: "Biceps", label: "Biceps" },
                      { value: "Cresta Iliaca", label: "Cresta Iliaca" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="circunferencias"> Circunferencias </label>
                  <Select
                    /*                    value={nutricionistaData.circunferencias.map((pliegue) => {
                        return {value: pliegue, label: pliegue}
                    })
                    }*/
                    onChange={(e) => {
                      const circunferencias = e.map((pliegue) => pliegue.value);
                      setNutricionistaData({
                        ...nutricionistaData,
                        circunferencias: circunferencias,
                      });
                    }}
                    isMulti={true}
                    options={[
                      { value: "Cintura", label: "Cintura" },
                      { value: "Cadera", label: "Cadera" },
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="calculosUtilizados">
                    Calculos utilizados
                  </label>
                  <Select
                    /*                    value={nutricionistaData.calculos_utilizados.map((pliegue) => {
                        return {value: pliegue, label: pliegue}
                    })
                    }*/
                    onChange={(e) => {
                      const calculosUtilizados = e.map(
                        (pliegue) => pliegue.value
                      );
                      setNutricionistaData({
                        ...nutricionistaData,
                        calculos_utilizados: calculosUtilizados,
                      });
                    }}
                    isMulti={true}
                    options={[
                      { value: "Masa Corporal", label: "Masa Corporal" },
                      { value: "Grasa DW", label: "Grasa DW" },
                      { value: "Grasa Yuhasz", label: "Grasa Yuhasz" },
                      { value: "Masa Grasa", label: "Masa Grasa" },
                      { value: "Masa magra", label: "Masa magra" },
                      { value: "Grasa reducidos", label: "Grasa reducidos" },
                      { value: "Peso reducido", label: "Peso reducido" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <button
          onClick={() => {
            updateNutricionista();
          }}
          className="btn btn-info"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
