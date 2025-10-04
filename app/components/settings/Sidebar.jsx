"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ activeTab, setActiveTab, tabs, onback }) {
  const router = useRouter();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 px-2 py-1.5 rounded-lg hover:bg-gray-50 w-fit text-sm font-medium"
      >
        <ChevronLeft size={16} className="text-gray-400" />
        Back
      </button>

      {/* Navigation */}
      <div className="space-y-1 flex-grow">
        {tabs.map((tab,x) => (
          <motion.button
            key={x}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === tab.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-gray-500">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">⚙️ Settings v1.1.1</p>
      </div>
    </aside>
  );
}
