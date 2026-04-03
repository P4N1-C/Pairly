import { useUser } from "@clerk/react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-base-200 rounded-2xl y flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
              </div>
              <h1 className="text-5xl font-black text-amber-50 bg-clip-text ">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-xl text-base-content ml-16">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-8 py-4 bg-gradient-to-r from-neutral/90 to-neutral/50 rounded-2xl transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <ZapIcon className="w-6 h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
