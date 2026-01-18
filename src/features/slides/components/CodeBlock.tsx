import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";

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
        <SyntaxHighlighter
          language={language}
          style={isLightMode ? oneLight : oneDark}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "1rem",
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
