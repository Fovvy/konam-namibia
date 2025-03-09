'use client';

import React from 'react';
import Image from 'next/image';

interface SelectableCardProps {
  image: string;
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onClick: () => void;
  id?: string; // Optional id, not used directly in the component
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  image,
  title,
  subtitle,
  isSelected,
  onClick,
  // id is intentionally not destructured as it's not used
}) => {
  return (
    <div 
      onClick={onClick}
      className={`selectable-card ${isSelected ? 'active' : ''}`}
    >
      <div className="selectable-card-inner">
        <div className="selectable-card-box">
          <div className="selectable-imgBox">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="selectable-icon">
            <h3>{title}</h3>
            <div className="selectable-checkmark"></div>
          </div>
        </div>
      </div>
      {subtitle && (
        <div className="p-3">
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default SelectableCard;
