export interface Publicidad {
    id: number;
    comercio: number; //  el ID del comercio
    foto: string;
    estado: 'Activo' | 'Inactivo';
    nombre_comercio: string;
    foto_enlace: string;
  } 