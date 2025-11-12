import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://geoturismoapi-a6gph0hxejhad5hr.canadacentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
