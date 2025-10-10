// utils/templates.ts

export const templates: Record<number, any> = {
    9: {
        description:
            "{'info':'add food item', 'item_id1':{'get':'ui', 'attribute': 'meal_id'}, 'item_id2':{'get':'search', 'attribute':'food_db_id'}, 'item_id3':{'get':'backend', 'attribute':'food_quantity'}}",
        item_id1: [
            { item_id: "None", item_name: "None", name: "item_id doesn't exist" },
        ],
        item_id2: [
            {
                item_id: 0,
                item_name: "Food items",
                item_type: "food item Search or exercise Search",
            },
        ],
        item_id3: [
            {
                item_description: "add food quantity based on selected unit",
                item_id: "20",
                item_name: "food quantity",
                item_type: "unit",
            },
            { description: null, name: "kg", unit_id: 24 },
            { description: null, name: "ml", unit_id: 25 },
            { description: null, name: "gm", unit_id: 26 },
            { description: null, name: "unit", unit_id: 27 },
            { description: null, name: "slices", unit_id: 28 },
            { description: null, name: "cubes", unit_id: 29 },
            { description: null, name: "packets", unit_id: 30 },
            { description: null, name: "cup", unit_id: 31 },
            { description: null, name: "pinch", unit_id: 32 },
            { description: null, name: "clove", unit_id: 33 },
            { description: null, name: "ounces", unit_id: 34 },
            { description: null, name: "small sized", unit_id: 35 },
            { description: null, name: "medium sized", unit_id: 36 },
            { description: null, name: "large sized", unit_id: 37 },
            { description: null, name: "teaspoon", unit_id: 38 },
        ],
        item_id4: [
            { item_id: "None", item_name: "None", name: "item_id doesn't exist" },
        ],
        item_id5: [
            { item_id: "None", item_name: "None", name: "item_id doesn't exist" },
        ],
        item_id6: [
            { item_id: "None", item_name: "None", name: "item_id doesn't exist" },
        ],
        trigger: "food_item",
    },

    10: {
        description: "{'info': 'assign meal'}",
        item_id1: [
            { item_id: "None", item_name: "None", name: "item_id doesn't exist" },
        ],
        item_id2: [
            { item_description: "Days in week", item_id: "21", item_name: "Days", item_type: "category" },
            { cat_id: 76, name: "Monday" },
            { cat_id: 77, name: "Tuesday" },
            { cat_id: 78, name: "Wednesday" },
            { cat_id: 79, name: "Thursday" },
            { cat_id: 80, name: "Friday" },
            { cat_id: 81, name: "Saturday" },
            { cat_id: 82, name: "Sunday" },
        ],
        item_id3: [
            { item_description: "Type of meal such as breakfast, lunch, dinner", item_id: "29", item_name: "Meal type", item_type: "category" },
            { cat_id: 96, name: "breakfast" },
            { cat_id: 97, name: "lunch" },
            { cat_id: 98, name: "dinner" },
            { cat_id: 99, name: "snacks" },
            { cat_id: 100, name: "drinks" },
        ],
        item_id4: [
            { item_description: "time value", item_id: "13", item_name: "Time", item_type: "unit" },
            { name: "24 HR", unit_id: 20 },
            { name: "am", unit_id: 21 },
            { name: "pm", unit_id: 22 },
        ],
        item_id5: [
            { item_description: "Person(s) with whom food was consumed", item_id: "27", item_name: "Food companion", item_type: "category" },
            { cat_id: 90, name: "alone" },
            { cat_id: 91, name: "family" },
            { cat_id: 92, name: "partner" },
            { cat_id: 93, name: "friends" },
            { cat_id: 94, name: "colleagues" },
            { cat_id: 95, name: "date" },
        ],
        item_id6: [
            { item_description: "activity done while eating food", item_id: "26", item_name: "Food eating activity", item_type: "category" },
            { cat_id: 85, name: "Watching media" },
            { cat_id: 86, name: "Restaurant" },
            { cat_id: 87, name: "Socialize" },
            { cat_id: 88, name: "Conversation around table" },
            { cat_id: 89, name: "Occasion" },
        ],
        trigger: null,
    },
    12: {
        "description": "{'info':'exercise set'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Number of repetitions per set",
                "item_id": "37",
                "item_name": "reps",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id5": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    },
    13: {
        "description": "{'info':'exercise circuit reps'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of repetitions per set",
                "item_id": "37",
                "item_name": "reps",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id5": [
            {
                "cat_id": 0,
                "item_id": "0",
                "item_name": "Can be meal_id/workout_id/etc",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    },
    14: {
        "description": "{'info':'exercise circuit time'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Time spent exercising",
                "item_id": "44",
                "item_name": "exercise time",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "sec",
                "unit_id": 48
            },
            {
                "description": null,
                "name": "mins",
                "unit_id": 49
            }
        ],
        "item_id4": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    },
    15: {
        "description": "{'info':'warmup reps'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Number of repetitions per set",
                "item_id": "37",
                "item_name": "reps",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id5": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 16: {
        "description": "{'info':'cool down reps'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Number of repetitions per set",
                "item_id": "37",
                "item_name": "reps",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id5": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 17: {
        "description": "{'info':'warmup time'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Time spent exercising",
                "item_id": "44",
                "item_name": "exercise time",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "sec",
                "unit_id": 48
            },
            {
                "description": null,
                "name": "mins",
                "unit_id": 49
            }
        ],
        "item_id5": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 18: {
        "description": "{'info':'cool down time'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": 0,
                "item_name": "exercises",
                "item_type": "food item Search or exercise Search"
            }
        ],
        "item_id3": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id4": [
            {
                "item_description": "Time spent exercising",
                "item_id": "44",
                "item_name": "exercise time",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "sec",
                "unit_id": 48
            },
            {
                "description": null,
                "name": "mins",
                "unit_id": 49
            }
        ],
        "item_id5": [
            {
                "item_description": "Weight used during the activity",
                "item_id": "45",
                "item_name": "weight",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "kg",
                "unit_id": 50
            },
            {
                "description": null,
                "name": "lbs",
                "unit_id": 51
            },
            {
                "description": null,
                "name": "body weight",
                "unit_id": 52
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 19: {
        "description": "{'info':'number of repetitions of the circuit'}",
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "Number of sets",
                "item_id": "36",
                "item_name": "sets",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "number",
                "unit_id": 45
            }
        ],
        "item_id3": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id4": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 24: {
        "description": null,
        "item_id1": [
            {
                "cat_id": 0,
                "item_id": "0",
                "item_name": "Can be meal_id/workout_id/etc",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "Name or title for a given entity",
                "item_id": "38",
                "item_name": "name",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "text",
                "unit_id": 23
            }
        ],
        "item_id3": [
            {
                "item_description": "add a date",
                "item_id": "50",
                "item_name": "By date",
                "item_type": "unit"
            },
            {
                "description": "date selection",
                "name": "mm/dd/yyyy",
                "unit_id": 46
            },
            {
                "description": "date selection",
                "name": "dd/mm/yyyy",
                "unit_id": 47
            }
        ],
        "item_id4": [
            {
                "item_description": "effort needed to achieve the goal",
                "item_id": "51",
                "item_name": "Effort",
                "item_type": "unit"
            },
            {
                "description": "hour per day",
                "name": "hpd",
                "unit_id": 53
            },
            {
                "description": "hour per week",
                "name": "hpw",
                "unit_id": 54
            },
            {
                "description": "hour per month",
                "name": "hpm",
                "unit_id": 55
            }
        ],
        "item_id5": [
            {
                "item_description": "Percentage complete",
                "item_id": "52",
                "item_name": "Completed",
                "item_type": "unit"
            },
            {
                "description": "percentage",
                "name": "%",
                "unit_id": 2
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": "goal"
    }, 25: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "Clarification of what the goal/task is",
                "item_id": "47",
                "item_name": "what",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id3": [
            {
                "item_description": "Reason for doing the task or goal",
                "item_id": "48",
                "item_name": "Why",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id4": [
            {
                "item_description": "Method or process for achieving the tas",
                "item_id": "49",
                "item_name": "How",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 26: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "add a date",
                "item_id": "50",
                "item_name": "By date",
                "item_type": "unit"
            },
            {
                "description": "date selection",
                "name": "mm/dd/yyyy",
                "unit_id": 46
            },
            {
                "description": "date selection",
                "name": "dd/mm/yyyy",
                "unit_id": 47
            }
        ],
        "item_id3": [
            {
                "item_description": "effort needed to achieve the goal",
                "item_id": "51",
                "item_name": "Effort",
                "item_type": "unit"
            },
            {
                "description": "hour per day",
                "name": "hpd",
                "unit_id": 53
            },
            {
                "description": "hour per week",
                "name": "hpw",
                "unit_id": 54
            },
            {
                "description": "hour per month",
                "name": "hpm",
                "unit_id": 55
            }
        ],
        "item_id4": [
            {
                "item_description": "Percentage complete",
                "item_id": "52",
                "item_name": "Completed",
                "item_type": "unit"
            },
            {
                "description": "percentage",
                "name": "%",
                "unit_id": 2
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 27: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id3": [
            {
                "item_description": "Name or title for a given entity",
                "item_id": "38",
                "item_name": "name",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "text",
                "unit_id": 23
            }
        ],
        "item_id4": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": "task"
    }, 28: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "Clarification of what the goal/task is",
                "item_id": "47",
                "item_name": "what",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id3": [
            {
                "item_description": "Reason for doing the task or goal",
                "item_id": "48",
                "item_name": "Why",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id4": [
            {
                "item_description": "Method or process for achieving the tas",
                "item_id": "49",
                "item_name": "How",
                "item_type": "unit"
            },
            {
                "description": "",
                "name": "text",
                "unit_id": 44
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": null
    }, 29: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "add a date",
                "item_id": "50",
                "item_name": "By date",
                "item_type": "unit"
            },
            {
                "description": "date selection",
                "name": "mm/dd/yyyy",
                "unit_id": 46
            },
            {
                "description": "date selection",
                "name": "dd/mm/yyyy",
                "unit_id": 47
            }
        ],
        "item_id3": [
            {
                "item_description": "effort needed to achieve the goal",
                "item_id": "51",
                "item_name": "Effort",
                "item_type": "unit"
            },
            {
                "description": "hour per day",
                "name": "hpd",
                "unit_id": 53
            },
            {
                "description": "hour per week",
                "name": "hpw",
                "unit_id": 54
            },
            {
                "description": "hour per month",
                "name": "hpm",
                "unit_id": 55
            }
        ],
        "item_id4": [
            {
                "item_description": "Percentage complete",
                "item_id": "52",
                "item_name": "Completed",
                "item_type": "unit"
            },
            {
                "description": "percentage",
                "name": "%",
                "unit_id": 2
            }
        ],
        "item_id5": [
            {
                "cat_id": 0,
                "item_id": "57",
                "item_name": "Subspace of user",
                "name": "item_id new case arisen, contact backend"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": "['todo_creation','task_activity']"
    }, 30: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "",
                "item_id": "58",
                "item_name": "Repeat",
                "item_type": "category"
            },
            {
                "cat_id": 128,
                "description": null,
                "name": "Yes"
            },
            {
                "cat_id": 129,
                "description": null,
                "name": "No"
            }
        ],
        "item_id3": [
            {
                "item_description": "Name or title for a given entity",
                "item_id": "38",
                "item_name": "name",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "text",
                "unit_id": 23
            }
        ],
        "item_id4": [
            {
                "item_description": "add a date time",
                "item_id": "53",
                "item_name": "date time",
                "item_type": "unit"
            },
            {
                "description": "date selection",
                "name": "mm/dd/yyyy HH:mm",
                "unit_id": 58
            }
        ],
        "item_id5": [
            {
                "item_description": "duration of action",
                "item_id": "54",
                "item_name": "duration",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "mins",
                "unit_id": 56
            },
            {
                "description": null,
                "name": "hours",
                "unit_id": 57
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": "action"
    }, 31: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "item_description": "",
                "item_id": "58",
                "item_name": "Repeat",
                "item_type": "category"
            },
            {
                "cat_id": 128,
                "description": null,
                "name": "Yes"
            },
            {
                "cat_id": 129,
                "description": null,
                "name": "No"
            }
        ],
        "item_id3": [
            {
                "item_description": "Name or title for a given entity",
                "item_id": "38",
                "item_name": "name",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "text",
                "unit_id": 23
            }
        ],
        "item_id4": [
            {
                "item_description": "Days in week",
                "item_id": "21",
                "item_name": "Days",
                "item_type": "category"
            },
            {
                "cat_id": 76,
                "description": null,
                "name": "Monday"
            },
            {
                "cat_id": 77,
                "description": null,
                "name": "Tuesday"
            },
            {
                "cat_id": 78,
                "description": null,
                "name": "Wednesday"
            },
            {
                "cat_id": 79,
                "description": null,
                "name": "Thursday"
            },
            {
                "cat_id": 80,
                "description": null,
                "name": "Friday"
            },
            {
                "cat_id": 81,
                "description": null,
                "name": "Saturday"
            },
            {
                "cat_id": 82,
                "description": null,
                "name": "Sunday"
            }
        ],
        "item_id5": [
            {
                "item_description": "time of the day",
                "item_id": "55",
                "item_name": "time",
                "item_type": "unit"
            },
            {
                "description": "time",
                "name": "HH:mm",
                "unit_id": 59
            }
        ],
        "item_id6": [
            {
                "item_description": "duration of action",
                "item_id": "54",
                "item_name": "duration",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "mins",
                "unit_id": 56
            },
            {
                "description": null,
                "name": "hours",
                "unit_id": 57
            }
        ],
        "trigger": "action"
    }, 32: { "description": null, "item_id1": [{ "item_id": "None", "item_name": "None", "name": "item_id doesn't exist" }], "item_id2": [{ "item_description": "", "item_id": "58", "item_name": "Repeat", "item_type": "category" }, { "cat_id": 128.0, "description": null, "name": "Yes" }, { "cat_id": 129.0, "description": null, "name": "No" }], "item_id3": [{ "item_description": "Name or title for a given entity", "item_id": "38", "item_name": "name", "item_type": "unit" }, { "description": null, "name": "text", "unit_id": 23 }], "item_id4": [{ "item_description": "add number 1-31", "item_id": "56", "item_name": "day of month", "item_type": "unit" }, { "description": "The range of number starts from 1 to 10000", "name": "number", "unit_id": 39 }], "item_id5": [{ "item_description": "time of the day", "item_id": "55", "item_name": "time", "item_type": "unit" }, { "description": "time", "name": "HH:mm", "unit_id": 59 }], "item_id6": [{ "item_description": "duration of action", "item_id": "54", "item_name": "duration", "item_type": "unit" }, { "description": null, "name": "mins", "unit_id": 56 }, { "description": null, "name": "hours", "unit_id": 57 }], "trigger": "action" },
    33: {
        "description": null,
        "item_id1": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id2": [
            {
                "cat_id": 0,
                "item_id": "0",
                "item_name": "Can be meal_id/workout_id/etc",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id3": [
            {
                "item_description": "Name or title for a given entity",
                "item_id": "38",
                "item_name": "name",
                "item_type": "unit"
            },
            {
                "description": null,
                "name": "text",
                "unit_id": 23
            }
        ],
        "item_id4": [
            {
                "item_description": "add a date time",
                "item_id": "53",
                "item_name": "date time",
                "item_type": "unit"
            },
            {
                "description": "date selection",
                "name": "mm/dd/yyyy HH:mm",
                "unit_id": 58
            }
        ],
        "item_id5": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "item_id6": [
            {
                "item_id": "None",
                "item_name": "None",
                "name": "item_id doesn't exist"
            }
        ],
        "trigger": "event"
    }
};
