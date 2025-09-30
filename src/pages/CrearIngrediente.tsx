import React, { useEffect, useState } from "react";
import axios from "axios";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
const CrearIngrediente = () => {
  const [data, setData] = useState({
    grupo_alimento: "",
    descripcion: "",
    peso: "",
    medida: 0,
    unidad_medida: "gramos",
    medida_practica: 0,
    um_practica: "",
    calorias: 0,
    hidrato: 0,
    proteina: 0,
    grasa: 0,
  });
  const [grupoAlimentoOptions, setGrupoAlimentoOptions] = useState([]);
  const [grupoUnidadMedidaOptions, setGrupoUnidadMedidaOptions] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const api = authenticatedApi();
    api.post("/ingrediente", data) 
      .then((res) => {
        console.log(res);
        toast.success("Guardado con éxito!");
        setTimeout(() => {
          navigate("/ingredientes");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al guardar el registro");
      });
  };

  useEffect(() => {  authenticatedApi()
    .get(`/grupo_alimento`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        const options = data.map((d: any) => ({
          "value" : d.id,
          "label" : d.grupo_alimento
        }))
        console.log(options)
        setGrupoAlimentoOptions(options)
      })
      .catch((err) => {
        console.log(err);
      });
      
      const res2 = axios.get("/unidad_medida")
      .then((res) => {
        console.log(res);
        const data = res.data;
        const options = data.map((d: any) => ({
          "value" : d.abreviatura,
          "label" : d.descripcion
        }))
        console.log(options)
        setGrupoUnidadMedidaOptions(options)
      })
  }, [])
  return (
    <div>
      <ContentHeader title="Agregar Ingrediente" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información del Ingrediente</h3>
              <div className="card-tools">
                <Link to="/aperitivos" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div>
                    <label>Grupo de alimentos:</label>
                    <Select
                        name="Grupo de alimentos"
                        placeholder="Grupo de alimentos"
                        options={grupoAlimentoOptions}
                        onChange={(e : any) =>{
                          e === null ? setData({ ...data, grupo_alimento: "" }) : setData({ ...data, grupo_alimento: e.label })
                        }
                        }

                        required
                    />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input
                        type="text"
                        name="descripcion"
                        className="form-control"
                        placeholder="Descripcion"
                        onChange={(e) =>
                        setData({ ...data, descripcion: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Peso/Cocción:</label>
                    <Select
                        name="Peso"
                        placeholder="Peso"
                        options={
                            [
                                { value: 'Peso neto', label: 'Peso neto' },
                                { value: 'Peso bruto', label: 'Peso bruto' },
                                { value: 'Peso crudo', label: 'Peso crudo' },
                                { value: 'Peso cocido', label: 'Peso cocido' },
                            ]
                        }
                        onChange={(e) =>{
                          e === null ? setData({ ...data, peso: "" }) : setData({ ...data, peso: e.value })
                        }
                        }

                        required
                    />
                </div>
                <div>
                    <label>Medida:</label>
                    <input
                        type="number"
                        name="medida"
                        className="form-control"
                        placeholder="Medida"
                        onChange={(e) =>
                        setData({ ...data, medida: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Unidad de medida:</label>
                    <Select
                        name="Unidad de medida"
                        isDisabled={true}
                        placeholder="Unidad de medida"
                        value={{ value: 'gramos', label: 'gramos' }}
                        options={
                            [
                                { value: 'gramos', label: 'gramos' },
                                { value: 'mililitros', label: 'mililitros' },
                            ]
                        }
                        onChange={(e) =>{
                          e === null ? setData({ ...data, unidad_medida: "" }) : setData({ ...data, unidad_medida: e.value })
                        }
                        }
                        required
                    />
                </div>
                <div>
                    <label>Medida practica:</label>
                    <input
                        type="number"
                        name="medida_practica"
                        className="form-control"
                        placeholder="Medida practica"
                        onChange={(e) =>
                        setData({ ...data, medida_practica: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <div>
                    <label>UM Practica:</label>
                    <Select
                        name="UM Practica"
                        placeholder="UM Practica"
                        options={ grupoUnidadMedidaOptions }
                        onChange={(e:any) =>{
                          e === null ? setData({ ...data, um_practica: "" }) : setData({ ...data, um_practica: e.value })
                        }
                        }

                        required
                    />
                </div>
                <div>
                    <label>Calorias (cal):</label>
                    <input
                        type="number"
                        name="calorias"
                        className="form-control"
                        placeholder="Calorias"
                        onChange={(e) =>
                        setData({ ...data, calorias: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Hidratos (gr.):</label>
                    <input
                        type="number"
                        name="hidrato"
                        className="form-control"
                        placeholder="Hidrato"
                        onChange={(e) =>
                        setData({ ...data, hidrato: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Proteínas (gr.):</label>
                    <input
                        type="number"
                        name="proteina"
                        className="form-control"
                        placeholder="Proteina"
                        onChange={(e) =>
                        setData({ ...data, proteina: Number(e.target.value) })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Grasa (gr.):</label>
                    <input
                        type="number"
                        name="grasa"
                        className="form-control"
                        placeholder="Grasa"
                        onChange={(e) =>
                        setData({ ...data, grasa: Number(e.target.value) })
                        }
                        required
                    />
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
export default CrearIngrediente;
