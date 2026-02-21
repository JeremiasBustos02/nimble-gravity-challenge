const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiService = {

    // Obtener datos del candidato por email
    async getCandidate(email) {
        const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('No se pudo obtener la información del candidato');
        return await response.json();
    },

    // Obtener la lista de empleos disponibles
    async getJobs() {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de trabajos');
        }
        return await response.json();
    },

    // Enviar una aplicación a un empleo
    async submitApplication(applicationData) {
        const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al enviar la aplicación');
        }
        return await response.json();
    }

}