export interface Aperitivo {
    id?: number;
    tipo_comida: string | null;
    descripcion: string;
    nombre_comercial: string | null;
    porcion: string | null;
    calorias_por_porcion: number | null;
    imagen: string | null;
    paciente_id?: number | null;
  }