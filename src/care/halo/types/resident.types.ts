// Tipos basados en la respuesta del API /api/residents
export interface Wellness {
  trend: "Low" | "Medium" | "High";
  previousTrend: "Low" | "Medium" | "High";
}

export interface WellnessDataItem {
  label: string;
  value?: string;
  icon?: string;
  // Campos que el componente WellnessCard espera
  current?: string;
  previous?: string;
  hasArrow?: boolean;
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
  bed?: string;
  unit: string;
  age: number;
  wellness: Wellness;
  avatarGradient: string;
  image: string;
  wellnessData?: WellnessDataItem[];
  topCare?: TopCareItem[];
  colors?: string[];
  starred?: boolean;
}

export type RoundingStatus = "visited" | "pending" | "overdue";

export interface RoomGroup {
  room: string;
  unit: string;
  residents: Resident[];
  roundingStatus: RoundingStatus;
  lastVisitedMinutesAgo?: number;
}

// Tipos para componentes
export interface ResidentCardProps {
  resident: Pick<Resident, "id" | "name" | "room" | "image" | "colors">;
}

export interface ResidentsGridProps {
  residents: Resident[];
  renderItem: (resident: Resident) => React.ReactNode;
}

export interface ResidentsListItemProps {
  resident: Resident;
  i: number;
  totalResidents: number;
}

export interface ResidentsListProps {
  residents: Resident[];
  renderItem: (resident: Resident, i: number) => React.ReactNode;
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

// Tipos para componentes UI
export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AvatarProps {
  name: string;
  size?: number;
  colors: string[];
}

export interface ViewRoomButtonProps {
  onClick: () => void;
}

// Tipos para domain/overview
export interface CareActivity {
  activity: string;
  initiated: string;
  uninitiated: string;
  total: string;
}

export type TimeRangeTab = "Last 24h" | "Last 7 Days" | "Last 30 Days";

// Tipos para TopCareCard
export interface TimeRangeTabsProps {
  tabs: TimeRangeTab[];
  activeTab: TimeRangeTab;
  onTabChange: (tab: TimeRangeTab) => void;
}

export interface ActivityRowProps {
  item: CareActivity;
  isLast: boolean;
}
