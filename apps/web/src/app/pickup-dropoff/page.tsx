import { redirect } from "next/navigation";

export default function PickupDropoffRedirect() {
  // Legacy redirect: /pickup-dropoff now redirects to /van-and-date
  redirect("/van-and-date");
}