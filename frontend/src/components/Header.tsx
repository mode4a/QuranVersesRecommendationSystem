import React from "react";
import { BookOpenText } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <BookOpenText className="w-8 h-8 text-emerald-500" />
            <h1 className="text-xl md:text-2xl font-semibold text-emerald-400 text-center">
              Quranic Guidance
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
