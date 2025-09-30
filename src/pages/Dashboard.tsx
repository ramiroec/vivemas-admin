import React, { useState, useEffect } from 'react';
import { authenticatedApi } from "./interfaces/api";
import { useSelector } from 'react-redux';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);
const Dashboard = () => {
  const authentication = useSelector((state: any) => state.auth.authentication); // Obtener perfil del usuario
  const perfil = authentication.profile.perfil;
  // Define tipos específicos para gráficos
  interface Dataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    tension?: number;
    borderWidth?: number;
  }

  interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  // Inicializa los estados con tipos correctos
  const [lineData, setLineData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [pieData, setPieData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [barData, setBarData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [comercioData, setComercioData] = useState({
    labels: [],
    datasets: [{
      label: 'Transacciones por Semana',
      data: [],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }],
  });
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [nuevosPacientes, setNuevosPacientes] = useState(0);
  const [totalComercios, setTotalComercios] = useState(0);
  const [nuevosComercios, setNuevosComercios] = useState(0);
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [{
      label: 'Pacientes Registrados por Mes',
      data: [],
      fill: false,
      borderColor: '#4bc0c0',
      tension: 0.1,
    }],
  });
  const [cityData, setCityData] = useState({
    labels: [],
    datasets: [{
      label: 'Usuarios por Ciudad',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });
  const [topComercioData, setTopComercioData] = useState({
    labels: [],
    datasets: [{
      label: 'Comercio Más Canjeado',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Rojo
        'rgba(54, 162, 235, 0.6)', // Azul
        'rgba(255, 206, 86, 0.6)', // Amarillo
        'rgba(75, 192, 192, 0.6)', // Verde
        'rgba(153, 102, 255, 0.6)', // Morado
        'rgba(255, 159, 64, 0.6)', // Naranja
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  });
  const [puntosData, setPuntosData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Puntos Generados',
        data: [],
        backgroundColor: 'rgba(128, 128, 128, 0.6)', // Gris
        borderColor: 'rgba(128, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Puntos Canjeados',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Celeste
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });
  const [totalPremios, setTotalPremios] = useState(0);
  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        if (perfil === 'Empresa') {
          // Datos ficticios para el gráfico de líneas
          const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          const canjesRealizados = [12, 19, 8, 15, 22, 30, 45, 50, 60, 55, 65, 70];

          setLineData({
            labels: meses,
            datasets: [
              {
                label: 'Canjes Realizados',
                data: canjesRealizados,
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
              },
            ],
          });

          // Datos ficticios para el gráfico de torta
          setPieData({
            labels: ['Premio A', 'Premio B', 'Premio C', 'Premio D'],
            datasets: [
              {
                label: 'Premios Más Canjeados',
                data: [40, 25, 20, 15],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              },
            ],
          });

          // Datos ficticios para el gráfico de barras
          const puntosCanjeados = [120, 190, 180, 200, 220, 300, 450, 500, 600, 550, 650, 700];

          setBarData({
            labels: meses,
            datasets: [
              {
                label: 'Puntos Canjeados',
                data: puntosCanjeados,
                backgroundColor: '#36A2EB',
              },
            ],
          });
        }
        if (perfil === 'Empresa') {
          setTotalPacientes(100);
          setNuevosPacientes(30);
          setTotalPremios(15);
        }
        if (perfil === 'Comercio') {
          const transaccionesResponse = await authenticatedApi().get('/comercio/transacciones/semana');
          setComercioData({
            labels: transaccionesResponse.data.map((item: { semana: string }) => item.semana),
            datasets: [{
              label: 'Transacciones por Semana',
              data: transaccionesResponse.data.map((item: { cantidad: number }) => item.cantidad),
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            }],
          });
        }
        if (perfil === 'Administrador') {
          const pacientesResponse = await authenticatedApi().get('/paciente/count');
          setTotalPacientes(pacientesResponse.data.count);
          const nuevosPacientesResponse = await authenticatedApi().get('/paciente/new/month');
          setNuevosPacientes(nuevosPacientesResponse.data.count);
          const comerciosResponse = await authenticatedApi().get('/comercio/count');
          setTotalComercios(comerciosResponse.data.count);
          const nuevosComerciosResponse = await authenticatedApi().get('/comercio/new/month');
          setNuevosComercios(nuevosComerciosResponse.data.count);
          // Obtener los datos de pacientes registrados por mes
          const monthlyResponse = await authenticatedApi().get('/paciente/count/monthly');
          const labels = monthlyResponse.data.map((item: { mes: string }) => item.mes.trim());
          const data = monthlyResponse.data.map((item: { cantidad: number }) => item.cantidad);
          setUserData({
            labels,
            datasets: [
              {
                label: 'Pacientes Registrados por Mes',
                data,
                fill: false,
                borderColor: '#4bc0c0',
                tension: 0.1,
              },
            ],
          });
          const cityResponse = await authenticatedApi().get('/paciente/count/by-city');
          const cityLabels = cityResponse.data.map((item: { ciudad: string }) => item.ciudad);
          const cityDataValues = cityResponse.data.map((item: { cantidad: number }) => item.cantidad);
          setCityData({
            labels: cityLabels,
            datasets: [
              {
                label: 'Usuarios por Ciudad',
                data: cityDataValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
          const topComercioResponse = await authenticatedApi().get('/canje/top-comercio');
          const topComercioLabels = topComercioResponse.data.map((item: { comercio: string }) => item.comercio);
          const topComercioDataValues = topComercioResponse.data.map((item: { cantidad: number }) => item.cantidad);
          setTopComercioData({
            labels: topComercioLabels,
            datasets: [
              {
                label: 'Comercio Más Canjeado',
                data: topComercioDataValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)', // Rojo
                  'rgba(54, 162, 235, 0.6)', // Azul
                  'rgba(255, 206, 86, 0.6)', // Amarillo
                  'rgba(75, 192, 192, 0.6)', // Verde
                  'rgba(153, 102, 255, 0.6)', // Morado
                  'rgba(255, 159, 64, 0.6)', // Naranja
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          });
          const puntosResponse = await authenticatedApi().get('/canje/puntos/mensual');
          const puntosLabels = puntosResponse.data.map((item: { mes: string }) => item.mes);
          const puntosGeneradosData = puntosResponse.data.map((item: { puntos_generados: number }) => item.puntos_generados);
          const puntosCanjeadosData = puntosResponse.data.map((item: { puntos_canjeados: number }) => item.puntos_canjeados);
          setPuntosData({
            labels: puntosLabels,
            datasets: [
              {
                label: 'Puntos Generados',
                data: puntosGeneradosData,
                backgroundColor: 'rgba(128, 128, 128, 0.6)', // Gris
                borderColor: 'rgba(128, 128, 128, 1)',
                borderWidth: 1,
              },
              {
                label: 'Puntos Canjeados',
                data: puntosCanjeadosData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Celeste
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de KPI: ", error);
      }
    };
    fetchKPIs();
  }, [perfil]);
  return (
    <div>
      <h1>Dashboard</h1>
      <section className="content">
        <div className="container-fluid">
          {perfil === 'Administrador' && (
            <>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{totalPacientes}</h3>
                      <p>Pacientes Totales</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-user-injured" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{nuevosPacientes}</h3>
                      <p>Nuevos Pacientes</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-user-plus" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{totalComercios}</h3>
                      <p>Comercios Totales</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-shopping-cart" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{nuevosComercios}</h3>
                      <p>Nuevos Comercios</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-store" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
            {/* Gráfico de Comercio Más Canjeado (cambiado a tipo torta) */}
            <div className="col-lg-6">
              <div className="card card-info card-outline">
                <div className="card-header">
                  <h3 className="card-title">Comercio Más Canjeado</h3>
                </div>
                <div className="card-body" style={{ height: '45vh' }}>
                  <Pie data={topComercioData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>

            {/* Gráfico de Puntos Generados y Canjeados */}
            <div className="col-lg-6">
              <div className="card card-info card-outline">
                <div className="card-header">
                  <h3 className="card-title">Puntos Generados y Canjeados</h3>
                </div>
                <div className="card-body">
                  <Bar data={puntosData} />
                </div>
              </div>
            </div>
          </div>

            </>
          )}
          {perfil === 'Comercio' && (
            <>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{comercioData.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0}</h3>
                      <p>Transacciones Totales</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-exchange-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {perfil === 'Empresa' && (
            <>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{totalPacientes}</h3>
                      <p>Pacientes Totales</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-user-injured" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{nuevosPacientes}</h3>
                      <p>Nuevos Pacientes</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-user-plus" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{totalPremios}</h3>
                      <p>Premios Totales</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-trophy" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Gráfico de Líneas */}
                <div className="col-lg-6">
                  <div className="card" style={{ height: "400px" }}>
                    <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
                      <h3 className="card-title">Canjes Realizados</h3>
                    </div>
                    <div className="card-body">
                      <Line data={lineData} />
                    </div>
                  </div>
                </div>

                {/* Gráfico de Torta */}
                <div className="col-lg-6">
                  <div className="card" style={{ height: "400px" }}>
                    <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
                      <h3 className="card-title">Premio Más Canjeado</h3>
                    </div>
                    <div className="card-body">
                      <Pie data={pieData} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Gráfico de Barras */}
                <div className="col-lg-6">
                  <div className="card" style={{ height: "400px" }}>
                    <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
                      <h3 className="card-title">Puntos Canjeados</h3>
                    </div>
                    <div className="card-body">
                      <Bar data={barData} />
                    </div>
                  </div>
                </div>
              </div>  
            </>
          )}
                    <div className="row">
            {/* Gráfico de Pacientes Registrados por Mes */}
            <div className="col-lg-6">
              <div className="card card-info card-outline">
                <div className="card-header">
                  <h3 className="card-title">Pacientes Registrados por Mes</h3>
                </div>
                <div className="card-body">
                  <Line data={userData} />
                </div>
              </div>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
};
export default Dashboard;