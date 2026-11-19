import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState(() => {
  const saved = localStorage.getItem("students");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "Frontend Development",
    level: "100",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill name and email");
      return;
    }
    setStudents([...students, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", course: "Frontend Development", level: "100" });
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🎓 Student Registration App</h1>
      <p className="subtitle">Register, search and manage students</p>

      <form onSubmit={handleSubmit} className="card">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <select name="course" value={form.course} onChange={handleChange}>
          <option>Frontend Development</option>
          <option>Backend Development</option>
          <option>Data Analyst</option>
          <option>Cyber Security</option>
        </select>
        <select name="level" value={form.level} onChange={handleChange}>
          <option>100</option>
          <option>200</option>
          <option>300</option>
          <option>400</option>
        </select>
        <button type="submit">Register Student</button>
      </form>

      <input
        className="search"
        placeholder="🔍 Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Total Students: <b>{filtered.length}</b></p>

      <div className="list">
        {filtered.length === 0 && <p>No students yet. Register one above!</p>}
        {filtered.map((s) => (
          <div key={s.id} className="student-card">
            <div>
              <b>{s.name}</b>
              <p>{s.email}</p>
              <small>{s.course} • Level {s.level}</small>
            </div>
            <button onClick={() => deleteStudent(s.id)} className="delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;