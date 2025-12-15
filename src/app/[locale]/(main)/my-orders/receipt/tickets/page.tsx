import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import axios, { isAxiosError } from "axios";
import { Ticket } from "@/types/Tickets/ticketResponseInterfaces";
import TicketCarousel, {
  TicketDisplayData,
} from "@/components/Custom/TicketCarousel";
import Loader from "@/components/Global/Loader";
import { decryptData } from "@/shared/encryption";
import { getMonthDay } from "@/utils/details/formatting";

interface PageProps {
  searchParams: Promise<{ invoice_id?: string }>;
}

async function fetchTickets(
  invoiceId: string,
  token?: string
): Promise<Ticket[]> {
  try {
    // Get base URL - handle both relative and absolute URLs
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

    // If baseURL is relative, we need to construct full URL for SSR
    if (baseURL.startsWith("/")) {
      // For SSR, we need the full URL
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const host =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:8000";
      baseURL = `${protocol}://${host.replace(/^https?:\/\//, "")}${baseURL}`;
    }

    // Remove trailing slash if present
    const cleanBaseURL = baseURL.replace(/\/$/, "");
    const url = `${cleanBaseURL}/tickets/order/${invoiceId}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get<{
      status?: string;
      success?: boolean;
      data?: {
        tickets?: Ticket[];
        order?: unknown;
        checkout?: unknown;
      };
      tickets?: Ticket[];
      count?: number;
    }>(url, {
      headers,
      timeout: 10000, // 10 second timeout
    });

    // Handle different response structures
    // Based on the old code: res.data.data.tickets
    let tickets: Ticket[] | undefined;

    // Check response.data.data.tickets (most common structure)
    if (
      response.data.data?.tickets &&
      Array.isArray(response.data.data.tickets)
    ) {
      tickets = response.data.data.tickets;
    }
    // Check response.data.tickets
    else if (Array.isArray(response.data.tickets)) {
      tickets = response.data.tickets;
    }
    // Check if data itself is an array
    else if (Array.isArray(response.data.data)) {
      tickets = response.data.data;
    }
    // Check status-based response
    else if (
      response.data.status === "success" &&
      response.data.data?.tickets
    ) {
      tickets = response.data.data.tickets;
    }

    if (tickets && tickets.length > 0) {
      return tickets;
    }

    // Log the actual response for debugging
    console.error("Unexpected response structure:", {
      status: response.data.status,
      success: response.data.success,
      hasData: !!response.data.data,
      hasTickets: !!response.data.tickets,
      responseKeys: Object.keys(response.data),
    });

    throw new Error("No tickets found in response");
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error fetching tickets:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });

      if (error.response?.status === 401) {
        throw new Error("Unauthorized: Please login to view tickets");
      } else if (error.response?.status === 404) {
        throw new Error("Order not found");
      } else if (error.response?.status === 403) {
        throw new Error(
          "Access denied: You don't have permission to view these tickets"
        );
      }
    }

    console.error("Error fetching tickets:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch tickets");
  }
}

function transformTicketsToDisplayData(tickets: Ticket[]): TicketDisplayData[] {
  return tickets.map((ticket) => {
    // Format date on server side to avoid hydration mismatches
    const dateInfo = getMonthDay(ticket.event.date);
    const date = new Date(ticket.event.date);
    return {
      id: ticket.id,
      eventTitle: ticket.event.title,
      isValid: !ticket.isVerified,
      date: ticket.event.date, // Keep original date for reference
      formattedDate: {
        ...dateInfo,
        year: date.getFullYear(),
      }, // Pre-formatted date info with year
      time: ticket.event.time,
      address: `${ticket.event.location.district}, ${ticket.event.location.city}`,
      attendee: `${ticket.user.firstName} ${ticket.user.lastName}`,
      qrCode: ticket.qrCode,
    };
  });
}

async function getAuthToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("sub");

    if (!tokenCookie?.value) {
      return undefined;
    }

    const decrypted = decryptData(tokenCookie.value) as {
      token?: string;
    };

    return decrypted?.token;
  } catch (error) {
    console.error("Error decrypting token:", error);
    return undefined;
  }
}

async function TicketsContent({
  searchParams,
}: {
  searchParams: Promise<{ invoice_id?: string }>;
}) {
  const params = await searchParams;
  const invoiceId = params.invoice_id;

  if (!invoiceId) {
    notFound();
  }

  try {
    const token = await getAuthToken();
    const tickets = await fetchTickets(invoiceId, token);

    if (!tickets || tickets.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
          <div className="text-center max-w-md mx-auto px-4">
            <p className="text-stone-600 text-lg mb-2">No tickets found</p>
            <p className="text-stone-400 text-sm">
              This order does not have any tickets associated with it.
            </p>
          </div>
        </div>
      );
    }

    const displayData = transformTicketsToDisplayData(tickets);

    return (
      <div className="min-h-screen">
        <TicketCarousel tickets={displayData} invoiceId={invoiceId} />
      </div>
    );
  } catch (error) {
    console.error("Error loading tickets:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-red-600 text-lg font-semibold mb-2">
            Failed to load tickets
          </p>
          <p className="text-stone-600 text-sm mb-4">
            We couldn&apos;t retrieve your tickets. Please try again later or
            contact support if the problem persists.
          </p>
          <p className="text-stone-400 text-xs">Order ID: {invoiceId}</p>
        </div>
      </div>
    );
  }
}

export default async function TicketsPage({ searchParams }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
          <Loader />
        </div>
      }
    >
      <TicketsContent searchParams={searchParams} />
    </Suspense>
  );
}
