// Librerías y componentes de React
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Módulos y páginas
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import ForgetPasswordWeb from '@modules/forgot-password/ForgotPasswordWeb';
import RemoveAccount from '@modules/forgot-password/RemoveAccount';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import RecoverPasswordWeb from '@modules/recover-password/RecoverPasswordWeb';

// Hooks y utilidades
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '@app/store/reducers/ui';

// Páginas principales
import Dashboard from '@pages/Dashboard';
import Politica from '@pages/Politica';
import Terminos from '@pages/Terminos';
import ManualWeb from '@app/pages/ManualWeb';
import ManualApp from '@app/pages/ManualApp';
import Novedades from '@pages/Novedades';

// Páginas de Paciente
import ListarPaciente from '@pages/ListarPaciente';
import VerPaciente from '@pages/VerPaciente';
import CrearPaciente from '@app/pages/CrearPaciente';
import EditarPaciente from '@app/pages/EditarPaciente';

// Páginas de Publicidad
import ListarPublicidad from '@pages/ListarPublicidad';
import CrearPublicidad from './pages/CrearPublicidad';
import VerPublicidad from './pages/VerPublicidad';
import EditarPublicidad  from './pages/EditarPublicidad';



// Páginas de Usuario
import ListarUsuario from '@pages/ListarUsuario';
import VerUsuario from '@pages/VerUsuario';
import CrearUsuario from '@app/pages/CrearUsuario';
import EditarUsuario from '@app/pages/EditarUsuario';

// Páginas de Actividad 
import CrearActividadExtra from '@app/pages/CrearActividadExtra';
import EditarActividadExtra from '@app/pages/EditarActividadExtra';
import ListarActividadExtra from '@pages/ListarActividadExtra';
import VerActividadExtra from '@pages/VerActividadExtra';
import ListarActividad from '@app/pages/ListarActividad';

// Páginas de Antecedente
import CrearAntecedente from '@app/pages/CrearAntecedente';
import EditarAntecedente from '@app/pages/EditarAntecedente';
import ListarAntecedente from '@pages/ListarAntecedente';
import VerAntecedente from '@pages/VerAntecedente';

// Páginas de Agendamiento
import CrearAgendamiento from '@pages/CrearAgendamiento';
import EditarAgendamiento from '@app/pages/EditarAgendamiento';
import ListarAgendamiento from '@pages/ListarAgendamiento';
import VerAgendamiento from '@pages/VerAgendamiento';
import HistorialAgendamiento from '@pages/HistorialAgendamiento';

// Páginas de Canje
import ListarCanje from '@app/pages/ListarCanje';
import VerCanje from '@app/pages/VerCanje';

// Páginas de Comercio
import CrearComercio from '@app/pages/CrearComercio';
import EditarComercio from '@app/pages/EditarComercio';
import ListarComercio from '@pages/ListarComercio';
import VerComercio from '@pages/VerComercio';

// Páginas de Consejo
import CrearConsejo from '@pages/CrearConsejo';
import ListarConsejo from '@pages/ListarConsejo';
import EditarConsejo from '@pages/EditarConsejo';
import VerConsejo from '@pages/VerConsejo';

// Páginas de Premio
import ListarPremio from '@pages/ListarPremio';
import CrearPremio from '@app/pages/CrearPremio';
import EditarPremio from '@app/pages/EditarPremio';
import VerPremio from '@pages/VerPremio';
import ListarCategoria_premios from '@pages/ListarCategoria_premios';
import CrearCategoria_premios from '@pages/CrearCategoria_premios';
import VerCategoriaPremios from '@pages/VerCategoriaPremios';
import EditarCategoriaPremios from '@pages/EditarCategoriaPremios';




// Páginas de Plan
import ListarPlan from '@pages/ListarPlan';
import CrearPlan from '@app/pages/CrearPlan';
import EditarPlan from '@app/pages/EditarPlan';
import VerPlan from '@pages/VerPlan';

// Páginas de Sucursal
import CrearSucursal from '@app/pages/CrearSucursal';
import EditarSucursal from '@app/pages/EditarSucursal';
import ListarSucursal from '@pages/ListarSucursal';
import VerSucursal from '@pages/VerSucursal';

// Páginas de Empresa
import CrearEmpresa from '@app/pages/CrearEmpresa';
import EditarEmpresa from '@app/pages/EditarEmpresa';
import ListarEmpresa from '@pages/ListarEmpresa';
import VerEmpresa from '@pages/VerEmpresa';

// Páginas de Perfil y Nutricionista
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
import ProfileProfesional from '@pages/profile/ProfileProfesional';
import EditarProfile from '@pages/profile/EditarProfile';
import EditarProfileProfesional from '@pages/profile/EditarProfileProfesional';

import VerPerfilNutri from './pages/VerPerfilNutri';
import EditarNutri from './pages/EditarNutri';

// Páginas de Suplementos
import CrearSuplemento from './pages/CrearSuplementos';
import EditarSuplemento from './pages/EditarSuplementos';

// Páginas de Aperitivo
import ListarAperitivo from './pages/ListarAperitivo';
import VerAperitivo from './pages/VerAperitivo';
import CrearAperitivo from './pages/CrearAperitivo';
import EditarAperitivo from './pages/EditarAperitivo';

// Paginas de Ingredientes
import ListarIngredientes from './pages/ListarIngredientes';
import CrearIngrediente from './pages/CrearIngrediente';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { setAuthentication } from './store/reducers/auth';
import {
  GoogleProvider,
  getAuthStatus,
} from './utils/oidc-providers';


