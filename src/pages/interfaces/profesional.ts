export interface Profesional {
    nombre: string;
    apellido: string;
    id: number;
    usuario_id: number;
    licencia_profesional_nro: number;
    titulo_profesional: string;
    agenda_cada: string;
    dias_entrega: string;
    tipo_mediciones: string;
    pliegues_cutaneos: string[] | null;
    otros_pliegues: string[] | null;
    circunferencias: string[] | null;
    calculos_utilizados: string[] | null;
    consultorios: string[] | null;
    foto: string;
  }