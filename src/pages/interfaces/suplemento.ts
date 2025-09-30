export interface Suplemento {
    id?: number; // integer Auto Increment
    descripcion: string; // character varying(255)
    marca?: string | null; // character varying(255) NULL
    caracteristicas?: string | null; // text NULL
    como_tomar?: string | null; // character varying(50) NULL
    imagen?: string | null; // character varying(255) NULL
    pacienteId?: number | null; // integer NULL
  }