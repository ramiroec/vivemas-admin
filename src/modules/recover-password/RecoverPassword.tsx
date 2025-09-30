import { authenticatedApi } from "../../pages/interfaces/api";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'; // Importa useParams
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { PfButton } from '@profabric/react-components';

const RecoverPassword = () => {
  const [t] = useTranslation();
  const { token } = useParams(); // Obtiene el token de la URL

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Debe tener 5 caracteres o más')
        .max(30, 'Debe tener 30 caracteres o menos')
        .required('Required'),
      confirmPassword: Yup.string()
        .min(5, 'Debe tener 5 caracteres o más')
        .max(30, 'Debe tener 30 caracteres o menos')
        .required('Required'),
    }),
    
    onSubmit: async (values) => {
      try {
        const api = authenticatedApi();
        api.put(`/olvido_contrasena/${token}`, {new_password: values.password });
        const response = await api.put(`/olvido_contrasena/${token}`, { new_password: values.password });
          if (response.status === 200) {
          // La solicitud fue exitosa, puedes mostrar un mensaje de éxito
          toast.success('Felicidades: contraseña cambiada con éxito!');
        } else {
          // La solicitud falló, puedes mostrar un mensaje de error
          toast.error('El token ha expirado!');
        }
    }
      catch (error: any) {
      // Manejar otros posibles errores
      toast.error(error.message || 'Failed');  
      }
    },
  });

  setWindowClass('hold-transition login-page');
  return (
    <div className="login-box">
      <div className="card card-outline card-info">
        <div className="card-header text-center">
          <img src="../logo.png" alt="Logo" className="img-fluid" width="300"/>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t<string>('recover.oneStepAway')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <PfButton type="submit" block>
                  {/* @ts-ignore */}
                  {t<string>('recover.changePassword')}
                </PfButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
