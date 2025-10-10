"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { SquareCheck, Pencil, Trash2, Flag } from "lucide-react";
import { it } from "node:test";
import { getUserId, getUserToken } from "../utils/auth";
import { templates } from "../utils/templates";

const API_BASE_URL = "https://datawheels.org";

type ActivityItem = {
  a_id: number;
  at_id: number;
  name: string;
  flag: string;
  trigger: string;
  ua_id?: number;
};

type UnitOption = {
  unit_id?: number;
  cat_id?: number;
  name: string;
  Selected?: boolean;
  flag?: string;
  item_type?: string;
};

type MWBEntry = {
  action_id?: number | "None";
  ua_id: number;
  a_id: number;
  at_id: number;
  flag: string;
  trigger: string;
  user_id: string;
  description: string;
  cat_qty_id1?: number | "None";
  cat_qty_id2?: number | "None";
  cat_qty_id3?: UnitOption[];
  cat_qty_id4?: number | "None";
  cat_qty_id5?: number | "None";
  cat_qty_id6?: number | "None";
  value1: string;
  value2: string;
  value3: string | number;
  value4: string;
  value5: string;
  value6: string;
};

type Props = {
  userId: string;
  collectiveId: number;
  activityItems: ActivityItem[];
  realCollectiveId?: number;
  refreshTrigger?: number;
};

