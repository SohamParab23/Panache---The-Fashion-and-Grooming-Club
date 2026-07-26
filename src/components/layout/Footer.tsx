import { SITE_DATA } from "@/config/siteData";
import { Mail, MapPin } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
              {SITE_DATA.name}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {SITE_DATA.tagline}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-foreground mb-6 font-bold">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={SITE_DATA.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground text-sm hover:text-accent transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform mt-0.5" />
                  <span>
                    {SITE_DATA.contact.college}<br/>
                    {SITE_DATA.contact.location}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href={`mailto:${SITE_DATA.contact.email}`} className="hover:text-accent transition-colors">
                  {SITE_DATA.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-foreground mb-6 font-bold">Social</h4>
            <a 
              href={SITE_DATA.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground text-sm hover:text-accent transition-colors w-fit"
            >
              <InstagramIcon className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {SITE_DATA.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            MIT Arts, Commerce & Science College
          </p>
        </div>
      </div>
    </footer>
  );
}
