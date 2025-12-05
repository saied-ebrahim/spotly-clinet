export interface BookingSearchFiltersState {
  date: Date | null;
  reservationDate: Date | null;
  location: { label: string; value: string } | null;
  parentName: { data: string; name: string };
  patientName: { data: string; name: string };
}

export interface BookingSearchFiltersProps {
  searchState: BookingSearchFiltersState;
  onSearchChange: (updates: Partial<BookingSearchFiltersState>) => void;
  locationOptions: { label: string; value: string }[];
}