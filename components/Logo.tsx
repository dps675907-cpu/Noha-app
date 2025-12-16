
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "text-4xl" }) => {
  return (
    <div className={`font-extrabold tracking-tighter logo-gradient select-none cursor-pointer ${className}`}>
      NOHA
    </div>
  );
};

export default Logo;
