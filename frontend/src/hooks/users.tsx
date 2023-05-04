import {useQuery, useMutation} from 'react-query';
import {api} from '../utils/api';

const getUserProfile = () =>
  useQuery(['profile'], async () => {
    try {
      const response = await api.get('/users/me/');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });

const refreshToken = () => {
  return useMutation(userID =>
    api
      .post(`/users/refresh_token/`, userID)
      .then((res: {data: any}) => res?.data)
      .catch((err: any) => console.log(err)),
  );
};

const userLogin = () => {
  return useMutation(userLoginData =>
    api
      .post('/users/login/', userLoginData)
      .then((res: {data: any}) => {
        return res.data;
      })
      .catch((err: any) => console.log(err)),
  );
};

const userSignUp = () => {
  return useMutation(userData =>
    api.post('/users/register/', userData).then((res: {data: any}) => res.data),
  );
};

export {getUserProfile, userLogin, userSignUp, refreshToken};
