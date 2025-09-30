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
      icon: 'fas fa-tachometer-alt nav-icon',
      path: '/'
    },
    {
      name: i18n.t('Paciente'),
      icon: 'fas fa-user-alt',
      path: '/paciente'
    },
    {
      name: i18n.t('  Usuario'),
      icon: 'fas fa-user-alt',
      path: '/usuario'
    },
    {
      name: i18n.t('Empresas'),
      icon: 'fas fa-building nav-icon',
      path: '/empresa'
    },
    {
      name: i18n.t('Convenios'),
      icon: 'fas fa-handshake nav-icon',
      children: [
        {
          name: i18n.t('Comercios'),
          icon: 'fas fa-shopping-bag nav-icon',
          path: '/comercio'
        },
        {
          name: i18n.t('Sucursales'),
          icon: 'fas fa-shopping-cart nav-icon',
          path: '/sucursal'
        },
      ]
    },
    {
      name: i18n.t('Premios'),
      icon: 'fas fa-gift nav-icon',
      path: '/premio'
    },
    {
      name: i18n.t('Canje'),
      icon: 'fas fa-trophy nav-icon',
      path: '/canje'
    },
    {
      name: i18n.t('Novedades'),
      icon: 'fas fa-bell nav-icon',
      path: '/novedades'
    },
    {
      name: i18n.t('Configuración'),
      icon: 'fas fa-cog nav-icon',
      children: [
        {
          name: i18n.t('Actividades Extra'),
          icon: 'fas fa-tasks nav-icon',
          path: '/actividadextra'
        },
        {
          name: i18n.t('Antecedentes'),
          icon: 'fas fa-book-medical nav-icon',
          path: '/antecedente'
        },
        {
          name: i18n.t('Consejos'),
          icon: 'fas fa-lightbulb nav-icon',
          path: '/consejo'
        },
        {
          name: i18n.t('Planes'),
          icon: 'fas fa-calendar-alt nav-icon',
          path: '/plan'
        },
      ]
    },
    {
      name: 'Manual de usuario',
      icon: 'fas fa-file-pdf nav-icon',
      children: [
        {
          name: i18n.t('Manual Aplicación móvil'),
          icon: 'fas fa-mobile-alt nav-icon',
          path: '/manualapp'
        },
        {
          name: i18n.t('Manual Aplicación web'),
          icon: 'fas fa-globe nav-icon',
          path: '/manualweb'
        }
      ]
    },
    {
      name: i18n.t('Privacidad'),
      icon: 'fas fa-lock nav-icon',
      children: [
        {
          name: i18n.t('Politica de privacidad'),
          icon: 'fas fa-user-shield nav-icon',
          path: '/politica'
        },
  
        {
          name: i18n.t('Condiciones de uso'),
          icon: 'fas fa-book nav-icon',
          path: '/terminos'
        }
      ]
    },
  ];

  const MenuSidebar = () => {
    const authentication = useSelector((state: any) => state.auth.authentication);
    const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
    const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
    const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  
  // Determina el perfil del usuario (puedes usar un campo en el objeto `authentication`)
    const userRole = authentication.profile.perfil; // Asumiendo que hay un campo "role" en el perfil del usuario  
  
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
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
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
          className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''}${
            menuChildIndent ? ' nav-child-indent' : ''
          }`}
          role="menu"
        >
            {MENU.map((menuItem: IMenuItem) => (
            <MenuItem key={menuItem.name + menuItem.path} menuItem={menuItem} />
          ))}
        </ul>
      </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
