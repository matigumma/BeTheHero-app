import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Logo from "../../assets/logo.svg";
import "./styles.css";

import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (error) {
      alert("Error al registrar nuevo caso, intente nuevamente...");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={Logo} alt="be the hero" />

          <h1>Registrar nuevo caso</h1>
          <p>
            Descriva el caso detalladamente para encontrar un heroe para
            resolver eso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Volver al Home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Titutlo del Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descripcion"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
