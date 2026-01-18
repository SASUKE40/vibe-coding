type CodeBlockProps = {
  code: string;
  language: string;
  isLightMode?: boolean;
};

export function CodeBlock({ code, language, isLightMode }: CodeBlockProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className={`rounded-lg overflow-hidden shadow-2xl ${isLightMode ? "bg-gray-100" : "bg-gray-900"}`}>
        <div className={`flex items-center gap-2 px-4 py-2 border-b ${
          isLightMode ? "bg-gray-200 border-gray-300" : "bg-gray-800 border-gray-700"
        }`}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className={`ml-2 text-sm font-mono ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
            {language}
          </span>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className={`text-sm md:text-base lg:text-lg font-mono whitespace-pre ${
            isLightMode ? "text-gray-800" : "text-gray-100"
          }`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
