'use client';

import { useState, type FC } from 'react';
import RequestTourModal from './RequestTourModal';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons: FC<ActionButtonsProps> = ({ className = '' }) => {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Contact Us */}
     <Link to='/ContactUs'><button
        className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
      >
        Contact Us
      </button> </Link> 

      {/* Get a Tour - Primary Button, opens popup instead of navigating */}
      <button
        type="button"
        onClick={() => setTourOpen(true)}
        className="px-6 py-2.5 text-sm font-semibold text-white bg-gray-500 mx-5 hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        Get a Tour
      </button>

      <RequestTourModal open={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
};

export default ActionButtons;