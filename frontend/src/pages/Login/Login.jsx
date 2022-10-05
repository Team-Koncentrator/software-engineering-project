import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from 'api/axios';
import './Login.css';
import { NavLink } from 'react-router-dom';
const LOGIN_URL = '/users';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        LOGIN_URL,
        JSON.stringify(
          { user, pwd },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )
      );

      console.log('dupa');

      console.log(response);
      for (let i = response.data.length - 1; i > 0; i--) {
        if (pwd === response.data[i].password && user === response.data[i].firstName) {
          setIsUser(true);
          setSuccess(true);
        }
        console.log(response.data[i]._id);
        console.log(response.data[i].password);
        console.log(response.data[i].firstName);
      }

      //console.log(JSON.stringify(response?.data));
      console.log(response?.data?.accessToken);
      console.log(response?.data?.roles);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      //      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Brak odpowiedzi serwera');
      } else if (err.response?.status === 400) {
        setErrMsg('Brakuje nazwy użytkownika lub hasła');
      } else if (err.response?.status === 401) {
        setErrMsg('Bark autoryzacji');
      } else {
        setErrMsg('Logowanie nieudane');
      }
      errRef.current.focus();
    }
  };

  const handleClick = () => {
    window.history.replaceState('/login', '/register');
  };

  return (
    <div className='login-page-wrapper'>
      {success ? (
        // TODO
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/'>Go to Home</a>
          </p>
        </section>
      ) : (
        <>
          <section className='login-wrapper'>
            <p ref={errRef} className={`m-hidden ${errMsg ? 'errorBox' : ''}`} aria-live='assertive'>
              {errMsg}
            </p>
            <h1 className='login-wrapper__header'>Logowanie</h1>
            <form onSubmit={handleSubmit} className='login-wrapper__form'>
              <div className='form__input-wrapper'>
                <label htmlFor='username' className='input-wrapper__label'>
                  <span className='label__asterisk'>*</span>Nazwa użytkownika
                </label>
                <input
                  className='input-wrapper__input'
                  type='text'
                  placeholder='Wpisz nazwę użytkownika'
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className='form__input-wrapper'>
                <label htmlFor='password' className='input-wrapper__label'>
                  <span className='label__asterisk'>*</span>Hasło
                </label>
                <input
                  className='input-wrapper__input'
                  placeholder='Wpisz hasło'
                  type='password'
                  id='password'
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              {/* TODO */}
              <a href='#' className='form__forgot-password'>
                Zapomniałeś hasła?
              </a>
              <div className='form__button-wrapper'>
                <button className='form__button'>Zaloguj się</button>
              </div>
            </form>
          </section>
          <section className='register-wrapper'>
            <h1 className='register-wrapper__header'>Rejestracja</h1>
            <p className='register-wrapper__subheader'>Nie masz jeszcze konta?</p>
            <ul className='register-wrapper__list'>
              <p className='list__text'>Zarejestruj się i otrzymaj dostęp do:</p>
              <li>- autorskiego kreatora</li>
              <li>- towrzenie przydziałów</li>
              <li>- zapisywanie przydziałów</li>
            </ul>
            {/*put router link here*/}
            <div className='form__button-wrapper'>
              <NavLink className='form__button link' to={'/register'}>
                Zarejestruj się
              </NavLink>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Login;
