import axios from 'axios';

const API =
  'https://pixabay.com/api/?q=cat&image_type=photo&orientation=horizontal&&per_page=12';
// const KEY = '33815318-5c172bb5b30b5850127c8a49a';
const KEY = '29686609-a9c965f4c836d85208d8c2314';

export const fetchPhoto = async (value, page) => {
  const { data } = await axios.get(
    `${API}&page=${page}&key=${KEY}&q=${value}`
  );
  return data;
};
