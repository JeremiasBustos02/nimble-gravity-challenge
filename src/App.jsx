import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import './App.css';

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MY_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL;

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        // Cargar datos del candidato y lista de empleos en paralelo
        const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidate(MY_EMAIL),
          apiService.getJobs()
        ]);
        // Guardar los datos en el estado
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        // Independientemente de si hubo error o no, dejamos de mostrar el loader
        setLoading(false);
      }
    };

    initApp();
  }, []);

  // Renderizado condicional basado en el estado de carga y errores
  if (loading) return <div className="loader">Cargando desafío...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="container">
      <header>
        <h1>Nimble Gravity Challenge</h1>
        {candidate && (
          <p>Bienvenido, <strong>{candidate.firstName} {candidate.lastName}</strong></p>
        )}
      </header>

      <main>
        {/* Acá renderizaremos la lista de empleos */}
        <pre>{JSON.stringify(jobs, null, 2)}</pre>
      </main>
    </div>
  );
}

export default App;