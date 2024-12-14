import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.1.2/apiiny/validate_login.php', {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/dashboard");
        console.log('Login successful!');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F7F7F7',
      height: '510px',
      width: '468px',
      borderRadius: '10px',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    form: {
      position: 'absolute',
      top: '2rem',
    },
    formContainer: {
      padding: '10px',
    },
    text: {
      margin: '30px auto 40px',
    },
    textField: {
      height: '44px',
      width: '334px',
      border: 'none',
      backgroundColor: 'transparent',
      borderBottom: '1px solid #59A895',
    },
    textFieldFocus: {
      outline: 'none',
    },
    button: {
      color: '#F7F7F7',
      backgroundColor: '#59A895',
      width: '203px',
      height: '45px',
      borderRadius: '20px',
      border: 'none',
      fontSize: '16px',
      margin: '3rem auto',
    },
    buttonHover: {
      backgroundColor: '#F7F7F7',
      color: '#59A895',
      border: '1px solid #59A895',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      padding: '10px',
    },
    body: {
      backgroundImage: "url('../img/bg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    heading: {
      color: '#59A895',
      fontSize: '48px',
      fontWeight: '400',
      cursor: 'context-menu',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.form}>
          <h1 style={styles.heading}>LOGIN</h1>
          <div style={styles.formContainer}>
            <form onSubmit={handleLogin}>
              {error && <p style={styles.error}>{error}</p>}

              <div style={styles.text}>
                <input
                  style={styles.textField}
                  type="text"
                  name="username"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div style={styles.text}>
                <input
                  style={styles.textField}
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <input
                  style={styles.button}
                  type="submit"
                  value="Login"
                  onMouseOver={(e) =>
                    (e.target.style = { ...styles.button, ...styles.buttonHover })
                  }
                  onMouseOut={(e) =>(e.target.style = { ...styles.button, ...styles.buttonHover })}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
