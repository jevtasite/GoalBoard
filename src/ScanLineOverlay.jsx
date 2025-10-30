const ScanLineOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
      <div className="absolute w-full h-[2px] bg-white opacity-10 scan-line-animate" />
    </div>
  );
};

export default ScanLineOverlay;
