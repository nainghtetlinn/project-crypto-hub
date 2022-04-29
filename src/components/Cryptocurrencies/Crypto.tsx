import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';

import { checkColor } from '../../utils/checkColor';

interface CryptoProps {
  coin: any;
}

export const Crypto: React.FC<CryptoProps> = ({ coin }) => {
  return (
    <tr className="grid grid-cols-12 border-b py-2">
      <td className="col-span-6 md:col-span-5">
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-sm sm:text-base md:text-lg">{coin.rank}</span>
          <img src={coin.iconUrl} alt={coin.name} className="w-8 md:w-10" />
          <div>
            <Link
              className="text-sm underline hover:text-blue-500 sm:text-base md:text-lg"
              to={`/cryptocurrencies/${coin.uuid}`}
            >
              {coin.name}
            </Link>
            <h6 className="text-gray-600">{coin.symbol}</h6>
          </div>
        </div>
      </td>
      <td className="col-span-3 md:col-span-2">
        <div>
          <h5 className="font-medium">
            $
            {Number(coin.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h5>
          <h6 className="text-gray-600 md:hidden">
            $
            {millify(Number(coin.marketCap), {
              space: true,
              precision: 2,
            })}
          </h6>
        </div>
      </td>
      <td className="hidden md:col-span-3 md:block">
        <h5 className="font-medium">
          ${' '}
          {millify(Number(coin.marketCap), {
            space: true,
            precision: 2,
          })}
        </h5>
      </td>
      <td className="col-span-3 md:col-span-2">
        <h5 className={`${checkColor(coin.change)}`}>
          {coin.change > 0 ? '+' : ''}
          {coin.change}%
        </h5>
      </td>
    </tr>
  );
};
