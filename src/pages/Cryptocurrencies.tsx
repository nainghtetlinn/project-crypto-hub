import React from 'react';

import useFetch from '../utils/useFetch';
import { Crypto } from '../components/Cryptocurrencies/Crypto';
import { Loader } from '../components/UI/Loader';
import { Error } from '../components/UI/Error';

interface CryptocurrenciesProps {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({
  simplified = false,
}) => {
  const count = simplified ? 10 : 100;
  const { data, loading, error } = useFetch(`/coins?limit=${count}`);
  const cryptos = data?.data?.coins;
  // const [cryptos, setCryptos] = useState([]);

  // useEffect(() => {
  //   setCryptos(data?.data?.coins);
  // }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  return (
    <main className="container mx-auto px-4">
      <table className="w-full">
        <thead className="border-b border-b-gray-300">
          <tr className="grid grid-cols-12 py-2 text-left">
            <th className="col-span-6 md:col-span-5">
              <h4>Coin Name</h4>
            </th>
            <th className="col-span-3 md:col-span-2">
              <h4>Price</h4>
            </th>
            <th className="hidden md:col-span-3 md:block">
              <h4>Market Cap</h4>
            </th>
            <th className="col-span-3 md:col-span-2">
              <h4>24H</h4>
            </th>
          </tr>
        </thead>

        <tbody>
          {cryptos?.map((coin: any) => (
            <Crypto key={coin.uuid} coin={coin} />
          ))}
        </tbody>
      </table>
    </main>
  );
};
export default React.memo(Cryptocurrencies);
