import React, { useState, useRef } from 'react';

interface NestedDropdownMenuProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const NestedDropdownMenu: React.FC<NestedDropdownMenuProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef} onMouseLeave={handleMouseLeave}>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className="absolute left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{zIndex: 10}}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="menuitem" tabIndex={-1}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export { NestedDropdownMenu };