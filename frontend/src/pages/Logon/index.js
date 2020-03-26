import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";

import Logo from "../../assets/logo.svg";
import Heroes from "../../assets/heroes.png";

import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", res.data.name);

      history.push("/profile");
    } catch (error) {
      alert("Fallo el intento de login");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="be the hero" />
        <form onSubmit={handleLogin}>
          <h1>Haga su LogOn</h1>

          <input
            placeholder="Su ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            No tengo Usuario
          </Link>
        </form>
      </section>
      <img src={Heroes} alt="Heroes" />
    </div>
  );
}
