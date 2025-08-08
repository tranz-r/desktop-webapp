import { StreamlinedHeader } from "@/components/StreamlinedHeader"
import { Hero } from "@/components/ui/hero"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { TruckIcon, DollarSignIcon, ShieldCheckIcon } from "lucide-react"

export default function QuotationPage() {
  return (
    <>
      <StreamlinedHeader />
      
      <Hero
        title="Get Your Moving Quote"
        description="Fast, reliable moving services tailored to your needs. Get an instant quote and book your move in minutes."
        primaryAction={{
          label: "Start Building Inventory",
          href: "/inventory",
        }}
      />

      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <TruckIcon className="h-12 w-12 mb-4 text-primary" />
              <CardTitle className="mb-2">Professional Movers</CardTitle>
              <p className="text-muted-foreground">
                Experienced and trained moving specialists ready to handle your belongings with care
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <DollarSignIcon className="h-12 w-12 mb-4 text-primary" />
              <CardTitle className="mb-2">Transparent Pricing</CardTitle>
              <p className="text-muted-foreground">
                No hidden fees, clear cost breakdown, and competitive rates for all services
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <ShieldCheckIcon className="h-12 w-12 mb-4 text-primary" />
              <CardTitle className="mb-2">Safe & Secure</CardTitle>
              <p className="text-muted-foreground">
                Full insurance coverage and secure handling of your valuable belongings
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
