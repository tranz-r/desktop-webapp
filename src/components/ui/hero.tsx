import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroProps {
  title: string
  description: string
  primaryAction: {
    label: string
    href: string
  }
}

export function Hero({ title, description, primaryAction }: HeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href={primaryAction.href}>
              <Button size="lg">
                {primaryAction.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
