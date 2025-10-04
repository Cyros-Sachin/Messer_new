import { Card } from "../ui/card"
import { TrendingUp } from "lucide-react"

export function ProgressSection() {
  return (
    <Card className="p-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-neutral-600" />
        <h3 className="text-lg font-semibold">This Months Progress</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-600">To-do List Name</span>
            <span className="font-semibold">88%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-[88%] rounded-full bg-black" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-600">Goal Progress</span>
            <span className="font-semibold">28%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-[28%] rounded-full bg-black" />
          </div>
        </div>
      </div>
    </Card>
  )
}
