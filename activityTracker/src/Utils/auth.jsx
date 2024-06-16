import Cookies from 'js-cookie';
import { document } from 'postcss';

const useAuth = () => {
  const token = Cookies.get('accessToken');
  console.log(token)
  console.log(document.cookie)
  return !!token; 
};

export default useAuth;

