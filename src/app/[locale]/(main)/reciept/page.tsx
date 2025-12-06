
import axiosInstance from '@/lib/axios';


let getData = async () => {
  // const res = await axiosInstance.get(`/events/${eventId}`);
  const checkout = await axiosInstance.get("/checkout/complete?session_id=cs_test_a1NDJyTIdZxQdzo2zdwxOGfrtAmMhrIbV852cTVa1sqM6yK93pL0ONS3UB");
  console.log(checkout);
  return checkout;
}


async function ReceiptsList() {
  // const event = await getData(params.eventId);
  // useRouter().push("/order");

  
    return (
   <div>
    <h1>Receipts List</h1>
   </div>
  );
}

export default ReceiptsList