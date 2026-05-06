const { useState, useEffect } = React;

function Navbar({ setPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">Seyed F</span>

      <div className="ms-auto">
        <button className="btn btn-outline-light mx-2" onClick={() => setPage('about')}>
          About
        </button>
        <button className="btn btn-outline-light" onClick={() => setPage('resources')}>
          Resources
        </button>
      </div>
    </nav>
  );
}

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('data/resume.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{data.name}</h2>
      <h5 className="text-muted">{data.title} | {data.location}</h5>

      <hr />

      <h4>Summary</h4>
      <p>{data.summary}</p>

      <h4>Skills</h4>
      <ul>
        {data.skills.map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      <h4>Experience</h4>
      {data.experience.map((exp, i) => (
        <div key={i} className="mb-3">
          <h5>{exp.company}</h5>
          <p><strong>{exp.role}</strong> | {exp.duration}</p>
          <ul>
            {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('data/resources.json')
      .then(res => res.json())
      .then(setResources);
  }, []);

  return (
    <div className="container mt-4">
      <h3>Resources</h3>

      <div className="row">
        {resources.map((r, i) => (
          <div key={i} className="col-md-4">
            <div className="card p-3 mb-3">
              <h5>{r.title}</h5>
              <a href={r.link} target="_blank" className="btn btn-primary mt-2">
                Read
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('about');

  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 'about' && <About />}
      {page === 'resources' && <Resources />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);