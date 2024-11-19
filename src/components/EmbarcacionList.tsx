import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Embarcacion } from '../types';

const EmbarcacionList: React.FC<{ refresh: boolean }> = ({ refresh }) => {
    const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
    const [editEmbarcacion, setEditEmbarcacion] = useState<Embarcacion | null>(null);

    const fetchEmbarcaciones = () => {
        axios.get('/api/embarcaciones')
            .then(response => {
                setEmbarcaciones(response.data);
            })
            .catch(error => {
                console.error('No se pueden poner las embarcaciones.', error);
            });
    };

    useEffect(() => {
        fetchEmbarcaciones();
    }, [refresh]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/embarcaciones/${id}`);
            fetchEmbarcaciones();
        } catch (error) {
            console.error('No se puede eliminar la embarcación', error);
        }
    };

    const handleEdit = (embarcacion: Embarcacion) => {
        setEditEmbarcacion({
            ...embarcacion,
            fechaProgramada: new Date(embarcacion.fechaProgramada) // Asegúrate de que sea un objeto Date
        });
    };

    const handleUpdate = async (updatedEmbarcacion: Embarcacion) => {
        try {
            await axios.put(`/api/embarcaciones/${updatedEmbarcacion.id}`, updatedEmbarcacion);
            setEditEmbarcacion(null);
            fetchEmbarcaciones();
        } catch (error) {
            console.error('No se puede actualizar la embarcación', error);
        }
    };

    return (
        <div>
            <h1>Embarcaciones</h1>
            {editEmbarcacion && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(editEmbarcacion);
                }}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={editEmbarcacion.nombre}
                            onChange={e => setEditEmbarcacion({ ...editEmbarcacion, nombre: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Capacidad:</label>
                        <input
                            type="number"
                            value={editEmbarcacion.capacidad}
                            onChange={e => setEditEmbarcacion({ ...editEmbarcacion, capacidad: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={editEmbarcacion.descripcion}
                            onChange={e => setEditEmbarcacion({ ...editEmbarcacion, descripcion: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Fecha Programada:</label>
                        <input
                            type="date"
                            value={editEmbarcacion.fechaProgramada.toISOString().split('T')[0]}
                            onChange={e => setEditEmbarcacion({ ...editEmbarcacion, fechaProgramada: new Date(e.target.value) })}
                        />
                    </div>
                    <button type="submit">Actualizar Embarcación</button>
                    <button type="button" onClick={() => setEditEmbarcacion(null)}>Cancelar</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Capacidad</th>
                        <th>Fecha Programada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {embarcaciones.map(embarcacion => (
                        <tr key={embarcacion.id}>
                            <td>{embarcacion.nombre}</td>
                            <td>{embarcacion.descripcion}</td>
                            <td>{embarcacion.capacidad} toneladas</td>
                            <td>{new Date(embarcacion.fechaProgramada).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(embarcacion)}>Actualizar</button>
                                <button onClick={() => handleDelete(embarcacion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmbarcacionList;