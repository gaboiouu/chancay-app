import React, { useState } from 'react';
import EmbarcacionList from './components/EmbarcacionList';
import EmbarcacionesForm from './components/Embarcacionesform';
import './App.css'; // Importa el archivo CSS

const App: React.FC = () => {
    const [refresh, setRefresh] = useState(false);

    const handleEmbarcacionCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Gestión de Embarcaciones</h1>
            <EmbarcacionesForm onEmbarcacionCreated={handleEmbarcacionCreated} />
            <EmbarcacionList refresh={refresh} />
        </div>
    );
}

export default App;