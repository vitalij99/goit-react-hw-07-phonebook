import axios from 'axios';

axios.defaults.baseURL = 'https://644039963dee5b763e323c3f.mockapi.io';

export const getContact = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};
export const createContact = async contact => {
  const response = await axios.post('/contacts', contact);
  return response.data;
};
export const deleteContact = async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
};
