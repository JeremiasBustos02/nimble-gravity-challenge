import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { JobList } from './components/JobList';
import './App.css';

const CANDIDATE_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL;

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        // Las dos llamadas son independientes, las hacemos en paralelo para reducir el tiempo de carga inicial
        const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidate(CANDIDATE_EMAIL),
          apiService.getJobs()
        ]);

        setCandidate(candidateData);
        setJobs(jobsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

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
        <h2>Posiciones Abiertas</h2>
        <JobList jobs={jobs} candidate={candidate} />
      </main>
    </div>
  );
}

export default App;