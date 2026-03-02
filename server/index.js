import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const residents = [
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
  // ── Room 202 · Memory Care (4 beds) ──
  {
    id: 5,
    name: "Dorothy Martinez",
    dob: "September 8, 1949",
    room: "202",
    bed: "A",
    unit: "Memory Care",
    age: 75,
    wellness: { trend: "High", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #66BB6A, #388E3C)",
    image: "https://i.pravatar.cc/150?img=3",
    starred: true,
  },
  {
    id: 6,
    name: "James Anderson",
    dob: "December 1, 1937",
    room: "202",
    bed: "B",
    unit: "Memory Care",
    age: 88,
    wellness: { trend: "Medium", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #FFA726, #F57C00)",
    image: "https://i.pravatar.cc/150?img=4",
    starred: true,
  },
  {
    id: 7,
    name: "Patricia Taylor",
    dob: "July 20, 1953",
    room: "202",
    bed: "C",
    unit: "Memory Care",
    age: 71,
    wellness: { trend: "Low", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #8D6E63, #5D4037)",
    image: "https://i.pravatar.cc/150?img=5",
    starred: false,
  },
  {
    id: 8,
    name: "Michael Brown",
    dob: "April 10, 1945",
    room: "202",
    bed: "D",
    unit: "Memory Care",
    age: 79,
    wellness: { trend: "Medium", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #42A5F5, #1565C0)",
    image: "https://i.pravatar.cc/150?img=6",
    starred: false,
  },
  // ── Room 203 · Assisted Living (4 beds) ──
  {
    id: 9,
    name: "Susan Clark",
    dob: "Jan 28, 1951",
    room: "203",
    bed: "A",
    unit: "Assisted Living",
    age: 73,
    wellness: { trend: "High", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #EC407A, #AD1457)",
    image: "https://i.pravatar.cc/150?img=7",
    starred: false,
  },
  {
    id: 10,
    name: "Thomas White",
    dob: "Aug 5, 1943",
    room: "203",
    bed: "B",
    unit: "Assisted Living",
    age: 81,
    wellness: { trend: "Low", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #78909C, #455A64)",
    image: "https://i.pravatar.cc/150?img=8",
    starred: false,
  },
  {
    id: 11,
    name: "Barbara Hall",
    dob: "May 12, 1955",
    room: "203",
    bed: "C",
    unit: "Assisted Living",
    age: 69,
    wellness: { trend: "High", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #26A69A, #00796B)",
    image: "https://i.pravatar.cc/150?img=11",
    starred: false,
  },
  {
    id: 12,
    name: "William Lee",
    dob: "Oct 30, 1950",
    room: "203",
    bed: "D",
    unit: "Assisted Living",
    age: 74,
    wellness: { trend: "Medium", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #7E57C2, #4527A0)",
    image: "https://i.pravatar.cc/150?img=12",
    starred: false,
  },
  // ── Room 204 · Assisted Living (4 beds) ──
  {
    id: 13,
    name: "Elizabeth Turner",
    dob: "March 14, 1946",
    room: "204",
    bed: "A",
    unit: "Assisted Living",
    age: 79,
    wellness: { trend: "Medium", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #FF7043, #D84315)",
    image: "https://i.pravatar.cc/150?img=13",
    starred: false,
  },
  {
    id: 14,
    name: "George Harris",
    dob: "Nov 22, 1940",
    room: "204",
    bed: "B",
    unit: "Assisted Living",
    age: 84,
    wellness: { trend: "Low", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #5C6BC0, #283593)",
    image: "https://i.pravatar.cc/150?img=14",
    starred: false,
  },
  {
    id: 15,
    name: "Mary Robinson",
    dob: "Aug 9, 1952",
    room: "204",
    bed: "C",
    unit: "Assisted Living",
    age: 72,
    wellness: { trend: "High", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #4DB6AC, #00796B)",
    image: "https://i.pravatar.cc/150?img=15",
    starred: false,
  },
  {
    id: 16,
    name: "Frank Walker",
    dob: "June 3, 1938",
    room: "204",
    bed: "D",
    unit: "Assisted Living",
    age: 86,
    wellness: { trend: "Low", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #A1887F, #6D4C41)",
    image: "https://i.pravatar.cc/150?img=16",
    starred: false,
  },
];

const wellnessData = [
  { label: "Mood", current: "Good", previous: "Fair", icon: "😊" },
  { label: "Sleep", current: "7h", previous: "6.5h", icon: "😴" },
  { label: "Activity", current: "Active", previous: "Moderate", icon: "🚶" },
  { label: "Appetite", current: "Normal", previous: "Reduced", icon: "🍽️" },
];

const topCare = [
  { title: "Medication", description: "Blood pressure medication at 8:00 AM", done: true },
  { title: "Physical Therapy", description: "Session at 10:30 AM", done: false },
  { title: "Doctor Visit", description: "General checkup scheduled", done: false },
];

app.get('/api/residents', (req, res) => {
  res.json(residents);
});

app.get('/api/residents/:id', (req, res) => {
  const resident = residents.find(r => r.id === parseInt(req.params.id));
  if (!resident) return res.status(404).json({ error: "Resident not found" });
  res.json({ ...resident, wellnessData, topCare });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
