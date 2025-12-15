import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FaReceipt } from "react-icons/fa";
import Loader from "@/components/Global/Loader";
import { decryptData } from "@/shared/encryption";
import ReceiptCard from "@/components/Custom/ReceiptCard";

interface PageProps {
  searchParams: Promise<{ invoice_id?: string }>;
}

interface InvoiceData {
  orderId: string;
  eventTitle: string;
  totalPrice: number;
  quantity: number;
  date: string;
  eventId: string;
  fees: number;
  discount: number;
  purchaserName: string;
}

async function fetchInvoiceData(
  invoiceId: string,
  token?: string
): Promise<InvoiceData> {
  try {
    // Get base URL - handle both relative and absolute URLs
    // Fetch using native fetch to avoid axios url.parse deprecation
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

    // If baseURL is relative, we need to construct full URL for SSR
    if (baseURL.startsWith("/")) {
      // For SSR, we need the full URL
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const host = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL;
      baseURL = `${protocol}://${host?.replace(/^https?:\/\//, "")}${baseURL}`;
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

    // Use AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,

      cache: "no-cache",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please login to view invoice");
      } else if (response.status === 404) {
        throw new Error("Invoice not found");
      } else if (response.status === 403) {
        throw new Error(
          "Access denied: You don't have permission to view this invoice"
        );
      }
      throw new Error(
        `Failed to fetch invoice: ${response.status} ${response.statusText}`
      );
    }

    const responseData: {
      status?: string;
      success?: boolean;
      data?: {
        order?: { id: string; eventID: string };
        checkout?: { totalAmount: number; paidAt: string };
        tickets?: Array<{
          event: { title: string };
          user: { firstName: string; lastName: string };
        }>;
        fees?: number;
        discount?: number;
      };
      count?: number;
    } = await response.json();

    const data = responseData.data;

    if (
      !data ||
      !data.order ||
      !data.checkout ||
      !data.tickets ||
      data.tickets.length === 0
    ) {
      throw new Error("Invalid invoice data");
    }

    const invoice: InvoiceData = {
      orderId: data.order.id.slice(5),
      totalPrice: data.checkout.totalAmount,
      quantity: responseData.count || data.tickets.length,
      date: data.checkout.paidAt,
      eventId: data.order.eventID.slice(5),
      eventTitle: data.tickets[0].event.title,
      fees: data.fees || 0,
      discount: data.discount || 0,
      purchaserName: `${data.tickets[0].user.firstName} ${data.tickets[0].user.lastName}`,
    };

    return invoice;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout: Please try again");
      }
      console.error("Error fetching invoice:", {
        message: error.message,
        name: error.name,
      });
      throw error;
    }

    console.error("Error fetching invoice:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch invoice");
  }
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

async function InvoiceContent({
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
    const invoiceData = await fetchInvoiceData(invoiceId, token);

    return <ReceiptCard invoiceData={invoiceData} invoiceId={invoiceId} />;
  } catch (error) {
    console.error("Error loading invoice:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaReceipt size={32} className="text-red-600" />
          </div>
          <p className="text-red-600 text-lg font-semibold mb-2">
            Failed to load invoice
          </p>
          <p className="text-stone-600 text-sm mb-4">
            We couldn&apos;t retrieve your invoice. Please try again later or
            contact support if the problem persists.
          </p>
          <p className="text-stone-400 text-xs">Invoice ID: {invoiceId}</p>
        </div>
      </div>
    );
  }
}

export default async function ReceiptPage({ searchParams }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
          <Loader />
        </div>
      }
    >
      <InvoiceContent searchParams={searchParams} />
    </Suspense>
  );
}
