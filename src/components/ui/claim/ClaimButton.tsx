'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { claimTicketRequest } from '@/lib/api';

export default function ClaimButton({ token }: { token: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleClaim = async () => {
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await claimTicketRequest(token);

      if (response.success) {
        // Redirect to the ticket details page or wallet
        // Assuming response includes the new ticket ID or we redirect to list
        router.push('/tickets'); 
        router.refresh(); // Ensure the wallet updates
      } else {
        setStatus('error');
        setErrorMsg(response.message || 'Failed to claim ticket');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="mt-6 w-full">
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
          {errorMsg}
        </div>
      )}

      <button
        onClick={handleClaim}
        disabled={status === 'loading'}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </>
        ) : (
          'Accept Ticket'
        )}
      </button>
    </div>
  );
}