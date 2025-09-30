export interface Agendamiento {
    id: number;
    fecha: string;
    hora_desde: string;
    hora_hasta: string;
    consultorio_id: number | null;
    nombre_consultorio: string | null;
    paciente_id: number | null;
    nombre_paciente: string;
    apellido_paciente: string;
    tipo_documento_paciente: string | null;
    numero_documento_paciente: string | null;
    email_paciente: string | null;
    celular_paciente: string | null;
    estado: string;
    a_domicilio: string;
    atendido_por: number | null;
    nombre_atendido_por: string | null;
  }