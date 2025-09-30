import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { PfButton } from '@profabric/react-components';
import { authenticatedApi, API_BASE_URL } from "../../pages/interfaces/api";


const RemoveAccount = () => {
  const [t] = useTranslation();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    }),

    onSubmit: (values) => {
      const url = `${API_BASE_URL}/olvido_contrasena`;    
      authenticatedApi()
        .post(url, values)
        .then(response => {
          if (response.status === 200) {
            // Solicitud exitosa
            toast.success("Felicitaciones, se envió un correo de eliminación!");
          } else if (response.status === 404) {
            // Error en la solicitud
            toast.error("El email no está registrado.");
          }
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          // Manejar otros posibles errores
        });
    }
  });
  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-info">
        <div className="card-header text-center">
          <img src="logo.png" alt="Logo" className="img-fluid" width="300" />
        </div>
        <div className="card-body">
          <p className="login-box-msg">
            Solicitar la eliminación de los datos de su cuenta.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <PfButton type="submit" block>
                  {/* @ts-ignore */}
                    Solicitar
                </PfButton>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">{t<string>('login.button.signIn.label')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccount;
