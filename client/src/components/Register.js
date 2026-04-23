import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("https://mse-2-cfpo.onrender.com/api/register", form);
    navigate("/login");
  };

  return (
    <div className="center-screen">
      <div className="container">

        <h2>🚀 Create Account</h2>

        <form onSubmit={submit}>
          <input placeholder="Full Name" onChange={e => setForm({...form, name:e.target.value})} />
          <input placeholder="Email Address" onChange={e => setForm({...form, email:e.target.value})} />
          <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />

          <button>Register</button>
        </form>

        <p style={{textAlign:"center", marginTop:"15px"}}>
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}