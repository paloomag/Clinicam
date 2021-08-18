import axios from 'axios'

const api = axios.create({
    baseURL:'https://clinitec.tv.br:4433/api/v1',
        headers:{
            'Authorization':'e4bbe5b7a4c1eb55652965aee885dd59bd2ee7f4',
        }
   });
export default api;