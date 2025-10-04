'use client';
import Sidebar from "../components/SideBar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ProfileHeader } from "../components/profile/profile-header"
import { StatCards } from "../components/profile/stat-cards"
import { ProgressSection } from "../components/profile/progress-section"
import { ActionCards } from "../components/profile/actions-cards"
export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Cookies.remove("token");
          Cookies.remove("userInfo");
          router.push("/login");
        }
      } catch (err) {
        Cookies.remove("token");
        Cookies.remove("userInfo");
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-max">
          <h1 className="mb-2 text-xl font-semibold">Profile</h1>
          <div className="space-y-4">
            <ProfileHeader />
            <StatCards />
            <ProgressSection />
            <ActionCards />
          </div>
        </div>
      </main>
    </div>

  );
}
