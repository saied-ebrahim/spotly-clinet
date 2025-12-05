
import { BsCreditCard, BsQrCode } from 'react-icons/bs';
import { FaClock, FaDownload, FaMapPin, FaUser } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';

function page() {
  const eventData = {
    _id: "evt-992831",
    title: "Midnight Jazz Festival 2025",
    description: "Live at the Blue Note Pavilion",
    date: "Saturday, Nov 15, 2025",
    time: "20:00 - 23:30",
    type: "Concert",
    location: {
      city: "New York",
      country: "USA",
      district: "Blue Note Pavilion, 12th Ave",
      latitude: 40.7128,
      longitude: -74.0060
    },
    media: {
      mediaType: "image",
      mediaUrl: "https://example.com/poster.jpg"
    },
    tags: [
      { _id: "t1", name: "Jazz" },
      { _id: "t2", name: "Nightlife" }
    ],
    favorites: ["user123"],
    category: [
      { _id: "c1", name: "Music" }
    ],
    organizer: {
      _id: "org-001",
      firstName: "Neon Horizon",
      lastName: "Events"
    },
    ticketType: {
      ticketID: "vip-tier-1",
      title: "VIP Front Row Experience",
      price: 145.00,
      quantity: 1,
      discount: 5.00
    },
    analytics: {
      ticketsSold: 450,
      ticketsAvailable: 50,
      totalRevenue: 65250,
      waitingListCount: 12,
      likes: 890,
      dislikes: 4
    }
  };
  const receiptMeta = {
    receiptNo: "N 842",
    purchaseDate: "10.24.2025 14:30",
    orderId: "ORD-992831",
    attendee: "Alex Richardson",
    seat: "Row A, Seat 12",
    fees: 12.50,
  };
  const total = eventData.ticketType.price + eventData.ticketType.discount;

  return (
    <span> Receipt </span>
  );
}

export default page