import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const residents = [
  // ── Room 201 · Memory Care (4 beds) — CON CV ──
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
    hasCV: true,
    lastCVDetection: 5,
    triageScore: 55,
    triageReason: "recent-change", // Cambió de Low a Medium
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
    hasCV: true,
    lastCVDetection: 5,
    triageScore: 95,
    triageReason: "alert", // Low wellness + bajó de High
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
    hasCV: true,
    lastCVDetection: 5,
    triageScore: 20,
    triageReason: "assigned", // Estable, sin cambios
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
    hasCV: true,
    lastCVDetection: 5,
    triageScore: 25,
    triageReason: "assigned", // Estable
  },
  // ── Room 202 · Memory Care (4 beds) — SIN CV ──
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
    hasCV: false,
    triageScore: 60,
    triageReason: "next-in-round", // Starred = siguiente en ronda
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
    hasCV: false,
    triageScore: 65,
    triageReason: "next-in-round", // Starred = siguiente en ronda
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
    hasCV: false,
    triageScore: 90,
    triageReason: "alert", // Low wellness persistente
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
    hasCV: false,
    triageScore: 50,
    triageReason: "recent-change", // Mejoró de Low a Medium
  },
  // ── Room 203 · Assisted Living (4 beds) — CON CV ──
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
    hasCV: true,
    lastCVDetection: 12,
    triageScore: 15,
    triageReason: "assigned", // Estable, sin cambios
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
    hasCV: true,
    lastCVDetection: 12,
    triageScore: 85,
    triageReason: "alert", // Bajó a Low wellness
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
    hasCV: true,
    lastCVDetection: 12,
    triageScore: 45,
    triageReason: "recent-change", // Mejoró de Medium a High
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
    hasCV: true,
    lastCVDetection: 12,
    triageScore: 50,
    triageReason: "recent-change", // Bajó de High a Medium
  },
  // ── Room 204 · Assisted Living (4 beds) — SIN CV ──
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
    hasCV: false,
    triageScore: 48,
    triageReason: "recent-change", // Bajó de High a Medium
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
    hasCV: false,
    triageScore: 88,
    triageReason: "alert", // Low wellness persistente
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
    hasCV: false,
    triageScore: 18,
    triageReason: "assigned", // Estable, sin cambios
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
    hasCV: false,
    triageScore: 80,
    triageReason: "alert", // Bajó a Low wellness
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

// Sprint 3 (P2) - Toggle care activity done status
app.patch('/api/residents/:id/care-activities/:activityTitle', (req, res) => {
  const residentId = parseInt(req.params.id);
  const activityTitle = decodeURIComponent(req.params.activityTitle);
  const { done } = req.body;

  const resident = residents.find(r => r.id === residentId);
  if (!resident) {
    return res.status(404).json({ error: "Resident not found" });
  }

  // Find and update the activity in topCare
  const activity = topCare.find(a => a.title === activityTitle);
  if (!activity) {
    return res.status(404).json({ error: "Activity not found" });
  }

  activity.done = done;
  console.log(`[PATCH] Resident ${residentId} - ${activityTitle}: ${done ? 'completed' : 'pending'}`);

  // Return updated resident with topCare
  res.json({ ...resident, wellnessData, topCare });
});

// Sprint 1 (P0) - Quick Actions Endpoints

// In-memory storage para visits, notes, alerts
let visits = [];
let notes = [];
let alerts = [];

// POST /api/visits - Confirmar visita manual (para rooms sin CV)
app.post('/api/visits', (req, res) => {
  const { residentId, timestamp = new Date().toISOString() } = req.body;

  const resident = residents.find(r => r.id === parseInt(residentId));
  if (!resident) {
    return res.status(404).json({ error: "Resident not found" });
  }

  const visit = {
    id: visits.length + 1,
    residentId: parseInt(residentId),
    residentName: resident.name,
    room: resident.room,
    bed: resident.bed,
    timestamp,
    type: 'manual', // manual vs CV-detected
  };

  visits.push(visit);
  console.log(`[POST] Visit confirmed: ${resident.name} (Room ${resident.room}${resident.bed}) at ${timestamp}`);

  res.status(201).json({
    success: true,
    visit,
    message: `Visit confirmed for ${resident.name}`
  });
});

// POST /api/notes - Agregar nota rápida
app.post('/api/notes', (req, res) => {
  const { residentId, content, category = 'observation', timestamp = new Date().toISOString() } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: "Note content is required" });
  }

  const resident = residents.find(r => r.id === parseInt(residentId));
  if (!resident) {
    return res.status(404).json({ error: "Resident not found" });
  }

  const note = {
    id: notes.length + 1,
    residentId: parseInt(residentId),
    residentName: resident.name,
    room: resident.room,
    bed: resident.bed,
    content: content.trim(),
    category, // observation, medication, behavior, other
    timestamp,
    author: 'Nurse', // En producción vendría del auth
  };

  notes.push(note);
  console.log(`[POST] Note added for ${resident.name}: "${content.substring(0, 50)}..."`);

  res.status(201).json({
    success: true,
    note,
    message: `Note saved for ${resident.name}`
  });
});

// POST /api/alerts - Escalar alerta
app.post('/api/alerts', (req, res) => {
  const { residentId, reason, severity = 'medium', timestamp = new Date().toISOString() } = req.body;

  if (!reason || reason.trim() === '') {
    return res.status(400).json({ error: "Alert reason is required" });
  }

  const resident = residents.find(r => r.id === parseInt(residentId));
  if (!resident) {
    return res.status(404).json({ error: "Resident not found" });
  }

  const alert = {
    id: alerts.length + 1,
    residentId: parseInt(residentId),
    residentName: resident.name,
    room: resident.room,
    bed: resident.bed,
    reason: reason.trim(),
    severity, // low, medium, high, critical
    timestamp,
    status: 'active', // active, acknowledged, resolved
    reportedBy: 'Nurse',
  };

  alerts.push(alert);
  console.log(`[POST] Alert escalated for ${resident.name}: ${severity.toUpperCase()} - "${reason}"`);

  res.status(201).json({
    success: true,
    alert,
    message: `Alert escalated for ${resident.name}`
  });
});

// GET /api/visits - Obtener historial de visitas (para verificación)
app.get('/api/visits', (req, res) => {
  res.json(visits);
});

// GET /api/notes - Obtener todas las notas
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// GET /api/alerts - Obtener todas las alertas
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
