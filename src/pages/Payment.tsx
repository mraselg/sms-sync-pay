import PaymentWidget from "@/components/payment/PaymentWidget";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get("a")) || 100;
  const method = searchParams.get("p") as "bkash" | "nagad" | "rocket" | undefined;
  const orderId = searchParams.get("orderId") || undefined;

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <PaymentWidget
        config={{
          amount,
          orderId,
          method: method && ["bkash", "nagad", "rocket"].includes(method) ? method : undefined,
          numbers: {
            bkash: "01XXXXXXXXX",
            nagad: "01XXXXXXXXX",
            rocket: "01XXXXXXXXX",
          },
        }}
      />
    </div>
  );
};

export default Payment;
