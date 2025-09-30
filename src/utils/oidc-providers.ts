import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { sleep } from './helpers';
import { authenticatedApi } from "../pages/interfaces/api";

declare const FB: any;

const GOOGLE_CONFIG: UserManagerSettings = {
  authority: 'https://accounts.google.com',
  client_id: '',
  client_secret: '',
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  scope: 'openid email profile',
  loadUserInfo: true,
};

export const GoogleProvider = new UserManager(GOOGLE_CONFIG);
/*
export const authLogin = (email: string, password: string) => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    //if (email === 'admin@example.com' && password === 'admin') {
    if (email == email) {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'demo@vivemas.com.py' } })
      );
      return res({ profile: { email: 'demo@vivemas.com.py' } });
    }
    return rej({ message: 'Credentials are wrong!' });
  });
};
*/
export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    try {
      let authentication = localStorage.getItem('authentication');
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};

export const authLogin = async (email: string, password: string): Promise<any> => {
  try {
    console.log("Iniciando autenticación...");
    console.log("Email:", email);
    console.log("Password:", password);

    const response = await authenticatedApi().post("/login/web", {
      email,
      password,
    });

    console.log("Respuesta del servidor:", response);

    if (response.status === 200) {
      const data = response.data;
      console.log("Datos recibidos:", data);

      const profile = {
        email: email,
        picture: data.foto,
        id: data.id,
        perfil: data.perfil,
        empresa: data.empresa,
        comercio: data.comercio,
      };

      console.log("Perfil generado:", profile);

      localStorage.setItem('authentication', JSON.stringify({ profile }));
      console.log("Perfil guardado en localStorage");

      return { profile };
    } else {
      console.warn("Credenciales incorrectas, status:", response.status);
      throw new Error('Las credenciales son incorrectas!');
    }
  } catch (error: any) {
    console.error("Error en la autenticación:", error);
    throw new Error(`Error en la autenticación: ${(error as Error).message}`);
  }
};
