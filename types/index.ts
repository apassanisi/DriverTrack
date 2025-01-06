export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  is_driver: boolean;
  is_admin: boolean;
}

export interface Run {
  id?: number;
  name: string;
  distance: string;
  duration: string;
  start_city?: any;
  end_city?: any;
  start_location: { lng: number; lat: number };
  end_location: { lng: number; lat: number };
  description: string;
  assigned_to: number | null;
}

export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Metrics {
  delays?: string;
  fuel_used?: string;
  completion_time?: string;
}

export interface RunData {
  name: string;
  distance: string;
  duration: string;
  description: string;
  assigned_to: string | null;
  start_location: { lat: number; lng: number };
  end_location: { lat: number; lng: number };
}

export interface Assignment {
  id?: number;
  driver_id: number;
  run_id: number;
  status: string;
  metrics: {
    completion_time?: string;
    fuel_used?: string;
    delays?: string;
  };
  driver_name?: string;
  run_name?: string;
}

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_driver: boolean;
  is_admin: boolean;
};
