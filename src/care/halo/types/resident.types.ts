// Tipos basados en la respuesta del API /api/residents
export interface Wellness {
  trend: "Low" | "Medium" | "High";
  previousTrend: "Low" | "Medium" | "High";
}

export interface WellnessDataItem {
  label: string;
  value: string;
  icon: string;
}

export interface TopCareItem {
  title: string;
  description: string;
  done: boolean;
}

export interface Resident {
  id: number;
  name: string;
  dob: string;
  room: string;
  unit: string;
  age: number;
  wellness: Wellness;
  avatarGradient: string;
  image: string;
  // Campos opcionales que vienen en el detalle
  wellnessData?: WellnessDataItem[];
  topCare?: TopCareItem[];
  // Campos adicionales para UI
  colors?: string[];
  starred?: boolean;
}

// Tipos para componentes
export interface ResidentCardProps {
  resident: Pick<Resident, "id" | "name" | "room" | "image" | "colors">;
}

export interface ResidentsGridProps {
  residents: Resident[];
  callbackfn: (resident: Resident) => React.ReactNode;
}

export interface ResidentsListItemProps {
  resident: Resident;
  i: number;
  totalResidents: number;
}

export interface ResidentsListProps {
  residents: Resident[];
  prop: (resident: Resident, i: number) => React.ReactNode;
}

export interface ResidentHeaderProps {
  resident: Resident;
  onBack: () => void;
}

export interface WellnessCardData {
  items: WellnessDataItem[];
  trend?: "Low" | "Medium" | "High";
  previousTrend?: "Low" | "Medium" | "High";
}

export interface WellnessCardProps {
  data: WellnessCardData;
}
