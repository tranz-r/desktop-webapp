import { redirect } from "next/navigation";

export default function PaymentPage() {
	// Legacy route: redirect to the current payment page
	redirect("/pay");
}
