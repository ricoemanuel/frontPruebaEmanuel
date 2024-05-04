import React, { useState, useEffect } from 'react';
import './empleados.css';
import { useForm } from 'react-hook-form';
import { getEmpleados, createEmpleado } from '../../services/empleados.service';
import { signUp } from '../../services/auth.service';
const Empleados = () => {
  const { register, handleSubmit, reset } = useForm();
  const [empleados, setEmpleados] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    getEmpleados(user.token, user.user.empleado_id).then((res) => {
        console.log(res)
        if(res.status!==500 && res.status!==403){
            setEmpleados(res.data);
        }
      
    });
  }, [user.token]);

  const onSubmit = async (data) => {
    console.log(data)
    const payload = {
        "fecha_ingreso": new Date(),
        "nombre": data.nombre,
        "salario": data.salario,
        "correo": data.correo,
        "contrasena": data.contrasena
      }
      const res=await signUp(payload)
      
    reset();
    const updatedEmpleados = await getEmpleados(user.token, user.user.empleado_id);
    setEmpleados(updatedEmpleados.data);
  };

  

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Agregar Empleado</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Nombre" {...register("nombre", { required: true })} />
          </div>
          <div className="form-group">
            <input type="number" step="0.01" className="form-control" placeholder="Salario" {...register("salario", { required: true })} />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="correo" {...register("correo", { required: true })} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="contraseña" {...register("contrasena", { required: true })} />
          </div>
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>
      <div className="table-container">
        <h1>Listado de Empleados</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Ingreso</th>
              <th>Rol</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(empleado => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.fecha_ingreso}</td>
                <td>{empleado.rol}</td>
                <td>{empleado.salario}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;
