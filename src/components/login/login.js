import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import './login.css';
import { login,signUp } from '../../services/auth.service'
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showLoginForm, setshowLoginForm] = useState(true);
  const onSubmit = async (data) => {
    if (showLoginForm) {
      const res = await login(data.email, data.password)
      localStorage.setItem("user",JSON.stringify(res))
      window.location.reload()
    } else {
      if (data.password == data.confirmPassword) {
        const payload = {
          "fecha_ingreso": new Date(),
          "nombre": data.fullName,
          "salario": 0,
          "correo": data.email,
          "contrasena": data.password
        }
        const res=await signUp(payload)
        console.log(res===201 || res===200)
        if(res===201 || res===200){
          setshowLoginForm(true)
        }else if(res==400){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El correo electrónico ya está en uso",
          });
        }
        
      }
    }
  };

  const handleToggleForm = () => {
    setshowLoginForm(!showLoginForm);
  };


  return (
    <div className="container">
      <div className="form-wrapper">
        {showLoginForm ? (
          <>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder='Correo Electrónico'
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="error-message">Campo requerido</span>}
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder='Contraseña'
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="error-message">Campo requerido</span>}
              </div>
              <button type="submit" className="submit-btn">
                Iniciar sesión
              </button>
            </form>
            <button className="toggle-btn" onClick={handleToggleForm}>
              Registrarse
            </button>
          </>
        ) : (
          <>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  id="fullName"
                  className="input-field"
                  placeholder='Nombre Completo'
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && <span className="error-message">Campo requerido</span>}
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder='Correo Electrónico'
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="error-message">Campo requerido</span>}
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder='Contraseña'
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="error-message">Campo requerido</span>}
              </div>
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input-field"
                  placeholder='Confirmar contraseña'
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <span className="error-message">Campo requerido</span>}
              </div>
              <button type="submit" className="submit-btn">
                Registrarse
              </button>
            </form>

            <button className="toggle-btn" onClick={handleToggleForm}>
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