const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log('error', error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  if (isAppLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/recover-password/:token" element={<PublicRoute />}>
          <Route path="/recover-password/:token" element={<RecoverPassword />} />
        </Route>
        <Route path="/recover-password-web/:token" element={<PublicRoute />}>
          <Route path="/recover-password-web/:token" element={<RecoverPasswordWeb />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/forgot-password-web" element={<PublicRoute />}>
          <Route path="/forgot-password-web" element={<ForgetPasswordWeb />} />
        </Route>

        <Route path="/remove-account" element={<PublicRoute />}>
          <Route path="/remove-account" element={<RemoveAccount />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Dashboard />} />   
            <Route path="/politica" element={<Politica />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/manualweb" element={<ManualWeb />} />
            <Route path="/manualapp" element={<ManualApp />} />
            <Route path="/novedades" element={<Novedades />} />

            <Route path="/paciente" element={<ListarPaciente />} />
            <Route path="/paciente/crear" element={<CrearPaciente />} />
            <Route path="/paciente/:id" element={<VerPaciente />} />
            <Route path="/paciente/editar/:id" element={<EditarPaciente />} />

        {/*
         <Route path="/usuario/importar" element={<ImportarUsuario />} />
  */}  
         <Route path="/usuario" element={<ListarUsuario />} />
            <Route path="/usuario/crear" element={<CrearUsuario />} />
            <Route path="/usuario/:id" element={<VerUsuario />} />
            <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
  
            <Route path="/actividadextra" element={<ListarActividadExtra />} />
            <Route path="/actividadextra/crear" element={<CrearActividadExtra />} />
            <Route path="/actividadextra/:id" element={<VerActividadExtra />} />
            <Route path="/actividadextra/editar/:id" element={<EditarActividadExtra />} />
            <Route path="/actividad/:id" element={<ListarActividad />} />

            <Route path="/antecedente" element={<ListarAntecedente />} />
            <Route path="/antecedente/crear" element={<CrearAntecedente />} />
            <Route path="/antecedente/:id" element={<VerAntecedente />} />
            <Route path="/antecedente/editar/:id" element={<EditarAntecedente />} />

            <Route path="/agendamiento" element={<ListarAgendamiento />} />
            <Route path="/agendamiento/historial" element={<HistorialAgendamiento />} />
            <Route path="/agendamiento/:id" element={<VerAgendamiento />} />
            <Route path="/agendamiento/crear" element={<CrearAgendamiento />} />
            <Route path="/agendamiento/editar/:id" element={<EditarAgendamiento />} />

            <Route path="/canje" element={<ListarCanje />} />
            <Route path="/canje/:id" element={<VerCanje />} />

            <Route path="/comercio" element={<ListarComercio />} />
            <Route path="/comercio/crear" element={<CrearComercio />} />
            <Route path="/comercio/:id" element={<VerComercio />} />
            <Route path="/comercio/editar/:id" element={<EditarComercio />} />

            <Route path="/consejo" element={<ListarConsejo />} />
            <Route path="/consejo/crear" element={<CrearConsejo />} />
            <Route path="/consejo/:id" element={<VerConsejo />} />
            <Route path="/consejo/editar/:id" element={<EditarConsejo />} />

            <Route path="/publicidad" element={<ListarPublicidad />} />
            <Route path="/publicidad/:id" element={<VerPublicidad />} />
            <Route path="/publicidad/crear" element={<CrearPublicidad />} />
            <Route path="/publicidad/editar/:id" element={<EditarPublicidad />} />


            <Route path="/plan" element={<ListarPlan />} />
            <Route path="/plan/:id" element={<VerPlan />} />
            <Route path="/plan/crear" element={<CrearPlan />} />
            <Route path="/plan/editar/:id" element={<EditarPlan />} />

            <Route path="/premio" element={<ListarPremio />} />
            <Route path="/premio/:id" element={<VerPremio />} />
            <Route path="/premio/crear" element={<CrearPremio />} />
            <Route path="/premio/editar/:id" element={<EditarPremio />} />
            <Route path="/ListarCategoria_premios" element={<ListarCategoria_premios />} />
            <Route path="/CrearCategoria_premios" element={<CrearCategoria_premios/>} />
            <Route path="/categoria_premios/:id" element={<VerCategoriaPremios/>} />
            <Route path="/categoria_premios/editar/:id" element={<EditarCategoriaPremios/>} />
 

            <Route path="/sucursal" element={<ListarSucursal />} />
            <Route path="/sucursal/:id" element={<VerSucursal />} />
            <Route path="/sucursal/crear" element={<CrearSucursal />} />
            <Route path="/sucursal/editar/:id" element={<EditarSucursal />} />

            <Route path="/empresa" element={<ListarEmpresa />} />
            <Route path="/empresa/:id" element={<VerEmpresa />} />
            <Route path="/empresa/crear" element={<CrearEmpresa />} />
            <Route path="/empresa/editar/:id" element={<EditarEmpresa />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profileprofesional" element={<ProfileProfesional />} />
            <Route path="/profileprofesional/editar" element={<EditarProfileProfesional />} />

            <Route path="/profile/editar" element={<EditarProfile />} />
            <Route path="/perfilnutri" element={<VerPerfilNutri />} />
            <Route path="/perfilnutri/:id" element={<EditarNutri />} />
            <Route path="/suplementos/crear" element={<CrearSuplemento />} />
            <Route path="/suplementos/editar/:id" element={<EditarSuplemento />} />
            <Route path="/aperitivos" element={<ListarAperitivo />} />
            <Route path="/aperitivos/:id" element={<VerAperitivo />} />
            <Route path="/aperitivos/crear" element={<CrearAperitivo />} />
            <Route path="/aperitivos/editar/:id" element={<EditarAperitivo />} />
            <Route path="/ingredientes" element={<ListarIngredientes />} />
            <Route path="ingredientes/crear" element={<CrearIngrediente />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
