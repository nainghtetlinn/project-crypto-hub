import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineExclamationCircle,
  AiOutlineCheck,
  AiOutlineStop,
} from 'react-icons/ai';

import useFetch from '../utils/useFetch';
import { checkColor } from '../utils/checkColor';
import { LineChart } from './LineChart';
import { Loader } from '../components/UI/Loader';
import { Error } from '../components/UI/Error';

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
const option = { space: true, precision: 2 };
const toFixOption = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const CryptoDetails: React.FC = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('24h');
  const [isReadMore, setIsReadMore] = useState(false);

  const { data: coinData, error, loading } = useFetch(`/coin/${coinId}`);
  const { data: coinHistory } = useFetch(
    `/coin/${coinId}/history?timePeriod=${timeperiod}`
  );

  const coin = coinData?.data?.coin;

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${
        coin?.price &&
        Number(coin?.price).toLocaleString(undefined, toFixOption)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: 'Rank', value: coin && coin?.rank, icon: <AiOutlineNumber /> },
    {
      title: '24h Volume',
      value: `$ ${
        coin && coin['24hVolume'] && millify(coin['24hVolume'], option)
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coin && millify(coin?.marketCap, option)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${coin && millify(coin?.allTimeHigh?.price, option)}`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coin?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: 'Number Of Exchanges',
      value: coin?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: 'Aprroved Supply',
      value: coin?.supply?.confirmed ? <AiOutlineCheck /> : <AiOutlineStop />,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Total Supply',
      value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        coin?.supply?.circulating && millify(coin?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  return (
    <main className="container mx-auto px-4">
      <div className="my-4 flex flex-col items-center justify-center md:flex-row md:space-x-2">
        <img src={coin?.iconUrl} alt={coin?.name} className="w-12 md:w-16" />
        <h2 className="mt-4 md:mt-0">
          {coin?.name} ({coin?.symbol}) Price
        </h2>
      </div>
      <p className="text-center">
        {coin?.name} ({coin?.symbol}) live price in US dollar (USD). View value
        statistics, market cap and supply.
      </p>

      <h3 className="my-8 font-medium">{coin?.symbol} price chart</h3>

      <div className="flex items-center justify-around rounded bg-blue-100 p-4 shadow-md shadow-gray-400">
        <div>
          <h5 className="mb-2 font-medium text-gray-600">Price in USD</h5>
          <h4 className="font-bold text-blue-900">
            ${' '}
            {Number(coin?.price)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h4>
        </div>
        <div>
          <h5 className="mb-2 font-medium text-gray-600">
            {timeperiod} change
          </h5>
          <h4
            className={`font-bold text-blue-900 ${checkColor(
              coinHistory?.data?.change
            )}`}
          >
            {coinHistory?.data?.change > 0 ? '+' : ''}{' '}
            {coinHistory && Number(coinHistory?.data?.change)?.toFixed(2)} %
          </h4>
        </div>
      </div>

      <div className="my-8 w-full">
        <LineChart
          coinHistory={coinHistory}
          currentPrice={coin?.price && millify(coin?.price)}
          coinName={coin?.name}
        />
        <div className="mt-8 flex items-center justify-center">
          <div className="overflow-hidden rounded bg-gray-200">
            {time.map((t, i) => (
              <button
                key={i}
                onClick={() => setTimeperiod(t)}
                className={`p-2 text-xs sm:px-4 sm:text-sm md:text-base ${
                  timeperiod === t ? 'bg-blue-900 text-white' : ''
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mt-4 mb-2 font-medium">
            {coin?.name} Value Statistics
          </h3>
          <p className="mb-8">
            An overview showing the statistics of {coin?.name}, such as the base
            and quote currency, the rank, and trading volume.
          </p>
          {stats.map(({ icon, title, value }, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl md:text-3xl">{icon}</span>
                <h5>{title}</h5>
              </div>
              <h5 className="font-bold">{value}</h5>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mt-4 mb-2 font-medium">Other Stats Info</h3>
          <p className="mb-8">
            An overview showing the statistics of {coin?.name}, such as the base
            and quote currency, the rank, and trading volume.
          </p>
          {genericStats.map(({ icon, title, value }, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl md:text-3xl">{icon}</span>
                <h5>{title}</h5>
              </div>
              <h5 className="font-bold">{value}</h5>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">What is {coin?.name}?</h3>
        <div
          className={`prose relative overflow-hidden prose-h3:font-medium md:prose-xl ${
            isReadMore ? '' : 'h-36'
          }`}
        >
          {coin && HTMLReactParser(coin?.description)}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white ${
              isReadMore && 'hidden'
            }`}
          ></div>
        </div>
        {!isReadMore && (
          <button
            onClick={() => setIsReadMore(true)}
            className="w-full rounded bg-blue-100 p-2 text-xl font-medium text-blue-900"
          >
            Read More
          </button>
        )}
      </div>
    </main>
  );
};

export default CryptoDetails;
