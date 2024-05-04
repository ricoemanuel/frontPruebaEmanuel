import React, { useState, useEffect } from 'react';
import './solicitudes.css';
import { useForm } from 'react-hook-form';
import { getSolicitudesByUser, createSolicitud, deleteSolicitud } from '../../services/solicitudes.service';

const Solicitudes = () => {
  const { register, handleSubmit, reset } = useForm();
  const [solicitudes, setSolicitudes] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    getSolicitudesByUser(user.token, user.user.empleado_id).then((res) => {
      setSolicitudes(res.data);
    });
  }, [user.token, user.user.empleado_id]);

  const onSubmit = async (data) => {
    const datos = { ...data, empleado_id: user.user.empleado_id };
    await createSolicitud(user.token, user.user.empleado_id, datos);
    reset();
    // Actualizar la lista de solicitudes después de agregar una nueva solicitud
    const updatedSolicitudes = await getSolicitudesByUser(user.token, user.user.empleado_id);
    setSolicitudes(updatedSolicitudes.data);
  };

  const handleDelete = async (solicitudId) => {
    console.log(solicitudId)
      await deleteSolicitud(user.token, user.user.empleado_id, solicitudId);
      const updatedSolicitudes = solicitudes.filter(solicitud => solicitud.id !== solicitudId);
      setSolicitudes(updatedSolicitudes);
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Agregar Solicitud</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Código" {...register("codigo", { required: true })} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Descripción" {...register("descripcion", { required: true })} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Resumen" {...register("resumen", { required: true })} />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" placeholder="Salario" {...register("salario", { required: true })} />
          </div>
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>
      <div className="table-container">
        <h1>Listado de Solicitudes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Resumen</th>
              <th>Salario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(solicitud => (
              <tr key={solicitud.id}>
                <td>{solicitud.codigo}</td>
                <td>{solicitud.descripcion}</td>
                <td>{solicitud.resumen}</td>
                <td>{solicitud.salario}</td>
                <td>
                  <button onClick={() => handleDelete(solicitud.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solicitudes;
