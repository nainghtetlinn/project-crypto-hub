import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

import { Modal } from './Modal';

type SidemenuProps = { isOpen: boolean; close: () => void };

export const Sidemenu: React.FC<SidemenuProps> = ({ isOpen, close }) => {
  const navigate = useNavigate();

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
          className={`absolute inset-y-0 z-50 w-3/5 max-w-[280px] bg-white transition-transform duration-300 md:hidden ${
            isOpen ? '' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center bg-blue-900">
            <button onClick={close} className="m-2 p-2 text-xl text-white">
              <AiOutlineClose />
            </button>
            <h3 className="text-white">CryptoHub</h3>
          </div>
          <ul className="mt-6 p-2">
            <li
              onClick={() => {
                close();
                navigate('/');
              }}
              className="w-full cursor-pointer p-2 text-blue-900 hover:bg-blue-300"
            >
              Home
            </li>
            <li
              onClick={() => {
                close();
                navigate('/cryptocurrencies');
              }}
              className="w-full cursor-pointer p-2 text-blue-900 hover:bg-blue-300"
            >
              Cryptocurrencies
            </li>
            <li
              onClick={() => {
                close();
                navigate('/about');
              }}
              className="w-full cursor-pointer p-2 text-blue-900 hover:bg-blue-300"
            >
              About
            </li>
          </ul>
        </div>
      </>
    </Modal>
  );
};
