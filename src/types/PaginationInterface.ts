export interface EventObject {
  id: number;
  title: string;
  organizer: string;
  imageUrl: string;
  category: string;
  month: string;
  date: string;
  time: string;
  price: string;
  interested: number;
  categoryColor: string;
  // Add any other fields your event objects have
}

// interface UserAddressProps extends UserProps {
//   // Adds new properties specific to this interface
//   street: string;
//   zipCode: string;
// }

export interface PaginationEventsProps {
  itemsPerPage: number;
  allEvents: EventObject[];
  // Add any other fields your event objects have
}

export interface PaginationProps extends PaginationEventsProps {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  // Add any other fields your event objects have
}
