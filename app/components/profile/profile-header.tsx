import { getUserInfo } from "@/app/utils/auth"
import { Card } from "../ui/card"
import { Mail, MapPin, Calendar, Pencil } from "lucide-react"
import Cookies from "js-cookie";

export function ProfileHeader() {
  let data = null;
    try {
      const userInfoRaw = Cookies.get("userInfo");
      if (userInfoRaw) {
        data = JSON.parse(userInfoRaw);
      }
    } catch (err) {
      console.error("Failed to parse userInfo cookie:", err);
    }
  return (
    <Card className="p-8">
      <div className="flex items-start gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-red-700 text-3xl font-bold text-white">
          M
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {data.email}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              San Diego, USA
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined Mar 2025
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
            <span className="italic">Building better habits one day at a time</span>
            <Pencil className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Card>
  )
}
