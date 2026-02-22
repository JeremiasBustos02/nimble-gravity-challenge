import { JobCard } from './JobCard';

export const JobList = ({ jobs, candidate }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No hay posiciones abiertas en este momento.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          candidate={candidate} 
        />
      ))}
    </div>
  );
};