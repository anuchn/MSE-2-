import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const headers = { Authorization: token };

  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", category: "Academic" });
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/grievances", { headers });
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/grievances", form, { headers });
    fetchData();
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/api/grievances/${id}`, { headers });
    fetchData();
  };

  const searchFn = async () => {
    const res = await axios.get(`http://localhost:5000/api/grievances/search?title=${search}`, { headers });
    setData(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={submit}>
        <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
        <input placeholder="Description" onChange={e => setForm({...form, description:e.target.value})}/>
        <select onChange={e => setForm({...form, category:e.target.value})}>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>
        <button>Add</button>
      </form>

      <input placeholder="Search" onChange={e => setSearch(e.target.value)}/>
      <button onClick={searchFn}>Search</button>

      {data.map(item => (
        <div className="card" key={item._id}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <small>{item.category}</small>
          <br />
          <button onClick={() => del(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}