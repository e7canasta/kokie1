/**
 * Mock Data - Residents
 * Datos de prueba basados en el servidor mock actual
 */

import type { Resident } from '../../../care/halo/types/resident.types';

export const mockResidents: Resident[] = [
  // ── Room 201 · Memory Care (4 beds) ──
  {
    id: 1,
    name: "Margaret Chen",
    dob: "June 15, 1947",
    room: "201",
    bed: "A",
    unit: "Memory Care",
    age: 78,
    wellness: { trend: "Medium", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
    image: "https://i.pravatar.cc/150?img=1",
    starred: true,
  },
  {
    id: 2,
    name: "Robert Williams",
    dob: "March 22, 1943",
    room: "201",
    bed: "B",
    unit: "Memory Care",
    age: 82,
    wellness: { trend: "Low", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #5C6BC0, #3F51B5)",
    image: "https://i.pravatar.cc/150?img=2",
    starred: true,
  },
  {
    id: 3,
    name: "Helen Davis",
    dob: "Nov 3, 1948",
    room: "201",
    bed: "C",
    unit: "Memory Care",
    age: 76,
    wellness: { trend: "High", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #AB47BC, #7B1FA2)",
    image: "https://i.pravatar.cc/150?img=9",
    starred: false,
  },
  {
    id: 4,
    name: "Richard Moore",
    dob: "Feb 18, 1939",
    room: "201",
    bed: "D",
    unit: "Memory Care",
    age: 85,
    wellness: { trend: "Medium", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #EF5350, #C62828)",
    image: "https://i.pravatar.cc/150?img=10",
    starred: false,
  },
];

export const mockWellnessData = [
  { label: "Mood", current: "Good", previous: "Fair", icon: "😊" },
  { label: "Sleep", current: "7h", previous: "6.5h", icon: "😴" },
  { label: "Activity", current: "Active", previous: "Moderate", icon: "🚶" },
  { label: "Appetite", current: "Normal", previous: "Reduced", icon: "🍽️" },
];

export const mockTopCare = [
  { title: "Medication", description: "Blood pressure medication at 8:00 AM", done: true },
  { title: "Physical Therapy", description: "Session at 10:30 AM", done: false },
  { title: "Doctor Visit", description: "General checkup scheduled", done: false },
];

export const mockResidentWithDetails = {
  ...mockResidents[0],
  wellnessData: mockWellnessData,
  topCare: mockTopCare,
};
