import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === formData.email);

    if (!user) {
      setError('Account not found. Please register first.');
      return;
    }

    if (user.password !== formData.password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/home');
  };

  return (
    <>
      <section className="container" id="login_section">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="login-form-container p-5 text-white w-50 rounded-2">
            <div className="fs-2 fw-bolder mb-4">Login</div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
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
              <div className="mb-2 text-muted">
                Don't have an account? <Link className="registerLink" to="/register">Register Here</Link>
              </div>
              <button type="submit" className="Login-btn px-3 py-1 rounded-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;