export default function DynamicActivityDetails({ userId, realCollectiveId, collectiveId, activityItems, refreshTrigger }: Props) {
  const [dataMap, setDataMap] = useState<Record<number, MWBEntry[]>>({});
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [templateMap, setTemplateMap] = useState<Record<number, any>>({});
  const SearchableField = ({
    trigger,
    label,
    value,
    onSelect,
  }: {
    trigger: string;
    label: string;
    value: string;
    onSelect: (selectedName: string, selectedItem?: any) => void;
  }) => {
    const [search, setSearch] = useState(value);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
      if (!search) {
        setSuggestions([]);
        return;
      }
      const timeout = setTimeout(async () => {
        try {
          const isFood = trigger.toLowerCase().includes("food") || trigger.toLowerCase().includes("meal");
          const url = isFood
            ? `${API_BASE_URL}/api/meal/food-items/search/${search}`
            : `${API_BASE_URL}/api/workout/exercise/search/${search}`;

          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${getUserToken()}` },
          });
          const data = await res.json();
          setSuggestions(data);
        } catch (e) {
          console.error("Search failed", e);
        }
      }, 300);

      return () => clearTimeout(timeout);
    }, [search, trigger]);

    return (
      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search..."
        />
        {suggestions.length > 0 && (
          <ul className="border bg-white max-h-40 overflow-y-auto shadow rounded mt-1 text-sm z-10">
            {suggestions.map((s: any, i: number) => (
              <li
                key={i}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setSearch(s.name);
                  onSelect(s.name, s);
                  setSuggestions([]);
                }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const fetchAll = async () => {
    setLoading(true);
    const result: Record<number, MWBEntry[]> = {};
    const templateUpdates: Record<number, any> = {};

    // ✅ Step 1: Build unique normalized a_id set safely
    const normalizedAids = activityItems.map((item) => (item.a_id === 26 ? 24 : item.a_id));
    const uniqueAids = Array.from(new Set(normalizedAids));

    console.log("Unique a_ids to fetch:", uniqueAids);

    try {
      for (const a_id of uniqueAids) {
        // ✅ Step 2: Skip unwanted conditions early
        if ((a_id === 24 || a_id === 25) && realCollectiveId) continue;

        const correctCollectiveId = (a_id === 29 || a_id === 33) ? realCollectiveId : collectiveId;

        console.log(`${a_id}: Called`); // 🟢 This should now log only once per a_id

        try {
          // ✅ Step 3: Fetch only once per a_id
          const res = await fetch(`${API_BASE_URL}/api/activity/get_generic_trigger_activity`, {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
              'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
              pa_id: a_id,
              collective_id: Number(correctCollectiveId)
            })
          });

          const json = await res.json();
          const entriesArray = json ? Object.values(json) as MWBEntry[] : [];

          // ✅ Step 4: Custom filters
          let filteredEntries = entriesArray;
          if (a_id === 29) {
            filteredEntries = entriesArray.filter((entry) => entry.cat_qty_id1 === collectiveId);
          }

          if ([30, 31, 32].includes(a_id)) {
            const resActions = await fetch(`${API_BASE_URL}/api/action/get_all_actions_based_task`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${getUserToken()}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ task_id: collectiveId })
            });

            const actions = await resActions.json();
            const filteredActions = actions.filter(
              (a: any) => a.action_type === a_id && !a.action_log_id
            );

            const mappedEntries: MWBEntry[] = [];
            result[a_id] = mappedEntries;
            templateUpdates[a_id] = templates[a_id] || {};
            continue;
          }

          result[a_id] = filteredEntries;
          templateUpdates[a_id] = templates[a_id] || {};

        } catch (err) {
          console.error(`Error fetching data for pa_id ${a_id}`, err);
          result[a_id] = [];
        }
      }

      // ✅ Step 5: Batch updates once
      setTemplateMap((prev) => ({ ...prev, ...templateUpdates }));
      setDataMap(result);

    } catch (error) {
      console.error("Unexpected error in fetchAll:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchAll();
    }
  }, [refreshTrigger]);
  
  const updatePrimaryMWBData = async (payload: any) => {
    const response = await fetch(`${API_BASE_URL}/api/activity/update_delete_trigger_activity`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Failed with status ${response.status}`);
    return await response.json();
  };

  const getFlagByAID = (a_id: number): string => {
    if ([9].includes(a_id)) return "PN";
    if ([30, 31, 32, 33].includes(a_id)) return "PT";
    if (a_id === 24) return "P";
    if ([29, 12, 13, 14, 15, 16, 17, 18, 19, 25, 28].includes(a_id)) return "PH";
    return ""; // default fallback
  };

  const handleUpdateItem = async (item: MWBEntry) => {
    try {
      const getCollectiveId = (list: unknown): number | undefined => {
        return Array.isArray(list) ? list[0]?.collective_id : undefined;
      };
      const event_time = new Date().toISOString().slice(0, 19);
      const getCatId = (list: unknown, i: number): number | undefined => {
        if (!Array.isArray(list)) return undefined;
        return editedValues[`unit${i}`]
          ? Number(editedValues[`unit${i}`])
          : list.find((u: any) => u?.flag === "selected")?.cat_id;
      };

      const getUnitId = (list: unknown, i: number): number | undefined => {
        if (!Array.isArray(list)) return undefined;
        return editedValues[`unit${i}`]
          ? Number(editedValues[`unit${i}`])
          : list.find((u: any) => u?.flag === "selected" || u?.Selected)?.unit_id;
      };

      let payload: any = {
        ua_id: item.ua_id,
        a_id: item.a_id,
        at_id: item.at_id,
        flag: item.flag,
        trigger: item.trigger,
        is_active: true,
        user_id: userId,
        description: editedValues.value2 || item.description || "",
        action: "UPDATE",
      };
      if (item.a_id === 10) {
        payload = {
          ...payload,
          trigger: item.trigger ?? "meal",
          cat_qty_id1: getCollectiveId(item.cat_qty_id1),
          cat_qty_id2: getCatId(item.cat_qty_id2, 2),
          cat_qty_id3: getCatId(item.cat_qty_id3, 3),
          cat_qty_id4: getUnitId(item.cat_qty_id4, 4),
          cat_qty_id5: getCatId(item.cat_qty_id5, 5),
          cat_qty_id6: getCatId(item.cat_qty_id6, 6),
          value1: editedValues.value1 ?? item.value1 ?? "",
          value2: editedValues.value2 ?? item.value2 ?? "",
          value3: editedValues.value3 ?? item.value3 ?? "",
          value4: editedValues.value4 ?? item.value4 ?? "",
          value5: editedValues.value5 ?? item.value5 ?? "",
          value6: editedValues.value6 ?? item.value6 ?? "",
        };
      } else {
        payload = {
          ...payload,
          flag: getFlagByAID(item.a_id),
          cat_qty_id1: item.cat_qty_id1 ?? null,
          cat_qty_id2:
            Number(editedValues.unit2) ||
            (Array.isArray(item.cat_qty_id2)
              ? item.cat_qty_id2.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
              : item.cat_qty_id2 ?? null),

          cat_qty_id3:
            Number(editedValues.unit3) ||
            (Array.isArray(item.cat_qty_id3)
              ? item.cat_qty_id3.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
              : item.cat_qty_id3 ?? null),

          cat_qty_id4:
            Number(editedValues.unit4) ||
            (Array.isArray(item.cat_qty_id4)
              ? item.cat_qty_id4.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
              : item.cat_qty_id4 ?? null),

          cat_qty_id5:
            Number(editedValues.unit5) ||
            (Array.isArray(item.cat_qty_id5)
              ? item.cat_qty_id5.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
              : item.cat_qty_id5 ?? null),

          cat_qty_id6:
            Number(editedValues.unit6) ||
            (Array.isArray(item.cat_qty_id6)
              ? item.cat_qty_id6.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
              : item.cat_qty_id6 ?? null),

          value1: editedValues.value1 ?? item.value1 ?? "",
          value2: editedValues.value2 ?? item.value2 ?? "",
          value3: editedValues.value3 ?? item.value3 ?? "",
          value4: editedValues.value4 ?? item.value4 ?? "",
          value5: editedValues.value5 ?? item.value5 ?? "",
          value6: editedValues.value6 ?? item.value6 ?? "",
        };
      }
      if ([30, 31, 32].includes(item.a_id)) {
        payload.at_id = 302;
        payload.cat_qty_id1 = item.action_id;
        payload.action_timestamp = event_time;
        payload.event_time = event_time;
        payload.cat_qty_id2 = Array.isArray(item.cat_qty_id2)
          ? item.cat_qty_id2.find((u: any) => u?.Selected || u?.flag === "selected")?.cat_id ?? null
          : item.cat_qty_id2 ?? null;

        payload.cat_qty_id3 = Array.isArray(item.cat_qty_id3)
          ? item.cat_qty_id3.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
          : item.cat_qty_id3 ?? null;

        payload.cat_qty_id4 = Array.isArray(item.cat_qty_id4)
          ? item.cat_qty_id4.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id ?? null
          : item.cat_qty_id4 ?? null;

        payload.cat_qty_id5 = Array.isArray(item.cat_qty_id5)
          ? (Number(editedValues.unit5) || item.cat_qty_id5.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id) ?? null
          : item.cat_qty_id5 ?? null;

        payload.cat_qty_id6 = Array.isArray(item.cat_qty_id6)
          ? (Number(editedValues.unit6) || item.cat_qty_id6.find((u: any) => u?.Selected || u?.flag === "selected")?.unit_id) ?? null
          : item.cat_qty_id6 ?? null;

        payload.is_active = "Y";
        const values = [
          editedValues.value1,
          editedValues.value2,
          editedValues.value3,
          editedValues.value4,
          editedValues.value5,
          editedValues.value6,
        ];
        const quantities = [
          editedValues.unit1,
          editedValues.unit2,
          editedValues.unit3,
          editedValues.unit4,
          editedValues.unit5,
          editedValues.unit6,
        ];
        if (item.a_id === 30) {
          // Case: One-time datetime
          payload.by_datetime_value = values[3] || "";
        }

        if (item.a_id === 31) {
          const selectedDayCatId = Number(quantities[3]); // cat_id 76–82
          payload.cat_qty_id4 = selectedDayCatId;
          const selectedTime = values[4]; // "HH:mm"

          const dayNameMap: Record<number, number> = {
            76: 1, 77: 2, 78: 3, 79: 4, 80: 5, 81: 6, 82: 0,
          };

          const targetDayIndex = dayNameMap[selectedDayCatId];

          if (!isNaN(targetDayIndex) && /^\d{2}:\d{2}$/.test(selectedTime)) {
            const now = new Date();
            const currentDay = now.getDay();

            const [hourStr, minStr] = selectedTime.split(":");
            const selectedHour = Number(hourStr);
            const selectedMin = Number(minStr);

            let daysUntilTarget = (targetDayIndex - currentDay + 7) % 7;

            const targetDate = new Date(now);
            targetDate.setDate(now.getDate() + daysUntilTarget);
            targetDate.setHours(selectedHour);
            targetDate.setMinutes(selectedMin);
            targetDate.setSeconds(0);
            targetDate.setMilliseconds(0);

            if (daysUntilTarget === 0 && targetDate < now) {
              targetDate.setDate(targetDate.getDate() + 7);
            }

            // Local ISO string to avoid UTC conversion issues
            const year = targetDate.getFullYear();
            const month = String(targetDate.getMonth() + 1).padStart(2, '0');
            const date = String(targetDate.getDate()).padStart(2, '0');
            const hours = String(targetDate.getHours()).padStart(2, '0');
            const minutes = String(targetDate.getMinutes()).padStart(2, '0');

            payload.by_datetime_value = `${year}-${month}-${date}T${hours}:${minutes}`;
          }

          else {
            console.warn("⚠️ Weekly recurrence missing or invalid time/day");
          }
        }

        if (item.a_id === 32) {
          payload.cat_qty_id4 = 39;
          payload.cat_qty_id3 = 23;
          const selectedDay = Number(values[3]); // day of month
          const selectedTime = values[4];

          if (selectedDay && /^\d{2}:\d{2}$/.test(selectedTime)) {
            const now = new Date();
            let targetMonth = now.getMonth();
            let targetYear = now.getFullYear();

            if (selectedDay <= now.getDate()) {
              targetMonth++;
              if (targetMonth > 11) {
                targetMonth = 0;
                targetYear++;
              }
            }

            const targetDate = new Date(targetYear, targetMonth, selectedDay);
            const [hourStr, minStr] = selectedTime.split(":");
            targetDate.setHours(Number(hourStr));
            targetDate.setMinutes(Number(minStr));
            targetDate.setSeconds(0);
            targetDate.setMilliseconds(0);

            const yyyy = targetDate.getFullYear();
            const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
            const dd = String(targetDate.getDate()).padStart(2, "0");
            const hh = String(targetDate.getHours()).padStart(2, "0");
            const min = String(targetDate.getMinutes()).padStart(2, "0");

            payload.by_datetime_value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
          } else {
            console.warn("⚠️ Monthly recurrence missing or invalid day/time");
          }
        }
      }
      if (item.a_id === 10) {
        // --- Get selected values ---
        const selectedDayCatId = Number(getCatId(item.cat_qty_id2, 2));  // item_id2 → day category
        const selectedHourInput = Number(editedValues.value4 ?? item.value4); // item_id4 → hour
        const selectedUnit = Number(getUnitId(item.cat_qty_id4, 4));      // item_id4 → 20=24HR, 21=AM, 22=PM

        // --- Validate inputs ---
        if (isNaN(selectedDayCatId) || isNaN(selectedHourInput) || isNaN(selectedUnit)) {
          console.error("Invalid input for a_id 10");
          return;
        }

        // --- Convert to 24-hour format ---
        let selectedHour = selectedHourInput;

        if (selectedUnit === 22) { // PM
          if (selectedHour < 12) selectedHour += 12;
        } else if (selectedUnit === 21) { // AM
          if (selectedHour === 12) selectedHour = 0;
        }
        // 24HR (20) → no change

        // --- Map day category → JS day index (0=Sun, 6=Sat) ---
        const dayNameMap: Record<number, number> = {
          76: 1, 77: 2, 78: 3, 79: 4,
          80: 5, 81: 6, 82: 0
        };
        const targetDayIndex = dayNameMap[selectedDayCatId];
        if (targetDayIndex === undefined) {
          console.error("Invalid day category ID:", selectedDayCatId);
          return;
        }

        // --- Calculate nearest date for selected day ---
        const now = new Date();
        const currentDayIndex = now.getDay();
        let daysUntilTarget = targetDayIndex - currentDayIndex;
        if (daysUntilTarget < 0 || (daysUntilTarget === 0 && selectedHour <= now.getHours())) {
          daysUntilTarget += 7;
        }

        const targetLocal = new Date(now);
        targetLocal.setDate(now.getDate() + daysUntilTarget);
        targetLocal.setHours(selectedHour, 0, 0, 0);

        // --- Convert local → UTC dynamically based on user's timezone ---
        payload.by_datetime_value = targetLocal.toISOString().slice(0, 16);

      }
      // console.log(payload);
      await updatePrimaryMWBData(payload);
      setEditingItemId(null);
      await fetchAll();
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  const handleDeleteItem = async (item: MWBEntry) => {
    try {
      const payload = {
        ua_id: item.ua_id,
        a_id: item.a_id,
        at_id: item.at_id,
        flag: item.flag,
        action: "DELETE",
        cat_qty_id1: item.cat_qty_id1
      };
      if (item.a_id === 29 || item.a_id === 28 || item.a_id === 25) {
        payload.flag = "PH";
      }
      if (item.a_id === 10) {
        payload.cat_qty_id1 = collectiveId;
      }
      if (item.a_id === 33) {
        payload.flag = "PT";
      }
      if (item.a_id === 29 || item.a_id === 30 || item.a_id === 31 || item.a_id === 32) {
        payload.at_id = 302;
      }
      if (item.a_id === 30 || item.a_id === 31 || item.a_id === 32) {
        payload.cat_qty_id1 = item.action_id;
      }
      await updatePrimaryMWBData(payload);
      setEditingItemId(null);
      await fetchAll();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };
  const stableActivityItems = useMemo(
    () => JSON.stringify(activityItems),
    [activityItems]
  );

  const didRunOnce = useRef(false);

  useEffect(() => {
    if (didRunOnce.current) return; // 🛑 skip second StrictMode run
    didRunOnce.current = true;

    if (!userId || !collectiveId || !activityItems?.length) return;
    fetchAll();
  }, [userId, collectiveId, stableActivityItems]);

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 animate-pulse space-y-4"
          >
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {activityItems.map((item) => {
        const itemData = Array.isArray(dataMap[item.a_id]) ? dataMap[item.a_id] : [];
        if (itemData.length === 0) return null;
        // Check if any entry inside itemData has at least one non-empty value
        const hasValidEntry = itemData.some((entry) => {
          for (let i = 1; i <= 6; i++) {
            const val = entry[`value${i}` as keyof MWBEntry];
            const unitList = entry[`cat_qty_id${i}` as keyof MWBEntry];
            const selectedUnit = Array.isArray(unitList)
              ? unitList.find((u: any) => u?.Selected || u?.flag === "selected")
              : null;
            if ((val !== "" && val !== undefined && val !== null) || selectedUnit) {
              return true;
            }
          }
          return false;
        });

        // If all entries are empty, skip rendering this whole activity section
        if (!hasValidEntry) return null;

        return (
          <div key={item.a_id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center">
              <h3 className="text-md font-semibold text-gray-800 p-4 border-b border-gray-100">
                {item.name}
              </h3>
            </div>
            <div className="space-y-3 p-4">
              {itemData.map((entry, index) => {
                const isEditing = editingItemId === entry.ua_id;
                const indices = entry.a_id === 13
                  ? [1, 2, 3, 4, 6]
                  : [30, 31, 32, 33].includes(entry.a_id)
                    ? [1, 3, 4, 5, 6] // ⛔️ skip 2 (Repeat)
                    : [1, 2, 3, 4, 5, 6];


                const renderFields = indices.flatMap((i) => {
                  const value = entry[`value${i}` as keyof MWBEntry];
                  const unitList = entry[`cat_qty_id${i}` as keyof MWBEntry];
                  const aId = entry.a_id;
                  const isAid10 = aId === 10;

                  if (isAid10 && [2, 3, 5, 6].includes(i)) {
                    const options = Array.isArray(unitList) ? unitList : [];
                    const selectedOption = options.find((u: any) => u?.Selected || u?.flag === "selected");

                    const labelMap: Record<number, string> = {
                      2: "Day of the Week",
                      3: "Meal Type",
                      5: "Person(s) with whom food was consumed",
                      6: "Activity done while eating food",
                    };

                    return (
                      <div key={`val${i}`} className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">{labelMap[i]}</label>
                        {isEditing ? (
                          <select
                            value={editedValues[`unit${i}`] ?? String(selectedOption?.cat_id || "")}
                            onChange={(e) =>
                              setEditedValues((prev) => ({ ...prev, [`unit${i}`]: e.target.value }))
                            }
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select</option>
                            {options
                              .filter((opt) => opt?.cat_id)
                              .map((opt, idx) => (
                                <option key={idx} value={opt.cat_id}>
                                  {opt.name}
                                </option>
                              ))}
                          </select>
                        ) : (
                          <input
                            value={selectedOption?.name || ""}
                            readOnly
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
                          />
                        )}
                      </div>
                    );
                  }
                  if (aId === 31 && i === 4 && isEditing) {
                    const options = Array.isArray(unitList) ? unitList : [];
                    const selectedOption = options.find((u: any) => u?.Selected || u?.flag === "selected");

                    return (
                      <div key={`val${i}`} className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Days in week</label>
                        <select
                          value={editedValues[`unit${i}`] ?? String(selectedOption?.cat_id || "")}
                          onChange={(e) =>
                            setEditedValues((prev) => ({ ...prev, [`unit${i}`]: e.target.value }))
                          }
                          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          {options
                            .filter((opt) => opt?.cat_id)
                            .map((opt, idx) => (
                              <option key={idx} value={opt.cat_id}>
                                {opt.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    );
                  }

                  const options = Array.isArray(unitList) ? unitList : [];
                  const selectedUnit = options.find((u: any) => u?.Selected || u?.flag === "selected" || u?.name === "mm/dd/yyyy HH:mm");
                  const isUnitField = !!selectedUnit?.unit_id || i === 4;
                  const displayValue =
                    value && value !== "None"
                      ? value
                      : selectedUnit?.name || "";

                  const unitValue = selectedUnit?.name;
                  const isarea = displayValue.toString().includes("\n");

                  if (!displayValue && !unitValue) return [];
                  const isSearch = (item.a_id === 9 && i === 2);
                  return (
                    <div key={`val${i}`} className={`grid ${unitValue ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">
                          {(templateMap[aId]?.[`item_id${i}`]?.[0]?.item_name ||
                            templateMap[aId]?.[`item_id${i}`]?.[0]?.item_description ||
                            `Field ${i}`)
                            .replace(/^add\s+/i, "")
                            .replace(/\bbased on.*$/i, "")
                            .replace(/^None$/i, "Name")
                            .trim()}
                        </label>

                        {isEditing ? (
                          isSearch ? (
                            <SearchableField
                              key={`search-${i}`}
                              trigger={"food"} // optional: dynamic based on field
                              label=""
                              value={editedValues[`value${i}`] ?? String(displayValue ?? "")}
                              onSelect={(val, selectedItem) =>
                                setEditedValues((prev) => ({
                                  ...prev,
                                  [`value${i}`]: val,
                                }))
                              }
                            />
                          ) : isarea ? (
                            <textarea
                              value={editedValues[`value${i}`] ?? String(displayValue ?? "")}
                              onChange={(e) =>
                                setEditedValues((prev) => ({
                                  ...prev,
                                  [`value${i}`]: e.target.value,
                                }))
                              }
                              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm min-h-[100px]"
                            />
                          ) : (
                            <>
                              {(() => { //this block for the datetime 
                                const unitName = selectedUnit?.name?.toLowerCase() || "";
                                const rawValue = editedValues[`value${i}`] ?? String(displayValue ?? "");

                                const toInputFormat = (val: string, type: string) => {
                                  if (!val) return "";

                                  if (type === "date") {
                                    const [dd, mm, yyyy] = val.split("/");
                                    return `${yyyy}-${mm}-${dd}`;
                                  }

                                  if (type === "time") {
                                    return val.length === 5 ? val : val.slice(0, 5);
                                  }

                                  if (type === "datetime-local") {
                                    let datePart = "", timePart = "";
                                    if (val.includes("T")) {
                                      [datePart, timePart] = val.split("T");
                                    } else if (val.includes(" ")) {
                                      [datePart, timePart] = val.split(" ");
                                    }
                                    if (!datePart || !timePart) return "";
                                    let dd = "", mm = "", yyyy = "";
                                    if (datePart.includes("/")) {
                                      [dd, mm, yyyy] = datePart.split("/");
                                    } else {
                                      [yyyy, mm, dd] = datePart.split("-");
                                    }
                                    const [h, m] = timePart.split(":");
                                    return `${yyyy}-${mm}-${dd}T${h}:${m}`;
                                  }

                                  return val;
                                };

                                const fromInputFormat = (val: string, type: string) => {
                                  if (!val) return "";

                                  if (type === "date") {
                                    const [yyyy, mm, dd] = val.split("-");
                                    return `${dd}/${mm}/${yyyy}`;
                                  }

                                  if (type === "time") {
                                    return val;
                                  }

                                  if (type === "datetime-local") {
                                    const [date, time] = val.split("T");
                                    const [yyyy, mm, dd] = date.split("-");
                                    return `${yyyy}-${mm}-${dd}T${time}`;
                                  }

                                  return val;
                                };

                                let inputType: "text" | "date" | "time" | "datetime-local" = "text";

                                if (unitName.includes("mm/dd/yyyy") && unitName.includes("hh:mm")) {
                                  inputType = "datetime-local";
                                } else if (unitName.includes("dd/mm/yyyy")) {
                                  inputType = "date";
                                } else if (unitName.includes("hh:mm")) {
                                  inputType = "time";
                                }

                                return (
                                  <input
                                    type={inputType}
                                    value={toInputFormat(rawValue, inputType)}
                                    onChange={(e) =>
                                      setEditedValues((prev) => ({
                                        ...prev,
                                        [`value${i}`]: fromInputFormat(e.target.value, inputType),
                                      }))
                                    }
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                  />
                                );
                              })()}
                            </>
                          )
                        ) : isarea ? (
                          <textarea
                            value={String(displayValue ?? "")}
                            readOnly
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 min-h-[100px]"
                          />
                        ) : (
                          <input
                            value={String(displayValue ?? "")}
                            readOnly
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
                          />
                        )}
                      </div>


                      {unitValue && selectedUnit?.unit_id && (
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-500">Unit</label>
                          {isEditing ? (
                            <select
                              value={editedValues[`unit${i}`] ?? String(selectedUnit?.unit_id || selectedUnit?.cat_id || "")}
                              onChange={(e) => { setEditedValues((prev) => ({ ...prev, [`unit${i}`]: e.target.value })); console.log(e.target.value) }
                              }
                              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">Unit</option>
                              {options
                                .filter((opt) => opt?.unit_id)
                                .map((opt, idx) => (
                                  <option key={idx} value={opt.unit_id}>
                                    {opt.name}
                                  </option>
                                ))}
                            </select>
                          ) : (
                            <input
                              value={unitValue}
                              readOnly
                              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                });
                const goalmeta = (item.a_id === 24);
                if (renderFields.length === 0) return null;
                return (
                  <div
                    key={`${entry.a_id}-${index}`}
                    className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-xs"
                  >
                    {renderFields}

                    <div className="flex justify-end">
                      {isEditing ? (<div className="flex justify-end items-center gap-2 mt-2">
                        <button
                          className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1 px-3 py-1 rounded-md hover:bg-green-50"
                          onClick={() => handleUpdateItem(entry)}
                        >
                          <SquareCheck className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                        {!goalmeta && <button
                          className="p-1 rounded hover:bg-red-50"
                          onClick={() => handleDeleteItem(entry)}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                        </button>}

                      </div>

                      ) : (
                        <button
                          className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-50"
                          onClick={() => {
                            setEditingItemId(entry.ua_id);
                            const ev: Record<string, string> = {};
                            for (let i = 1; i <= 6; i++) {
                              ev[`value${i}`] = String(entry[`value${i}` as keyof MWBEntry] ?? "");
                            }
                            setEditedValues(ev);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}