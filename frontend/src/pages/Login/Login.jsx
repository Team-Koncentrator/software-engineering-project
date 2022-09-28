import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from 'api/axios';
import '../Register/Register.css';
const LOGIN_URL = '/users';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {});
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section class='sect'>
          <h1 class='registerTitle'>You are logged in!</h1>
          <br />
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section class='sect'>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h1 className='registerTitle'>Sign In</h1>
          <form class='form' onSubmit={handleSubmit}>
            <label class='textLabel' htmlFor='username'>
              Nazwa użytkownika
            </label>
            <input
              class='input'
              type='text'
              placeholder='Podaj login lub nazwę użytkownika'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label class='textLabel' htmlFor='password'>
              Hasło
            </label>
            <input
              class='input'
              placeholder='Wprowadź hasło'
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button class='button'>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className='line'>
              {/*put router link here*/}
              <a href='register'>Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
