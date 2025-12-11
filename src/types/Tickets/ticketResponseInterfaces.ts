// Sub-interfaces for better organization

export interface TicketLocation {
  district: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface TicketMedia {
  mediaType: 'image' | 'video'; // Using a union type for better type safety
  mediaUrl: string;
}

export interface TicketEvent {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO Date string (e.g. "2025-12-25T...")
  time: string;
  location: TicketLocation;
  media: TicketMedia;
}

export interface TicketUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface TicketCheckout {
  _id: string;
  totalAmount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed'; // Union type for payment status
  paidAt: string; // ISO Date string
}

// Main Interface

export interface Ticket {
  id: string;
  event: TicketEvent;
  user: TicketUser;
  checkout: TicketCheckout;
  qrCode: string; // URL to the QR code image
  isVerified: boolean;
  createdAt: string; // ISO Date string
}