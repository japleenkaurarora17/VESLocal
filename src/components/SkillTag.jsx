import React from 'react';

export default function SkillTag({ skill, onClick, active }) {
  const baseStyle = "px-2.5 py-1 text-xs font-medium rounded transition-colors duration-150";
  const activeStyle = "bg-olive text-surface border border-olive";
  const inactiveStyle = "bg-surface text-dark border border-sand hover:border-olive";

  return (
    <span
      onClick={onClick}
      className={`${baseStyle} ${active ? activeStyle : inactiveStyle} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {skill}
    </span>
  );
}
