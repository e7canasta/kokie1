import type { CareActivity, TimeRangeTab, WellnessDataItem } from "../types/resident.types";

// Datos de actividades por rango de tiempo
export const careActivitiesByTimeRange: Record<TimeRangeTab, CareActivity[]> = {
    "Last 24h": [
        {activity: "Meals", initiated: "30 min", uninitiated: "16 min", total: "46 min"},
        {activity: "Toileting", initiated: "23 min", uninitiated: "0 min", total: "23 min"},
        {activity: "Transferring", initiated: "0 min", uninitiated: "23 min", total: "23 min"},
        {activity: "Medication", initiated: "0 min", uninitiated: "17 min", total: "17 min"},
        {activity: "Dressing", initiated: "0 min", uninitiated: "15 min", total: "15 min"},
    ],
    "Last 7 Days": [
        {activity: "Meals", initiated: "4.2h", uninitiated: "2.1h", total: "6.3h"},
        {activity: "Toileting", initiated: "2.5h", uninitiated: "0.5h", total: "3.0h"},
        {activity: "Transferring", initiated: "1.2h", uninitiated: "2.8h", total: "4.0h"},
        {activity: "Medication", initiated: "0.8h", uninitiated: "1.5h", total: "2.3h"},
        {activity: "Dressing", initiated: "0.5h", uninitiated: "1.8h", total: "2.3h"},
    ],
    "Last 30 Days": [
        {activity: "Meals", initiated: "18.5h", uninitiated: "9.2h", total: "27.7h"},
        {activity: "Toileting", initiated: "10.8h", uninitiated: "2.1h", total: "12.9h"},
        {activity: "Transferring", initiated: "5.2h", uninitiated: "12.5h", total: "17.7h"},
        {activity: "Medication", initiated: "3.5h", uninitiated: "6.8h", total: "10.3h"},
        {activity: "Dressing", initiated: "2.1h", uninitiated: "8.2h", total: "10.3h"},
    ],
};

// Mantener compatibilidad con código existente
export const careActivities: CareActivity[] = careActivitiesByTimeRange["Last 24h"];

export const wellnessData: WellnessDataItem[] = [
    {label: "Falls", current: "3 falls", previous: "0 falls", hasArrow: true},
    {label: "Alert Activity", current: "32 / day", previous: "18 / day", hasArrow: true},
    {label: "Care Hours", current: "72 min / day", previous: "42 min / day", hasArrow: true},
];

export interface StaticResidentData {
    name: string;
    dob: string;
    room: string;
    unit: string;
    wellness: {
        trend: "Low" | "Medium" | "High";
        previousTrend: "Low" | "Medium" | "High";
    };
    avatarGradient: string;
}

export const resident: StaticResidentData = {
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

export const timeRangeTabs: TimeRangeTab[] = ["Last 24h", "Last 7 Days", "Last 30 Days"];
