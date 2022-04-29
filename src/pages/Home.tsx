import React from 'react';

import useFetch from '../utils/useFetch';
import Cryptocurrencies from './Cryptocurrencies';
import { CryptoGlobalStats } from '../components/Home/CryptoGlobalStats';
import { Skeleton } from '../components/UI/Skeleton';
import { Error } from '../components/UI/Error';

const Home: React.FC = () => {
  const { data: cryptoData, error, loading } = useFetch('/coins');
  const stats = cryptoData?.data?.stats;
  // const [stats, setStats] = useState(null);

  // useEffect(() => {
  //   setStats(cryptoData?.data?.stats);
  // }, [cryptoData]);

  if (error) {
    return <Error errorMsg={error} />;
  }

  return (
    <>
      <main className="container mx-auto px-4">
        <h3 className="my-4">Global Crypto Stats</h3>

        {loading && <Skeleton />}
        {!loading && stats && <CryptoGlobalStats cryptoStats={stats} />}

        <h3 className="mt-12 mb-4">Top 10 Cryptocurrencies</h3>
      </main>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
