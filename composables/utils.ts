const toRad = (value: number) => value * Math.PI / 180;

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c;
  const distanceInMiles = distanceInKm * 0.621371;
  return Math.round(distanceInMiles); // Convert km to miles and round to nearest integer
};

export const calculateDuration = (distance: number): number => distance / 50; // Average speed in miles per hour

export const formatDistance = (distance: number): string => `${Math.round(distance)} mi`;

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  return `${hours}h ${minutes}m`;
};

export const mapAssignmentsToRuns = (runs: Run[], drivers: Profile[], assignments: Assignment[]): (Run & { driver_name: string })[] => {
  const driverMap = new Map(drivers.map(driver => [driver.id, driver]));
  const assignmentMap = new Map(assignments.filter(a => a.status === "in-progress").map(a => [a.run_id, a.driver_id]));

  return runs.map(run => {
    const driverId = assignmentMap.get(run.id) ?? null;
    const driver = driverId ? driverMap.get(driverId) : null;
    return {
      ...run,
      driver_name: driver ? `${driver.first_name} ${driver.last_name}` : "Unassigned",
    };
  });
};

export const mapProfilesWithAssignments = (profiles: Profile[], assignments: Assignment[]): (Profile & { assigned: boolean })[] => {
  const assignedDriverIds = new Set(assignments.filter(a => a.status === 'in-progress').map(a => a.driver_id));

  return profiles.map(profile => ({
    ...profile,
    assigned: assignedDriverIds.has(profile.id)
  }));
};

export const mapAssignmentsWithDetails = (assignments: Assignment[], profiles: Profile[], runs: Run[]): (Assignment & { driver: { name: string }, run: { name: string } })[] => {
  const driverMap = new Map(profiles.map(driver => [driver.id, driver]));
  const runMap = new Map(runs.map(run => [run.id, run]));

  return assignments.map(assignment => {
    const driver = driverMap.get(assignment.driver_id);
    const run = runMap.get(assignment.run_id);
    return {
      ...assignment,
      driver: driver ? { name: `${driver.first_name} ${driver.last_name}` } : { name: "Unknown" },
      run: run || { name: "Unknown" }
    };
  });
};
