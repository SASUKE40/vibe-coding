type SlideProgressProps = {
  current: number;
  total: number;
  isLightMode?: boolean;
};

export function SlideProgress({ current, total, isLightMode }: SlideProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className={`h-1 ${isLightMode ? "bg-gray-200" : "bg-gray-800"}`}>
        <div
          className={`h-full bg-gradient-to-r transition-all duration-300 ease-out ${
            isLightMode ? "from-purple-600 to-pink-600" : "from-purple-500 to-pink-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`absolute bottom-4 right-4 text-sm font-mono ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
        {current} / {total}
      </div>
    </div>
  );
}
