import { useState, useEffect } from "react";
import axios from "axios";
import { authenticatedApi, API_BASE_URL } from "./interfaces/api";
import { ContentHeader } from "@components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Commerce {
  id: number;
  nombre: string;
}

interface LocationPickerProps {
  onLocationSelect: (locationUrl: string) => void;
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const mapEvents = useMapEvents({
    click(e: any) {
      const { lat, lng } = e.latlng;
      onLocationSelect(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
    },
  });

  return null;
};

const CrearSucursal = () => {
  const [data, setData] = useState({
    comercio: "",
    sucursal: "",
    direccion: "",
    contacto_nombre_apellido: "",
    contacto_celular: "",
    email: "",
    ubicacion: "",
  });
  const [commerceOptions, setCommerceOptions] = useState<Commerce[]>([]);
  useEffect(() => {
    authenticatedApi()
      .get(`/comercio`)
      .then((response) => {
        setCommerceOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL +
        "/sucursal",
        data
      );
      console.log(response.data);
      toast.success("Sucursal creada con éxito!");
      setTimeout(() => {
        navigate("/sucursal");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la sucursal");
    }
  };

  const handleLocationSelect = (locationUrl: string) => {
    setData({ ...data, ubicacion: locationUrl });
  };
  return (
    <div>
      <ContentHeader title="Crear Sucursal" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">Ingresar Información de la Sucursal</h3>
              <div className="card-tools">
                <Link to="/sucursal" className="btn btn-info">
                  Volver a la Lista
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="comercio">Comercio</label>
                  <select
                    className="form-control"
                    id="comercio"
                    name="comercio"
                    value={data.comercio}
                    onChange={(e) => setData({ ...data, comercio: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar Comercio</option>
                    {commerceOptions.map((commerce) => (
                      <option key={commerce.id} value={commerce.id}>
                        {commerce.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="sucursal">Sucursal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sucursal"
                    name="sucursal"
                    placeholder="Nombre de la sucursal"
                    value={data.sucursal}
                    onChange={(e) => setData({ ...data, sucursal: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="direccion">Dirección</label>
                  <textarea
                    className="form-control"
                    id="direccion"
                    rows={2}
                    required
                    value={data.direccion}
                    onChange={(e) => setData({ ...data, direccion: e.target.value })}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="ubicacion">Ubicación</label>
                  <MapContainer center={[-25.2637, -57.5759]} zoom={13} style={{ height: '250px' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                  </MapContainer>
                  <input
                    type="text"
                    className="form-control"
                    id="ubicacion"
                    name="ubicacion"
                    placeholder="Haz clic en el mapa para seleccionar la ubicación"
                    value={data.ubicacion}
                    onChange={(e) => setData({ ...data, ubicacion: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="contacto_nombre_apellido">Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto_nombre_apellido"
                    name="contacto_nombre_apellido"
                    placeholder="Nombre y apellido del contacto"
                    value={data.contacto_nombre_apellido}
                    onChange={(e) => setData({ ...data, contacto_nombre_apellido: e.target.value })}
                    required
                    style={{ marginBottom: '32px' }} // Estilo en línea para margen inferior
                  />
                  <label htmlFor="contacto_celular">Celular de Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto_celular"
                    name="contacto_celular"
                    placeholder="Número de celular del contacto"
                    value={data.contacto_celular}
                    onChange={(e) => setData({ ...data, contacto_celular: e.target.value })}
                    required
                    style={{ marginBottom: '32px' }} // Estilo en línea para margen inferior
                  />
                  <label htmlFor="email">Email de Contacto</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico del contacto"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-info">
                    Crear Sucursal
                  </button>
                </div>
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

export default CrearSucursal;
