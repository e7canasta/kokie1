import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const residents = [
  { 
    id: 1, 
    name: "Margaret Chen", 
    dob: "June 15, 1947", 
    room: "204", 
    unit: "Memory Care",
    age: 78, 
    wellness: { trend: "Medium", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
    image: "https://i.pravatar.cc/150?img=1" 
  },
  { 
    id: 2, 
    name: "Robert Williams", 
    dob: "March 22, 1943", 
    room: "105", 
    unit: "Assisted Living",
    age: 82, 
    wellness: { trend: "Low", previousTrend: "High" },
    avatarGradient: "linear-gradient(135deg, #5C6BC0, #3F51B5)",
    image: "https://i.pravatar.cc/150?img=2" 
  },
  { 
    id: 3, 
    name: "Dorothy Martinez", 
    dob: "September 8, 1949", 
    room: "312", 
    unit: "Independent Living",
    age: 75, 
    wellness: { trend: "High", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #AB47BC, #7B1FA2)",
    image: "https://i.pravatar.cc/150?img=3" 
  },
  { 
    id: 4, 
    name: "James Anderson", 
    dob: "December 1, 1937", 
    room: "108", 
    unit: "Memory Care",
    age: 88, 
    wellness: { trend: "Medium", previousTrend: "Medium" },
    avatarGradient: "linear-gradient(135deg, #EF5350, #C62828)",
    image: "https://i.pravatar.cc/150?img=4" 
  },
  { 
    id: 5, 
    name: "Patricia Taylor", 
    dob: "July 20, 1953", 
    room: "210", 
    unit: "Assisted Living",
    age: 71, 
    wellness: { trend: "Low", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #66BB6A, #388E3C)",
    image: "https://i.pravatar.cc/150?img=5" 
  },
  { 
    id: 6, 
    name: "Michael Brown", 
    dob: "April 10, 1945", 
    room: "115", 
    unit: "Independent Living",
    age: 79, 
    wellness: { trend: "Medium", previousTrend: "Low" },
    avatarGradient: "linear-gradient(135deg, #FFA726, #F57C00)",
    image: "https://i.pravatar.cc/150?img=6" 
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
