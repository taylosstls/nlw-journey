import { ReactNode } from 'react';

interface ToastProps {
  children: ReactNode;
  visible: boolean;
}

export function Toast({ children, visible }: ToastProps) {
  return (
    <div
      className={`absolute text-xs px-3 py-1.5 pointer-events-none -bottom-5 -right-3.5 bg-lime-300 text-lime-950 rounded-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
      <div className="absolute bottom-full right-5 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-lime-300"></div>
    </div>
  );
}
