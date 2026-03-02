export const careActivities = [
    {activity: "Meals", initiated: "30 min", uninitiated: "16 min", total: "46 min"},
    {activity: "Toileting", initiated: "23 min", uninitiated: "0 min", total: "23 min"},
    {activity: "Transferring", initiated: "0 min", uninitiated: "23 min", total: "23 min"},
    {activity: "Medication", initiated: "0 min", uninitiated: "17 min", total: "17 min"},
    {activity: "Dressing", initiated: "0 min", uninitiated: "15 min", total: "15 min"},
];

export const wellnessData = [
    {label: "Falls", current: "3 falls", previous: "0 falls", hasArrow: true},
    {label: "Alert Activity", current: "32 / day", previous: "18 / day", hasArrow: true},
    {label: "Care Hours", current: "72 min / day", previous: "42 min / day", hasArrow: true},
];

export const resident = {
    name: "Robert Chen",
    dob: "June 3, 1943",
    room: "203",
    unit: "Memory Care",
    wellness: {
        trend: "Medium",
        previousTrend: "Low",
    },
    avatarGradient: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
};

export const timeRangeTabs = ["Last 24h", "Last 7 Days", "Last 30 Days"];