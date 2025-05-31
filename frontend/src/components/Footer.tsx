import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 shadow-inner">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Quranic Guidance. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            for the Ummah
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
