export type Tour = {
  id: string;
  creatorId: string;
  city: string;
  country: string;
  dateFrom: string;
  dateUntil: string;
  locationVisibility: "city" | "zip" | "exact";
  locationType: "hotel" | "apartment" | "studio" | "brothel" | "other";
  serviceType: "inbound" | "outbound" | "both";
  active: boolean;
};

export const mockTours: Tour[] = [
  {
    id: "t1", creatorId: "1", city: "Berlin", country: "Germany",
    dateFrom: "2026-03-10", dateUntil: "2026-03-14",
    locationVisibility: "city", locationType: "hotel", serviceType: "both", active: true,
  },
  {
    id: "t2", creatorId: "1", city: "München", country: "Germany",
    dateFrom: "2026-03-20", dateUntil: "2026-03-23",
    locationVisibility: "zip", locationType: "apartment", serviceType: "inbound", active: false,
  },
  {
    id: "t3", creatorId: "3", city: "Hamburg", country: "Germany",
    dateFrom: "2026-03-05", dateUntil: "2026-03-08",
    locationVisibility: "city", locationType: "hotel", serviceType: "both", active: true,
  },
  {
    id: "t4", creatorId: "4", city: "Köln", country: "Germany",
    dateFrom: "2026-04-01", dateUntil: "2026-04-04",
    locationVisibility: "city", locationType: "studio", serviceType: "inbound", active: true,
  },
];
