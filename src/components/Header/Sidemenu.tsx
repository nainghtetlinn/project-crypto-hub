import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

type SidemenuProps = { isOpen: boolean; close: () => void };

export const Sidemenu: React.FC<SidemenuProps> = ({ isOpen, close }) => {
  return (
    <Modal>
      <>
        <div
          onClick={close}
          className={`absolute inset-0 z-40 bg-gray-900/70 transition-opacity duration-300 md:hidden ${
            isOpen ? '' : 'pointer-events-none opacity-0'
          }`}
        ></div>
        <div
          className={`absolute inset-y-0 z-50 w-3/4 max-w-xs bg-blue-900 transition-transform duration-300 md:hidden ${
            isOpen ? '' : '-translate-x-full'
          }`}
        >
          <h3 className="m-4 text-center font-medium text-white">CryptoHub</h3>
          <ul className="border-t-2 border-t-white">
            <li>
              <Link
                className="inline-block w-full p-2 text-white hover:bg-blue-400"
                to={'/'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="inline-block w-full p-2 text-white hover:bg-blue-400"
                to={'/cryptocurrencies'}
              >
                Cryptocurrencies
              </Link>
            </li>
            <li>
              <Link
                className="inline-block w-full p-2 text-white hover:bg-blue-400"
                to={'/about'}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </>
    </Modal>
  );
};
