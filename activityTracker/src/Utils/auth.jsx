import Cookies from 'js-cookie';

const useAuth = () => {
  const token = Cookies.get('accessToken');
  console.log(token)
  return !!token; 
};

export default useAuth;

