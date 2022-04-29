import React from 'react';
import millify from 'millify';
import {
  BsBuilding,
  BsCoin,
  BsShop,
  BsDroplet,
  BsCurrencyYen,
} from 'react-icons/bs';

import { Stats } from './Stats';

interface CryptoGlobalStatsProps {
  cryptoStats: any;
}

const option = { space: true, precision: 2 };

export const CryptoGlobalStats: React.FC<CryptoGlobalStatsProps> = ({
  cryptoStats = {},
}) => {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Stats
        title="Crypto market cap"
        value={`$ ${millify(cryptoStats?.totalMarketCap, option)}`}
        icon={<BsCurrencyYen />}
      />
      <Stats
        title="24h volume"
        value={`$ ${millify(cryptoStats?.total24hVolume)}`}
        icon={<BsDroplet />}
      />
      <Stats
        icon={<BsCoin />}
        title="All coins"
        value={cryptoStats?.totalCoins}
      />
      <Stats
        icon={<BsBuilding />}
        title="All crypto exchanges"
        value={cryptoStats?.totalExchanges}
      />
      <Stats
        icon={<BsShop />}
        title="All crypto markets"
        value={cryptoStats?.totalMarkets}
      />
    </div>
  );
};
