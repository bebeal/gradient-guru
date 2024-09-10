import React from 'react';
import { Icon } from '../Primitives/Icons/Icon';

interface CreditBadgeProps {
  text: string;
  link: string;
}

export const CreditBadge: React.FC<CreditBadgeProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-secondary bg-opacity-80 rounded px-2 py-1 text-xs text-primary shadow-md hover:bg-opacity-100 transition-all duration-200"
    >
      <Icon set="Logos" icon="Github" className="w-4 h-4 mr-1" />
      {text}
    </a>
  );
};
