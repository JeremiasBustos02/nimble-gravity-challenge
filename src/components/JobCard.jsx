import { useState } from 'react';
import { apiService } from '../services/api';

export const JobCard = ({ job, candidate }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        if (!repoUrl.trim()) {
            setErrorMsg('La URL del repositorio no puede estar vacía');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        try {
            const payload = {
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                repoUrl: repoUrl.trim(),
            };

            await apiService.submitApplication(payload);
            setStatus('success');

        } catch (error) {
            setErrorMsg(error.message);
            setStatus('error');
        }
    };

    return (
        <div className="job-card">
            <h3>{job.title}</h3>

            {status === 'success' ? (
                <div className="success-message">
                    ¡Postulación enviada con éxito!
                </div>
            ) : (
                <div className="job-form">
                    <label>URL de tu repositorio</label>
                    <input
                        type="text"
                        placeholder="Ej: https://github.com/tu-usuario/tu-repo"
                        value={repoUrl}
                        onChange={(e) => {
                            setRepoUrl(e.target.value);
                            if (status === 'error') {
                                setStatus('idle');
                                setErrorMsg('');
                            }
                        }}
                        disabled={status === 'loading'}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            )}

            {status === 'error' && <p className="error-text">{errorMsg}</p>}
        </div>
    );
};