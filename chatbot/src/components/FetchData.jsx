import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
