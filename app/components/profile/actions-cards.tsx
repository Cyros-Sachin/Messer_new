import { Card } from "../ui/card"
import { User, Settings, Link } from "lucide-react"

export function ActionCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-6 transition-shadow hover:shadow-md">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <User className="h-5 w-5 text-neutral-600" />
        </div>
        <h3 className="mb-2 font-semibold">Edit Profile</h3>
        <p className="text-sm text-neutral-600">Update your personal information and preferences</p>
      </Card>

      <Card className="p-6 transition-shadow hover:shadow-md">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <Settings className="h-5 w-5 text-neutral-600" />
        </div>
        <h3 className="mb-2 font-semibold">Settings</h3>
        <p className="text-sm text-neutral-600">Manage notifications, privacy and app preferences</p>
      </Card>

      <Card className="p-6 transition-shadow hover:shadow-md">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <Link className="h-5 w-5 text-neutral-600" />
        </div>
        <h3 className="mb-2 font-semibold">Connected Apps</h3>
        <p className="text-sm text-neutral-600">Link your trackers to bring all your data together.</p>
      </Card>
    </div>
  )
}
