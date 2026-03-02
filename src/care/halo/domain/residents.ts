/** Number of residents shown in "My Residents" grid (configurable per unit/user later) */
export const MY_RESIDENTS_LIMIT = 4;

// Datos estáticos de residents (deprecated - usar API)
export interface StaticResident {
    name: string;
    room: string;
    colors: string[];
    starred?: boolean;
}

export const myResidents: StaticResident[] = [
    {name: "Marce Brown", room: "Room 201 | AL", colors: ["#8B4A5E", "#A0586A", "#D4A0B0"]},
    {name: "Theodore Brown", room: "Room 201 | AL", colors: ["#7A8A6A", "#6A7A5A", "#B0C0A0"]},
    {name: "Oscar Garcia", room: "Room 204 | AL", colors: ["#8A7A6A", "#7A6A5A", "#C0B0A0"]},
    {name: "Linda Scocia", room: "Room 207 | AL", colors: ["#6A7A8A", "#5A6A7A", "#A0B0C0"]},
];

export const allResidents: StaticResident[] = [
    {name: "Marce Brown", room: "Room 201", starred: true, colors: ["#8B4A5E", "#A0586A", "#D4A0B0"]},
    {name: "Theodore Brown", room: "Room 201", starred: true, colors: ["#7A8A6A", "#6A7A5A", "#B0C0A0"]},
    {name: "Robert Chen", room: "Room 203", starred: false, colors: ["#2E7D6F", "#1B5E50", "#80C0B0"]},
    {name: "Linda Cooper", room: "Room 103", starred: false, colors: ["#6A5A8A", "#5A4A7A", "#B0A0C0"]},
    {name: "Oscar Garcia", room: "Room 204", starred: true, colors: ["#8A7A6A", "#7A6A5A", "#C0B0A0"]},
    {name: "Rose Williams", room: "Room 105", starred: false, colors: ["#8A5A5A", "#7A4A4A", "#C0A0A0"]},
];
