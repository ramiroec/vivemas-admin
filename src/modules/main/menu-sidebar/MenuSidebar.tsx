import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { PfImage } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',  // Más relacionado con paneles de control
    path: '/'
  },
  {
    name: i18n.t('Paciente'),
    icon: 'fas fa-user-md nav-icon',  // Un icono que simboliza doctores o atención médica
    path: '/paciente'
  },
  {
    name: i18n.t('Canje'),
    icon: 'fas fa-sync-alt nav-icon',  // Un símbolo de intercambio o renovación
    path: '/canje'
  },

  {
    name: i18n.t('Convenios'),
    icon: 'fas fa-handshake nav-icon',  // Representa acuerdos o colaboración
    children: [
      {
        name: i18n.t('Comercios'),
        icon: 'fas fa-store-alt nav-icon',  // Un icono más elegante para tiendas
        path: '/comercio'
      },
      {
        name: i18n.t('Sucursales'),
        icon: 'fas fa-map-marked-alt nav-icon',  // Un ícono más moderno para localización
        path: '/sucursal'
      },
      {
        name: i18n.t('Premios'),
        icon: 'fas fa-medal nav-icon',  // Ícono más estilizado para premios
        path: '/premio'
      },

    ]
  },
  {
    name: i18n.t('Configuración'),
    icon: 'fas fa-cogs nav-icon',  // Un icono más completo para configuraciones
    children: [
      {
        name: i18n.t('Actividades Extra'),
        icon: 'fas fa-tasks nav-icon',  // Mantiene el de tareas por claridad
        path: '/actividadextra'
      },
      {
        name: i18n.t('Antecedentes'),
        icon: 'fas fa-file-medical nav-icon',  // Más preciso para historial médico
        path: '/antecedente'
      },
      {
        name: i18n.t('Consejos'),
        icon: 'fas fa-lightbulb nav-icon',  // Representa ideas o sugerencias
        path: '/consejo'
      },
      {
        name: i18n.t('Categoría de premios'),
        icon: 'fas fa-trophy nav-icon',  // Un trofeo ya es el ideal
        path: '/ListarCategoria_premios'
    },
    
      {
        name: i18n.t('Empresas'),
        icon: 'fas fa-building nav-icon',  // Un icono de edificio representa compañías mejor
        path: '/empresa'
      },
      {
        name: i18n.t('Planes'),
        icon: 'fas fa-calendar-check nav-icon',  // Calendario más claro para planificación
        path: '/plan'
      },
      {
        name: i18n.t('Usuario'),
        icon: 'fas fa-user-cog nav-icon',  // Mejor simboliza ajustes de usuarios
        path: '/usuario'
      },
      {
        name: i18n.t('Publicidad'),
        icon: 'fas fa-bullhorn nav-icon',  // Un altavoz que simboliza la publicidad
        path: '/publicidad'
      },
    ]
  },
  {
    name: i18n.t('Manual de usuario'),
    icon: 'fas fa-book-reader nav-icon',  // Un libro para manuales
    children: [
      {
        name: i18n.t('Manual Aplicación móvil'),
        icon: 'fas fa-mobile nav-icon',  // Un ícono moderno de móvil
        path: '/manualapp'
      },
      {
        name: i18n.t('Manual Aplicación web'),
        icon: 'fas fa-desktop nav-icon',  // Un ícono de escritorio que mejor representa la web
        path: '/manualweb'
      },
    ]
  },
  {
    name: i18n.t('Privacidad'),
    icon: 'fas fa-user-shield nav-icon',  // Un ícono que simboliza seguridad y privacidad
    children: [
      {
        name: i18n.t('Novedades'),
        icon: 'fas fa-bell nav-icon',  // Una campana que representa notificaciones o novedades
        path: '/novedades'
      },
      {
        name: i18n.t('Politica de privacidad'),
        icon: 'fas fa-file-contract nav-icon',  // Contrato que representa políticas
        path: '/politica'
      },
      {
        name: i18n.t('Condiciones de uso'),
        icon: 'fas fa-scroll nav-icon',  // Un pergamino para términos y condiciones
        path: '/terminos'
      }
    ]
  },
];



const filterMenu = (menu: IMenuItem[], allowedPaths: string[]): IMenuItem[] => {
  return menu
    .filter(item => 
      allowedPaths.includes(item.path || '') || 
      (item.children && item.children.some(child => allowedPaths.includes(child.path || '')))
    )
    .map(item => ({
      ...item,
      children: item.children ? filterMenu(item.children, allowedPaths) : []
    }));
};






const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);


  let filteredMenu = MENU; //Por defecto, todos los menús se muestran

  if (authentication.profile.perfil === 'Comercio') {
    // Filtrar menú para usuario con perfil 'Comercio'
    const allowedPaths = [
      '/canje',
      '/manualapp',
      '/manualweb',
      '/novedades',
      '/politica',
      '/terminos'
    ];
    filteredMenu = filterMenu(MENU, allowedPaths);
  }






  const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
   `;

    const StyledUserImage = styled(PfImage)`
     --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
     `;
  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/logoSmall.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-bolder">
          <span style={{ color: '#2874A6' }}>vive</span>
          <span style={{ color: '#1ABC9C' }}>más</span>
        </span>

      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch />
        </div>

        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''}${menuChildIndent ? ' nav-child-indent' : ''
              }`}
            role="menu"
          >
             {filteredMenu.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name + menuItem.path} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
