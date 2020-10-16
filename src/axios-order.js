import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-11ba8.firebaseio.com/'
});

export default instance;