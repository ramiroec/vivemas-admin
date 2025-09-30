/* eslint-disable no-unused-vars */
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNavbarVariant,
  setSidebarSkin,
  toggleDarkMode,
  toggleFooterFixed,
  toggleHeaderBorder,
  toggleHeaderFixed,
  toggleLayoutBoxed,
  toggleLayoutFixed,
  toggleMenuChildIndent,
  toggleMenuItemFlat,
  toggleSidebarMenu
} from '@app/store/reducers/ui';
import {
  NAVBAR_DARK_VARIANTS,
  NAVBAR_LIGHT_VARIANTS,
  SIDEBAR_DARK_SKINS,
  SIDEBAR_LIGHT_SKINS
} from '@app/utils/themes';
import useScrollPosition from '@app/hooks/useScrollPosition';
import {PfCheckbox, PfSelect} from '@profabric/react-components';

const ControlSidebar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.ui.darkMode);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);
  const headerFixed = useSelector((state: any) => state.ui.headerFixed);
  const footerFixed = useSelector((state: any) => state.ui.footerFixed);
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const layoutBoxed = useSelector((state: any) => state.ui.layoutBoxed);
  const layoutFixed = useSelector((state: any) => state.ui.layoutFixed);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  const menuSidebarCollapsed = useSelector(
    (state: any) => state.ui.menuSidebarCollapsed
  );
  const scrollPosition = useScrollPosition();

  const handleDarkModeChange = () => {
    dispatch(toggleDarkMode());
  };

  const handleHeaderBorderChange = () => {
    dispatch(toggleHeaderBorder());
  };

  const handleHeaderFixedChange = () => {
    dispatch(toggleHeaderFixed());
  };

  const handleFooterFixedChange = () => {
    dispatch(toggleFooterFixed());
  };

  const handleLayoutBoxedChange = () => {
    dispatch(toggleLayoutBoxed());
  };

  const handleLayoutFixedChange = () => {
    dispatch(toggleLayoutFixed());
  };

  const onNavbarVariantChange = (value: string) => {
    dispatch(setNavbarVariant(value));
  };

  const onSidebarSkinChange = (value: string) => {
    dispatch(setSidebarSkin(value));
  };

  const handleMenuItemFlatChange = () => {
    dispatch(toggleMenuItemFlat());
  };

  const handleMenuChildIndentChange = () => {
    dispatch(toggleMenuChildIndent());
  };

  const handleMenuSidebarCollapsed = () => {
    dispatch(toggleSidebarMenu());
  };

  const getContainerPaddingTop = useCallback(() => {
    if (headerFixed) {
      return `${16 - (scrollPosition <= 16 ? scrollPosition : 0)}px`;
    }
    return `${73 - (scrollPosition <= 57 ? scrollPosition : 57)}px`;
  }, [scrollPosition, headerFixed]);

  return (
    <aside
      className="control-sidebar control-sidebar-dark"
      style={{
        top: 0,
        bottom: footerFixed ? '57px' : '0px',
        padding: `${getContainerPaddingTop()} 16px 16px 16px`,
        overflowY: 'scroll'
      }}
    >
      <h5>Personalizar vivemás</h5>
      <hr className="mb-2" />

      <div style={{padding: '8px 0'}}>
        <div className="mb-4">
          <PfCheckbox checked={darkMode} onChange={handleDarkModeChange}>
            Modo oscuro
          </PfCheckbox>
        </div>        
      </div>
    </aside>
  );
};

export default ControlSidebar;
