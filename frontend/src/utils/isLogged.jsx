const isLogged = () => (localStorage.getItem('isLogged') ? true : false);

export { isLogged };
