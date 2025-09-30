export interface Persona {
    id: number;
    sexo: string;
    fecha_nacimiento: string;
    direccion: string;
    pais: string;
    departamento: string;
    ciudad: string;
    comercio_nombre: string;
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
    usuario_id: number;
    antecedentes_personales: string[];
    antecedentes_familiares: string[];
    
    //Datos de la tabla usuario
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
    perfil: string;
    plan: string;
    empresa: string;
    foto: string;
  }
  