import Cookies from 'js-cookie';

const useAuth = () => {
  const token = Cookies.get('jwt');
  return !!token; 
};

export default useAuth;

