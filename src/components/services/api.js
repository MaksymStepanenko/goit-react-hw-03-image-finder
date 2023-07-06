import axios from 'axios';

const API =
  'https://pixabay.com/api/?q=cat&page=1&image_type=photo&orientation=horizontal';
const KEY = '33815318-5c172bb5b30b5850127c8a49a';

export const fetchPhoto = async (value, perPage) => {
  const { data } = await axios.get(
    `${API}&per_page=${perPage}&key=${KEY}&q=${value}`
  );
  return data;
};
