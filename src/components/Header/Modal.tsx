import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById('sidemenu') as HTMLElement
  );
};
