// context/SettingsContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserToken } from "@/app/utils/auth";

const SettingsContext = createContext<any>(null);

export const SettingsProvider = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("https://datawheels.org/api/setting/get_general_setting", {
          headers: { Authorization: `Bearer ${getUserToken()}` },
        });
        const data = await res.json();
        if (res.ok && data?.success) setSettings(data.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return { settings, loading };
};

// hook to access settings anywhere
export const useSettings = () => useContext(SettingsContext);
