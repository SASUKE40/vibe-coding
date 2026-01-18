"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type CodeBlockProps = {
  code: string;
  language: string;
  isLightMode?: boolean;
  showLineNumbers?: boolean;
  className?: string;
};

export function CodeBlock({
  code,
  language,
  isLightMode = false,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageMap: Record<string, string> = {
    typescript: "typescript",
    ts: "typescript",
    javascript: "javascript",
    js: "javascript",
    tsx: "tsx",
    jsx: "jsx",
    json: "json",
    html: "html",
    css: "css",
    bash: "bash",
    shell: "bash",
  };

  const syntaxLanguage = languageMap[language.toLowerCase()] || language;

  return (
    <motion.div
      className={cn("w-full max-w-4xl", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "rounded-lg overflow-hidden shadow-2xl border",
          isLightMode
            ? "bg-gray-50 border-gray-200"
            : "bg-gray-900 border-gray-800"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2 border-b",
            isLightMode
              ? "bg-gray-100 border-gray-200"
              : "bg-gray-800 border-gray-700"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Window controls */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {/* Language badge */}
            <span
              className={cn(
                "text-xs font-mono px-2 py-0.5 rounded",
                isLightMode
                  ? "bg-gray-200 text-gray-600"
                  : "bg-gray-700 text-gray-400"
              )}
            >
              {language}
            </span>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all",
              isLightMode
                ? "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            )}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={syntaxLanguage}
            style={isLightMode ? oneLight : oneDark}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              background: "transparent",
              fontSize: "0.875rem",
              lineHeight: "1.7",
            }}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: isLightMode ? "#9ca3af" : "#6b7280",
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
}
