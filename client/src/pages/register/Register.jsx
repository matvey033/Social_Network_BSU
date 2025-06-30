import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from 'axios';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const [reg, setReg] = useState(false);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();
    setReg(false);

    // Simple client's validation
    if (inputs.password.length < 6) {
      setErr("Пароль должен быть не менее 6 символов");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setErr("Некорректный email");
      return;
    }

    if (inputs.username.trim().length < 2) {
      setErr("Имя пользователя должно быть не короче 2 символов");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setInputs(
        {
          username: "",
          email: "",
          password: "",
          name: "",
        }
      );
      setReg(true);
      if (err !== null) setErr(null);
    } catch (err) {
      setReg(false);
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Matvey`s Social.</h1>
          <p>
            This Social Media App developed Matvey's special for BSU.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} value={inputs.username} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} value={inputs.name} />
            {err && err}
            { reg && <div>User created!</div> }
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;