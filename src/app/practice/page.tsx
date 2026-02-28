import Link from "next/link";
import { challenges } from "@/data/challenges";
import { Code2, ChevronRight, Zap } from "lucide-react";

export const metadata = {
  title: "React Practice | Enmamar",
  description: "LeetCode-style React coding challenges for intermediate developers",
};

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            React Practice
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Level up your React skills with 20 challenges for intermediate to advanced developers (1–3 years exp). 
            Write code, run tests, and see results in the terminal.
          </p>
        </div>

        <div className="grid gap-3">
          {challenges.map((c) => (
            <Link
              key={c.id}
              href={`/practice/${c.id}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  c.difficulty === "advanced"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-500">
                    Level {c.level}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      c.difficulty === "advanced"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {c.difficulty}
                  </span>
                </div>
                <h2 className="font-heading font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                  {c.title}
                </h2>
                <p className="text-sm text-slate-500 truncate">{c.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-12 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-800">How it works</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>• Write your solution in the IDE</li>
                <li>• Click &quot;Run Tests&quot; to execute test cases</li>
                <li>• View pass/fail results and errors in the terminal</li>
                <li>• Input sizes are capped (max ~100) for quick feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
