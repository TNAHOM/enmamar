import { notFound } from "next/navigation";
import Link from "next/link";
import { getChallenge } from "@/data/challenges";
import ChallengeIDE from "@/components/practice/ChallengeIDE";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function PracticeChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = getChallenge(id);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to challenges
        </Link>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Problem description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    challenge.difficulty === "advanced"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Level {challenge.level} · {challenge.difficulty}
                </span>
              </div>
              <h1 className="font-heading text-xl font-bold text-slate-800 mb-3">
                {challenge.title}
              </h1>
              <p className="text-slate-600 text-sm mb-4">
                {challenge.description}
              </p>
              <div className="prose prose-sm prose-slate max-w-none">
                <h3 className="font-semibold text-slate-800 text-sm mb-2">
                  Instructions
                </h3>
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap border border-slate-100">
                  {challenge.instructions}
                </pre>
                <h3 className="font-semibold text-slate-800 text-sm mt-4 mb-2">
                  Test cases
                </h3>
                <p className="text-slate-600 text-sm">
                  {challenge.testCases.length}+ test cases covering edge cases.
                  Run your code to see results.
                </p>
              </div>
            </div>
          </div>

          {/* IDE */}
          <div className="lg:col-span-8">
            <ChallengeIDE challenge={challenge} />
          </div>
        </div>
      </div>
    </div>
  );
}
