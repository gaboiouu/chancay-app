import React, { useState } from 'react';
import axios from 'axios';

interface EmbarcacionFormProps {
    onEmbarcacionCreated: () => void;
}

const EmbarcacionesForm: React.FC<EmbarcacionFormProps> = ({ onEmbarcacionCreated }) => {
    const [nombre, setNombre] = useState('');
    const [capacidad, setCapacidad] = useState<number | ''>(''); 
    const [descripcion, setDescripcion] = useState('');
    const [fechaProgramada, setFechaProgramada] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const nuevaEmbarcacion = { nombre, capacidad: Number(capacidad), descripcion, fechaProgramada: new Date(fechaProgramada) };
        try {
            const response = await axios.post('/api/embarcaciones', nuevaEmbarcacion);
            console.log('Embarcación creada:', response.data);
            onEmbarcacionCreated();
            setNombre('');
            setCapacidad('');
            setDescripcion('');
            setFechaProgramada('');
        } catch (error) {
            console.error('No se puede agregar la embarcación', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Capacidad:</label>
                <input type="number" value={capacidad} onChange={e => setCapacidad(Number(e.target.value))} />
            </div>
            <div>
                <label>Descripción:</label>
                <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>
            <div>
                <label>Fecha Programada:</label>
                <input type="date" value={fechaProgramada} onChange={e => setFechaProgramada(e.target.value)} />
            </div>
            <button type="submit">Crear Embarcación</button>
        </form>
    );
}

export default EmbarcacionesForm;