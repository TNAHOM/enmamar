"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests,
} from "@codesandbox/sandpack-react";
import { Challenge } from "@/data/challenges";
import { getTestFileContent } from "@/data/challengeTests";

interface ChallengeIDEProps {
  challenge: Challenge;
}

export default function ChallengeIDE({ challenge }: ChallengeIDEProps) {
  const files = {
    "/add.ts": {
      code: challenge.starterCode,
    },
    "/add.test.ts": {
      code: getTestFileContent(challenge),
    },
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <SandpackProvider
        template="test-ts"
        theme="light"
        files={files}
        customSetup={{
          dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "@testing-library/react": "^14.0.0",
            "@testing-library/jest-dom": "^6.0.0",
          },
        }}
        options={{
          activeFile: "/add.ts",
          visibleFiles: ["/add.ts"],
          editorHeight: 360,
          editorWidthPercentage: 50,
          showTabs: true,
          showLineNumbers: true,
        }}
      >
        <SandpackLayout className="!flex-row">
          <SandpackCodeEditor
            style={{ minHeight: 340 }}
            showLineNumbers
            showTabs
          />
          <div className="flex flex-col min-h-[300px] border-l border-slate-200">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 text-sm font-medium">
              <TerminalIcon />
              Test Results
            </div>
            <SandpackTests
              verbose={true}
              watchMode={true}
              hideTestsAndSupressLogs={false}
              className="flex-1 overflow-auto"
            />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

function TerminalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
