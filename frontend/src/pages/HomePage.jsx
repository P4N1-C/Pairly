import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/react";

function HomePage() {
  return (
    <div className="bg-base-100 min-h-screen">
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-base-100 flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl text-amber-50 font-mono tracking-wider">
                Pairly
              </span>
              <span className="text-xs text-base-content/90 font-medium -mt-1 font-mono">
                Code Together
              </span>
            </div>
          </Link>
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-neutral to-neutral/60 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="badge badge-neutral badge-lg text-blue-100">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
                Code Together
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>

            {/* Feature */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-neutral badge-outline">
                <CheckIcon className="size-4 text-success" />
                <span className="text-amber-50">Live Video Chat</span>
              </div>
              <div className="badge badge-neutral badge-outline">
                <CheckIcon className="size-4 text-success" />
                <span className="text-amber-50">Code Editor</span>
              </div>
              <div className="badge badge-neutral badge-outline">
                <CheckIcon className="size-4 text-success" />
                <span className="text-amber-50">Multi-Language</span>
              </div>
            </div>

            {/* cta */}
            <div className="flex flex-wrap gap-3">
              <SignInButton mode="modal">
                <button className="btn btn-neutral btn-lg">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>
              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* stats */}
            <div className="stats stats-vertical lg:stats-horizontal bg-neutral/20 shadow-lg">
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>
          <img
            src="/hero-2.png"
            alt="Pairly"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to know{" "}
            <span className="text-neutral font mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-control/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>
        {/* featuer grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-neutral/10 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-neutral/60 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content">
                Crystal clear video and audio for seamless communication during
                interviews
              </p>
            </div>
          </div>

          <div className="card bg-neutral/10 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-neutral/60 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </p>
            </div>
          </div>

          <div className="card bg-neutral/10 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-neutral/60 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
