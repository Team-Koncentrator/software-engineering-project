import { useRef, useState, useEffect } from 'react';
import aes from 'crypto-js/aes';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axios from 'api/axios';
import './Register.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavLink as Link } from 'react-router-dom';

var CryptoJS = require('crypto-js');

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'users';

const Register = () => {
  const userRef = useRef();
  const nameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [selectedDate, setSelectedDate] = useState();
  const [isUser, setIsUser] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  /*
  useEffect(() => {
    setErrMsg('');
  }, [username, firstName, lastName, pwd, matchPwd]);
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(firstName);
    const v4 = NAME_REGEX.test(lastName);
    setSelectedDate(e.target.value);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      console.log('pobierz uzytkownikow');
      const response = await axios.get(
        '/users',
        JSON.stringify(
          { username, pwd },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )
      );

      response.data.forEach((item) => {
        if (item.firstName === firstName) {
          console.log(item.firstName);
          console.log(firstName);
          console.log('Jest juz uzytkownik');
          setErrMsg('Jest już taki użytkownik');
          setSuccess(false);
          setIsUser(true);
          throw 'break';
        }
      });

      if (!isUser) {
        console.log('tworze uzytkownika');
        const username = {
          name: firstName,
          surname: lastName,
          age: new Date().getFullYear() - parseInt(selectedDate.toString().substring(11, 15)),
          gender: firstName.charAt(firstName.length - 1) === 'a' || 'A' ? 'Female' : 'Male',
          password: pwd //CryptoJS.AES.encrypt(pwd, 'testkey').toString()
          //isAdmin: false
        };

        try {
          console.log('wysylam posta');
          const resp = await axios.post(REGISTER_URL, username);
          console.log('User created');
          setSuccess(true);
        } catch (err) {
          console.log(err);
        }

        setUsername('');
        setFirstName('');
        setLastName('');
        setPwd('');
        setMatchPwd('');
      }
    } catch (err) {
      console.log(err);
      setIsUser(false);
      setErrMsg('');
    }

    setPwd('');
    setMatchPwd('');
  };

  return (
    <div className='register-page-wrapper'>
      {success ? (
        <section className='sect'>
          <h1 className='register-wrapper__header'>Zarejestrowano pomyślnie!</h1>
          <p>
            <span className='line'>
              <Link className='a link__sign' to='/login'>
                Zaloguj się
              </Link>
            </span>
          </p>
        </section>
      ) : (
        <section className='regsiter-wrapper'>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h1 className='register-wrapper__header'>Rejestracja</h1>
          <form className='register-wrapper__form' onSubmit={handleSubmit}>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='username'>
                <span className='label__asterisk'>*</span>
                Nazwa użytkownika
                <FaCheck className={validName ? 'valid' : 'hide'}> </FaCheck>
                <FaTimes className={validName || !username ? 'hide' : 'invalid'} />
              </label>
              <input
                type='text'
                className='input-wrapper__input'
                id='username'
                placeholder='Podaj login lub nazwę użytkownika'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id='uidnote' className={userFocus && username && !validName ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                4 do 24 znaków.
                <br />
                Musi zgczynać się literą.
                <br />
                Litery, cyfry, podkreślniki, myślniki są dozwolone.
              </p>
            </div>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='firstName'>
                <span className='label__asterisk'>*</span>
                Imię
                <FaCheck className={validFirstName ? 'valid' : 'hide'} />
                <FaTimes className={validFirstName || !firstName ? 'hide' : 'invalid'} />
              </label>
              <input
                type='text'
                className='input-wrapper__input'
                id='firstName'
                placeholder='Podaj imię'
                ref={nameRef}
                autoComplete='off'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                aria-invalid={validFirstName ? 'false' : 'true'}
                aria-describedby='fnamenote'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p id='fnamenote' className={firstNameFocus && firstName && !validFirstName ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                Przynajmniej dwa znaki.
              </p>
            </div>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='lastName'>
                <span className='label__asterisk'>*</span>
                Nazwisko
                <FaCheck className={validLastName ? 'valid' : 'hide'} />
                <FaTimes className={validLastName || !lastName ? 'hide' : 'invalid'} />
              </label>
              <input
                type='text'
                className='input-wrapper__input'
                id='lastName'
                placeholder='Podaj nazwisko'
                ref={nameRef}
                autoComplete='off'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                aria-invalid={validLastName ? 'false' : 'true'}
                aria-describedby='namenote'
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p id='namenote' className={lastNameFocus && lastName && !validLastName ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                Przynajmniej dwa znaki.
              </p>
            </div>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='firstName'>
                <span className='label__asterisk'>*</span>
                Data urodzenia
              </label>
              <DatePicker
                className='input-wrapper__input'
                dateFormat='dd-MM-yyyy'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText='Wybierz datę urodzenia'
                isClearable
                showYearDropdown
                showMonthDropdown></DatePicker>
            </div>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='password'>
                <span className='label__asterisk'>*</span>
                Hasło
                <FaCheck className={validPwd ? 'valid' : 'hide'} />
                <FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
              </label>
              <input
                type='password'
                className='input-wrapper__input'
                id='password'
                placeholder='Wprowadź hasło'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                8 do 24 symboli.
                <br />
                Musi zawierać duże i małe litery, przynajmniej jedną cyfrę i znak specjalny.
                <br />
                Dozwolone znaki: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span>{' '}
                <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
              </p>
            </div>
            <div className='form__input-wrapper'>
              <label className='input-wrapper__label' htmlFor='confirm_pwd'>
                <span className='label__asterisk'>*</span>
                Potwierdź hasło
                <FaCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
                <FaTimes className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
              </label>
              <input
                type='password'
                className='input-wrapper__input'
                id='confirm_pwd'
                placeholder='Powtórz hasło'
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FaInfoCircle />
                Hasła muszą się zgadzać.
              </p>
            </div>
            <div className='form__button-wrapper'>
              <button className='form__button' disabled={!validName || !validPwd || !validMatch ? true : false}>
                Zarejestruj się
              </button>
            </div>
          </form>
          <p className='input-wrapper__label'>
            Masz już konto?
            <br />
            <span className='line'>
              <Link className='a link__sign' to='/login'>
                Zaloguj się
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
