export interface Paciente {
    id: number;
    sexo: string;
    fecha_nacimiento: string;
    direccion: string;
    pais: string;
    departamento: string;
    ciudad: string;
    barrio: string;
    puntos: number;
    litros_agua_dia: number;
    kilogramos_peso: number;
    metros_altura: number;
    imc: string;
    realiza_actividad_fisica: string;
    cantidad_veces_semana_act_fisica: number;
    horas_dia_actividad_fisica: number;
    horario_actividad_fisica: string;
    fuma: string;
    toma_alcohol: string;
    antecedentes_personales: string[];
    antecedentes_familiares: string[];
    fecha_hora_registro: string;
    tipo_documento: string;
    numero_documento: string;
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    contrasena: string;
    area_trabajo: string;
    estado: string;
    plan: string;
    empresa: string;
    foto: string;
    fecha_registro: Date;
    puntos_canjeados:number;
    tipo_usuario: number;  // ID del tipo de usuario
    descripcion_tipo_usuario: string;  // Descripción del tipo de usuario
  }
  