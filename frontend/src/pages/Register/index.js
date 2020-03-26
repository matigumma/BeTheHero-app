import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import Logo from "../../assets/logo.svg";

import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const res = await api.post("ongs", data);

      alert(`Su id es: ${res.data.id}`);

      history.push("/");
    } catch (error) {
      alert("Error en el registro, intente nuevamente...");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={Logo} alt="be the hero" />

          <h1>Registro</h1>
          <p>
            Registrese, entre en la plataforma y ayude a las personas a
            encontrar los casos de sus ONG
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Volver al LogOn
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nombre de la ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Ciudad"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="Prov."
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
