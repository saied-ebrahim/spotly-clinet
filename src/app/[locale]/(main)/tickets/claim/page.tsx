// app/tickets/claim/page.tsx
import { getTransferDetails } from '@/lib/api';
import ClaimButton from '@/components/ui/claim/ClaimButton';
import Link from 'next/link';

// Force dynamic because we rely on searchParams
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { token?: string };
}

export default async function ClaimPage({ searchParams }: PageProps) {
  const token = searchParams.token;

  // 1. Validate URL param
  if (!token) {
    return <ErrorDisplay message="No transfer token found." />;
  }

  // 2. Fetch Details (Read-only)
  // This checks if the link is valid without using it up
  const details = await getTransferDetails(token);

  // 3. Handle Invalid Link
  if (!details || !details.isValid) {
    return <ErrorDisplay message={details?.message || "This link is expired or invalid."} />;
  }

  // 4. Render Success UI
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white text-center">
          <div className="text-4xl mb-2">🎁</div>
          <h1 className="text-xl font-bold">Receive Ticket</h1>
          <p className="text-indigo-100 text-sm mt-1">
            <span className="font-bold">{details.senderName || 'Someone'}</span> wants to send you a ticket!
          </p>
        </div>

        <div className="p-8">
          {/* Ticket Info Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-2">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {details.eventTitle || 'Event Ticket'}
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              {details.seat && <p>Seat: {details.seat}</p>}
              <p className="text-xs text-gray-400">Verified Transfer Link</p>
            </div>
          </div>

          {/* Client Button to execute the Claim */}
          <ClaimButton token={token} />
          
          <div className="mt-4 text-center">
             <Link href="/" className="text-xs text-gray-400 hover:underline">
               Decline and go home
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Error Component
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">!</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Unavailable</h3>
        <p className="text-gray-600 mb-6 text-sm">{message}</p>
        <Link href="/" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}