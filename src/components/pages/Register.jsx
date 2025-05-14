import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === formData.email)) {
      newErrors.push('Email already registered');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/');
  };

  return (
    <>
      <section className="container" id="register_section">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="Register-form-container p-5 text-white w-50 rounded-2">
            <div className="fs-2 fw-bolder mb-4">Register</div>
            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="Register-btn px-3 py-1 mt-1 rounded-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </> 
  );
}

export default Register;