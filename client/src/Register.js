import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", form);
    alert("Registered!");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
        <button>Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}