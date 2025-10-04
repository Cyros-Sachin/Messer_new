import { Card } from "../ui/card"
import { CheckSquare, Target, Flame, List } from "lucide-react"

export function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <CheckSquare className="h-5 w-5 text-neutral-600" />
        </div>
        <div className="text-3xl font-bold">287</div>
        <div className="mt-1 text-sm text-neutral-600">Tasks Completed</div>
      </Card>

      <Card className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <Target className="h-5 w-5 text-neutral-600" />
        </div>
        <div className="text-3xl font-bold">8</div>
        <div className="mt-1 text-sm text-neutral-600">Ongoing Goals</div>
      </Card>

      <Card className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <Flame className="h-5 w-5 text-neutral-600" />
        </div>
        <div className="text-3xl font-bold">12</div>
        <div className="mt-1 text-sm text-neutral-600">Streak</div>
      </Card>

      <Card className="p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <List className="h-5 w-5 text-neutral-600" />
        </div>
        <div className="text-3xl font-bold">Finance</div>
        <div className="mt-1 text-sm text-neutral-600">Top Activity</div>
      </Card>
    </div>
  )
}
