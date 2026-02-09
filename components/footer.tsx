import { Cross } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Gallery", href: "#gallery" },
  { label: "New Visitors", href: "#visitors" },
  { label: "Contact", href: "#contact" },
  { label: "Prayer Requests", href: "#prayer-requests" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#050510]/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <Cross className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                Grace Community Church
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A welcoming, faith-centered community where everyone belongs. Join
              us in worship, prayer, and fellowship as we grow together in
              Christ.
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground">
              {'"And let us consider how we may spur one another on toward love and good deeds."'}
            </p>
            <p className="mt-1 text-xs text-primary/70">Hebrews 10:24</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Service Times
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <p className="text-sm font-medium text-foreground">Sunday Worship</p>
                <p className="text-xs text-muted-foreground">9:00 AM - 11:30 AM</p>
              </li>
              <li>
                <p className="text-sm font-medium text-foreground">Wednesday Prayer</p>
                <p className="text-xs text-muted-foreground">6:30 PM - 8:00 PM</p>
              </li>
              <li>
                <p className="text-sm font-medium text-foreground">Friday Prayer</p>
                <p className="text-xs text-muted-foreground">7:00 PM - 9:00 PM</p>
              </li>
              <li>
                <p className="text-sm font-medium text-foreground">Youth Meeting</p>
                <p className="text-xs text-muted-foreground">Saturday, 4:00 PM - 6:00 PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Grace Community Church. All rights reserved. Built with faith and love.
          </p>
        </div>
      </div>
    </footer>
  )
}
