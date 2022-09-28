import { useRef, useState, useEffect } from 'react';

import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axios from 'api/axios';
import './Register.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/users';

const Register = () => {
  const userRef = useRef();
  const nameRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [selectedDate, setSelectedDate] = useState();

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

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

  useEffect(() => {
    setErrMsg('');
  }, [user, firstName, lastName, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(firstName);
    const v4 = NAME_REGEX.test(lastName);
    setSelectedDate(e.target.value);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, {
        firstName: firstName,
        lastName: lastName,
        age: new Date().getFullYear() - parseInt(selectedDate.toString().substring(11, 15)),
        gender: firstName.charAt(firstName.length - 1) == 'a' || 'A' ? 'Female' : 'Male'
      });
      console.log(response.data);
      console.log(response.config);
      console.log(response.statusText);
      console.log(response.status);
      console.log('dupa ' + parseInt(selectedDate.toString().substring(11, 15)));
      console.log(new Date().getFullYear());
      console.log(parseInt(selectedDate.toString().substring(11, 15)) - new Date().getFullYear());

      console.log(JSON.stringify(response));
      console.log(selectedDate);
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section class='sect'>
          <h1>Success!</h1>
          <p>
            <a class='a sign' href='#'>
              Sign In
            </a>
          </p>
        </section>
      ) : (
        <section class='sect'>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h1 className='registerTitle'>Register</h1>
          <form class='form' onSubmit={handleSubmit}>
            <label class='textLabel' htmlFor='username'>
              Nazwa użytkownika
              <FaCheck className={validName ? 'valid' : 'hide'}> </FaCheck>
              <FaTimes className={validName || !user ? 'hide' : 'invalid'} />
            </label>
            <input
              type='text'
              class='input'
              id='username'
              placeholder='Podaj login lub nazwę użytkownika'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
              <FaInfoCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label class='textLabel' htmlFor='firstName'>
              Imię
              <FaCheck className={validFirstName ? 'valid' : 'hide'} />
              <FaTimes className={validFirstName || !firstName ? 'hide' : 'invalid'} />
            </label>
            <input
              type='text'
              class='input'
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
              At least two characters.
            </p>
            <label class='textLabel' htmlFor='lastName'>
              Nazwisko
              <FaCheck className={validLastName ? 'valid' : 'hide'} />
              <FaTimes className={validLastName || !lastName ? 'hide' : 'invalid'} />
            </label>
            <input
              type='text'
              class='input'
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
              At least two characters.
            </p>
            <label class='textLabel' htmlFor='firstName'>
              Data
            </label>
            <DatePicker
              className='input'
              dateFormat='dd-MM-yyyy'
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText='Wybierz datę urodzenia'
              isClearable
              showYearDropdown
              showMonthDropdown></DatePicker>

            <label class='textLabel' htmlFor='password'>
              Hasło
              <FaCheck className={validPwd ? 'valid' : 'hide'} />
              <FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type='password'
              class='input'
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
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span>{' '}
              <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
            </p>
            <label class='textLabel' htmlFor='confirm_pwd'>
              Potwierdź hasło
              <FaCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
              <FaTimes className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type='password'
              class='input'
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
              Must match the first password input field.
            </p>
            <button class='button' disabled={!validName || !validPwd || !validMatch ? true : false}>
              Sign Up
            </button>
          </form>
          <p class='textLabel'>
            Already registered?
            <br />
            <span className='line'>
              <a class='a sign' href='login'>
                Sign In
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
