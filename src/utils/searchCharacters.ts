// API search function
import axios from 'axios';

const baseUrl = 'https://coinranking1.p.rapidapi.com/search-suggestions';
const headers = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
};

export async function searchCharacters(search: string): Promise<any> {
  try {
    const data = await axios({ url: `${baseUrl}?query=${search}`, headers });
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }

  //   const apiKey: string = 'f9dfb1e8d466d36c27850bedd2047687';
  //   return fetch(
  //     `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`
  //   )
  //     .then(r => r.json())
  //     .then(r => r.data.results)
  //     .catch(error => {
  //       console.error(error);
  //       return [];
  //     });
}
