import axios from "axios";
// ✅ Import from the actual Redux slice

const BASE_URL = "https://datawheels.org";

import { Goal, Task } from "../features/calendar/calendarSlice"; // ✅ import both
import { getUserToken } from "../utils/auth";
type EventCategory = 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';

export const fetchGoalsAndTasks = async (userId: string, token: string): Promise<Goal[]> => {
  const res = await axios.get(`${BASE_URL}/api/goal/get_all_goals_based_task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const rawData = res.data;

  const colors = ["red", "blue", "green", "purple", "orange"];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const goals = Object.entries(rawData)
    .map(([key, taskArray]) => {
      try {
        const cleanKey = key.replace(/^\[|\]$/g, "");
        const [idStr, title,effort,effort_unit] = cleanKey.split(",");
        const goalId = idStr.trim();
        const tasks: Task[] = (taskArray as any[]).map(task => ({
          id: task.task_id.toString(),                // Required as string
          collective_id: task.collective_id.toString(),                // Required as string
          title: task.task_name,
          todo_id: task?.todo_id,
          goalId: task.goal_id.toString(),            // Required as string
          completed: false,                           // Default value since not in API
          color: getRandomColor(), 
          effort: task.effort,
          effort_unit : task.effort_unit                 // Generate or inherit from goal
        }));


        return {
          id: goalId,
          title,
          effort,
          effort_unit,
          color: getRandomColor(),
          tasks,
        };
      } catch (err) {
        console.error("Failed to parse goal key:", key, err);
        return null;
      }
    })
    .filter((g): g is Goal => g !== null); // ✅ now this is safe

  return goals;
};


export const fetchTodoItems = async (todoId: number, userId: string, token: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/get_latest_ten_versioned_todocontent_from_todo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todo_id: todoId
      })
    });
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch todos for task ${todoId}:`, err);
    throw err;
  }
};

export const fetchActionsForTasks = async (
  taskIds: string[],
  userId: string,
  token: string
): Promise<Record<string, any[]>> => {
  const actionsByTask: Record<string, any[]> = {};

  for (const taskId of taskIds) {
    const allActions: any[] = [];

    try {
      const res = await fetch(
        `${BASE_URL}/api/action/get_all_actions_based_task`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task_id: taskId, user_id: userId }), // include userId if required
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        const filtered = data.filter(
          (action) => !(action.validity_flag && action.validity_flag === "expired")
        );
        allActions.push(...filtered);
      }
    } catch (err) {
      console.error(`Failed to fetch actions for task ${taskId}`, err);
    }

    actionsByTask[taskId] = allActions;
  }

  return actionsByTask;
};


// Helper to parse "20/11/2025 00:00"
export function parseCustomDateTime(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [dd, mm, rest] = dateStr.split('/');
  if (!rest) return null;
  const [yyyy, hhmm] = rest.split(' ');
  const [hh, min] = hhmm?.split(':') ?? [];

  const parsed = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min));
  return isNaN(parsed.getTime()) ? null : parsed;
}

export async function fetchEvents(userId: string, collectiveId: string) {
  const response = await fetch(`${BASE_URL}/api/activity/get_generic_trigger_activity`,{
            method:"POST",
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              pa_id : 33,
              collective_id : collectiveId
            })
          });
  if (!response.ok) throw new Error("Failed to fetch action events");
  return response.json();
}

