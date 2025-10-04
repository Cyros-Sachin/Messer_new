"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { getUserToken } from "@/app/utils/auth";

export default function GeneralSettings() {
  const [appearance, setAppearance] = useState("system");
  const [language, setLanguage] = useState("english");
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy");
  const [timeFormat, setTimeFormat] = useState("24h");
  const [autoTimezone, setAutoTimezone] = useState(false);
  const [timezone, setTimezone] = useState("san-diego");
  const [cookieSettings, setCookieSettings] = useState("customise");
  const [supportAccess, setSupportAccess] = useState(false);

  const [loading, setLoading] = useState(true);

  // Fetch or create general settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("https://datawheels.org/api/setting/get_general_setting", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`, // ✅ Correct format
          },
        });

        const data = await res.json();

        if (res.ok && data?.success && data?.settings) {
          const s = data.settings;
          setAppearance(s.appearance || "system");
          setLanguage(s.language || "english");
          setDateFormat(s.date_format || "dd-mm-yyyy");
          setTimeFormat(s.time_format || "24h");
          setAutoTimezone(s.timezone_via_location || false);
          setTimezone(s.timezone || "san-diego");
          setCookieSettings(s.cookie_setting || "customise");
          setSupportAccess(s.support_access || false);
        } else {
          // If not found, create new default settings
          await fetch("https://datawheels.org/api/setting/create_general_setting", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`, // ✅ Correct format
          },
            body: JSON.stringify({
              appearance : appearance,
              language : language,
              date_format: dateFormat,
              time_format: timeFormat,
              timezone_via_location: autoTimezone,
              timezone : timezone,
              cookie_setting: cookieSettings,
              support_access: supportAccess,
            }),
          });
        }
      } catch (err) {
        console.error("Settings fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Loading settings...
      </div>
    );
  }

  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">General Settings</h2>

        {/* Appearance */}
        <div className="flex items-start justify-between py-6 border-b border-border">
          <div className="flex-1">
            <h3 className="text-base font-medium text-foreground mb-1">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customise how MeSeer looks on your device.</p>
          </div>
          <Select value={appearance} onValueChange={setAppearance}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">Use System Setting</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="flex items-start justify-between py-6 border-b border-border">
          <div className="flex-1">
            <h3 className="text-base font-medium text-foreground mb-1">Language</h3>
            <p className="text-sm text-muted-foreground">Change the language used in the interface.</p>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date & Time */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">Date & Time</h2>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">Date Format</h3>
              <p className="text-sm text-muted-foreground">Changes how dates appear throughout the app.</p>
            </div>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">Time Format</h3>
              <p className="text-sm text-muted-foreground">Switch between 24h or AM/PM format.</p>
            </div>
            <Select value={timeFormat} onValueChange={setTimeFormat}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">13:00</SelectItem>
                <SelectItem value="12h">1:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">
                Set timezone automatically using your location
              </h3>
              <p className="text-sm text-muted-foreground">
                Reminders, notifications, and emails are delivered based on your time zone.
              </p>
            </div>
            <Switch checked={autoTimezone} onCheckedChange={setAutoTimezone} />
          </div>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">Timezone</h3>
              <p className="text-sm text-muted-foreground">Current timezone setting.</p>
            </div>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="san-diego">San Diego, CA, USA (GMT-7)</SelectItem>
                <SelectItem value="new-york">New York, NY, USA (GMT-4)</SelectItem>
                <SelectItem value="london">London, UK (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Privacy */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">Privacy</h2>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">Cookie settings</h3>
              <p className="text-sm text-muted-foreground">Customize cookies.</p>
            </div>
            <Select value={cookieSettings} onValueChange={setCookieSettings}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customise">Customise</SelectItem>
                <SelectItem value="accept-all">Accept All</SelectItem>
                <SelectItem value="reject-all">Reject All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start justify-between py-6 border-b border-border">
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">Support access</h3>
              <p className="text-sm text-muted-foreground">
                Grant MeSeer support temporary access to your account for troubleshooting. You can revoke access anytime.
              </p>
            </div>
            <Switch checked={supportAccess} onCheckedChange={setSupportAccess} />
          </div>
        </div>
      </div>
    </main>
  );
}
