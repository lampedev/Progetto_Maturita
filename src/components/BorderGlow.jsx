import './BorderGlow.css';

const BorderGlow = ({ children, className = '' }) => {
  return (
    <div className={`glow-border-wrapper ${className}`}>
      <div className="glow-border-content h-full">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
