"use client";

import { useEffect, useState, useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { getUserToken } from "@/app/utils/auth";
import settingsTemplate from "@/app/utils/response.json";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    appearance: "1",
    language: "1",
    date_format: "ISO",
    time_format: "24H",
    timezone_via_location: "0",
    timezone: "258",
    cookie_setting: "1",
    support_access: "1",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; title: string; description: string; type: "success" | "error" }[]
  >([]);

  // ✅ Custom Toast Creator
  const showToast = (title: string, description: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  // ✅ Debounce helper
  const debounce = (fn: Function, delay = 500) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // ✅ Fetch current user settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("https://datawheels.org/api/setting/get_general_setting", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        } else {
          showToast("Failed to load settings", data?.message || "Could not fetch your settings.", "error");
        }
      } catch (err) {
        console.error("Settings fetch error:", err);
        showToast("Network Error", "Unable to connect while fetching settings.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Debounced API update call
  const updateSettingsAPI = useCallback(
    debounce(async (updated: any) => {
      try {
        setSaving(true);
        const res = await fetch("https://datawheels.org/api/setting/update_general_setting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
          body: JSON.stringify(updated),
        });

        const data = await res.json();

        if (res.ok) {
          showToast("✅ Settings Updated", "Your preferences have been saved successfully.", "success");
        } else {
          console.warn("⚠️ Save failed:", data);
          showToast(
            "⚠️ Save Failed",
            data?.message || "Something went wrong while saving.",
            "error"
          );
        }
      } catch (err) {
        console.error("Settings update error:", err);
        showToast("🌐 Network Error", "Unable to connect while saving settings.", "error");
      } finally {
        setSaving(false);
      }
    }, 500),
    []
  );



  // ✅ Handle any setting change
  const handleChange = (key: string, value: string | boolean) => {
    const updated = {
      ...settings,
      [key]: typeof value === "boolean" ? (value ? "1" : "0") : value,
    };
    setSettings(updated);
    updateSettingsAPI(updated);
  };

  if (loading) {
    return (
      <div className="space-y-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-6 border-b border-border animate-pulse">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 w-32 bg-gray-300 rounded"></div>
      </div>
    ))}
  </div>
    );
  }

  return (
    <main className="flex-1 p-12 relative">
      <div className="max-w-full space-y-1">
        <div className="flex items-center justify-between border-b border-border py-3">
          <h2 className="text-2xl font-semibold text-foreground">General</h2>
        </div>

        {/* Appearance */}
        <SettingRow
          title="Appearance"
          desc="Customize how the app looks on your device."
          options={settingsTemplate.apperance}
          value={settings.appearance}
          onChange={(v) => handleChange("appearance", v)}
        />

        {/* Language */}
        <SettingRow
          title="Language"
          desc="Change the language used in the interface."
          options={settingsTemplate.language}
          value={settings.language}
          onChange={(v) => handleChange("language", v)}
        />
        <div className="flex items-center justify-between mt-5 border-b border-border py-3">
          <h2 className="text-2xl font-semibold text-foreground">Date & Time</h2>
        </div>
        {/* Date Format */}
        <SettingRow
          title="Date Format"
          desc="Changes how dates appear throughout the app."
          options={settingsTemplate.date_format}
          value={settings.date_format}
          onChange={(v) => handleChange("date_format", v)}
        />

        {/* Time Format */}
        <SettingRow
          title="Time Format"
          desc="Switch between 24-hour or 12-hour format."
          options={settingsTemplate.time_format}
          value={settings.time_format}
          onChange={(v) => handleChange("time_format", v)}
        />

        {/* Auto Timezone */}
        <SettingSwitch
          title="Set timezone automatically using your location"
          desc="Reminders, notifications, and emails are delivered based on your time zone."
          value={settings.timezone_via_location === "1"}
          onChange={(v) => handleChange("timezone_via_location", v)}
        />

        {/* Timezone */}
        <SettingRow
          title="Timezone"
          desc="Select your current timezone."
          options={settingsTemplate.timezone}
          value={settings.timezone}
          onChange={(v) => handleChange("timezone", v)}
        />
        <div className="flex items-center justify-between mt-5 border-b border-border py-3">
          <h2 className="text-2xl font-semibold text-foreground">Privacy</h2>
        </div>
        {/* Cookie Settings */}
        <SettingRow
          title="Cookie Setting"
          desc="Customize cookie behavior."
          options={settingsTemplate.cookie_setting}
          value={settings.cookie_setting}
          onChange={(v) => handleChange("cookie_setting", v)}
        />

        {/* Support Access */}
        <SettingSwitch
          title="Support Access"
          desc="Grant support temporary access to your account for troubleshooting."
          value={settings.support_access === "1"}
          onChange={(v) => handleChange("support_access", v)}
        />
      </div>

      {/* ✅ Custom Toast Container */}
      <div className="fixed bottom-6 right-6 space-y-3 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`w-80 px-4 py-3 rounded-lg shadow-lg border text-sm animate-slideIn 
              ${t.type === "success"
                ? "bg-green-600 text-white border-green-700"
                : "bg-red-600 text-white border-red-700"}`}
          >
            <div className="font-semibold">{t.title}</div>
            <div className="text-white/90">{t.description}</div>
          </div>
        ))}
      </div>

      {/* ✅ Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.35s ease-out;
        }
      `}</style>
    </main>
  );
}

/* ---------- UI Subcomponents ---------- */

function SettingRow({
  title,
  desc,
  options,
  value,
  onChange,
}: {
  title: string;
  desc: string;
  options: Record<string, string>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-start justify-between py-3 ">
      <div className="flex-1">
        <h3 className="text-base font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[260px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SettingSwitch({
  title,
  desc,
  value,
  onChange,
}: {
  title: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1">
        <h3 className="text-base font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
