import React from "react";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { Link } from "react-router";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
function Problems() {
  const problems = Object.values(PROBLEMS);
  const easyProblem = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblem = problems.filter(
    (p) => p.difficulty === "Medium",
  ).length;
  const hardProblem = problems.filter((p) => p.difficulty === "Hard").length;
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-amber-50/90">
            Practice Problems
          </h1>
          <p className="text-base-content">
            Sharpen your coding skills with these curated problems
          </p>
        </div>
        {/* Problems */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="card bg-neutral/10 hover:scale-[1.01] transition-transform"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-neutral flex items-center justify-center">
                        <Code2Icon className="size-6" />
                      </div>
                      <div className="flex1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{problem.title}</h2>
                          <span
                            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-sm test-base-content">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                    <p className="mb-3">{problem.description.text}</p>
                  </div>
                  {/* Rigth */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 card bg-neutral/10 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblem}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblem}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblem}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problems;
