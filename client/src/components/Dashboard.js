import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem("token");
  const headers = { Authorization: token };

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });
  const [search, setSearch] = useState("");

  // fetch data
  const fetchData = async () => {
    const res = await axios.get("https://student-grievance-management-system-b34w.onrender.com/api/grievances", { headers });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add
  const submit = async (e) => {
    e.preventDefault();
    await axios.post("https://student-grievance-management-system-b34w.onrender.com/api/grievances", form, { headers });
    fetchData();
  };

  // delete
  const del = async (id) => {
    await axios.delete(`https://student-grievance-management-system-b34w.onrender.com/api/grievances/${id}`, { headers });
    fetchData();
  };

  // search
  const searchFn = async () => {
    const res = await axios.get(
      `https://student-grievance-management-system-b34w.onrender.com/api/grievances/search?title=${search}`,
      { headers }
    );
    setData(res.data);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

      <div className="navbar">
        <h3>Dashboard</h3>
        <button onClick={logout} style={{width:"auto"}}>Logout</button>
      </div>

      <div className="container">
        <h3>Add Grievance</h3>
        <form onSubmit={submit}>
          <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})} />
          <input placeholder="Description" onChange={e => setForm({...form, description:e.target.value})} />
          <select onChange={e => setForm({...form, category:e.target.value})}>
            <option>Academic</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>Other</option>
          </select>
          <button>Add</button>
        </form>
      </div>

      <div className="container">
        <input placeholder="Search..." onChange={e => setSearch(e.target.value)} />
        <button onClick={searchFn}>Search</button>
      </div>

      {data.map(item => (
        <div className="card" key={item._id}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <small>{item.category}</small>
          <button onClick={() => del(item._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;