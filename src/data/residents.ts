export interface Resident {
  id: string;
  name: string;
  age: number;
  room: string;
  unit: string;
  risk: number;
  status: "High Risk" | "Monitor" | "Stable";
  trend: string;
  lastCheck: string;
  nextCheck: string;
  assignedTo: string;
  reason: string | null;
}

export const residents: Resident[] = [
  { id: "1", name: "Maria Schmidt", age: 84, room: "A-12", unit: "Unit A", risk: 92, status: "High Risk", trend: "Declining", lastCheck: "Not checked", nextCheck: "Overdue", assignedTo: "Nurse Becker", reason: "Reduced mobility detected" },
  { id: "2", name: "Hans Weber", age: 79, room: "B-04", unit: "Unit B", risk: 85, status: "High Risk", trend: "Declining", lastCheck: "2h ago", nextCheck: "14:30", assignedTo: "Nurse Vogel", reason: "Sleep disruption pattern" },
  { id: "3", name: "Ingrid Müller", age: 88, room: "A-07", unit: "Unit A", risk: 78, status: "High Risk", trend: "Declining", lastCheck: "Today 09:15", nextCheck: "15:15", assignedTo: "Nurse Becker", reason: "Weight loss trend" },
  { id: "4", name: "Klaus Bauer", age: 76, room: "C-02", unit: "Unit C", risk: 71, status: "Monitor", trend: "Fluctuating", lastCheck: "Today 08:30", nextCheck: "14:30", assignedTo: "Nurse Klein", reason: "Increased fall risk" },
  { id: "5", name: "Elisabeth Braun", age: 82, room: "B-11", unit: "Unit B", risk: 68, status: "Monitor", trend: "Fluctuating", lastCheck: "Yesterday", nextCheck: "10:00", assignedTo: "Nurse Vogel", reason: "Behavioral change" },
  { id: "6", name: "Wolfgang Richter", age: 73, room: "A-03", unit: "Unit A", risk: 45, status: "Stable", trend: "Stable", lastCheck: "Today 10:00", nextCheck: "16:00", assignedTo: "Nurse Becker", reason: null },
  { id: "7", name: "Helga Fischer", age: 90, room: "C-08", unit: "Unit C", risk: 38, status: "Stable", trend: "Improving", lastCheck: "Today 07:45", nextCheck: "13:45", assignedTo: "Nurse Klein", reason: null },
  { id: "8", name: "Peter Hoffmann", age: 81, room: "B-06", unit: "Unit B", risk: 32, status: "Stable", trend: "Stable", lastCheck: "Today 08:00", nextCheck: "14:00", assignedTo: "Nurse Vogel", reason: null },
  { id: "9", name: "Ursula Koch", age: 77, room: "A-15", unit: "Unit A", risk: 28, status: "Stable", trend: "Stable", lastCheck: "Today 09:30", nextCheck: "15:30", assignedTo: "Nurse Becker", reason: null },
  { id: "10", name: "Friedrich Schäfer", age: 86, room: "C-12", unit: "Unit C", risk: 22, status: "Stable", trend: "Stable", lastCheck: "Yesterday", nextCheck: "10:00", assignedTo: "Nurse Klein", reason: null },
];
