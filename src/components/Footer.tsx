const footerLinks = {
  platform: [
    { label: "Solution overview", href: "#solution" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
  ],
  company: [
    { label: "About ForeCare", href: "#" },
    { label: "Contact", href: "#demo" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Security statement", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-narrow px-6 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <div className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">FC</span>
              </div>
              <span className="text-lg font-bold text-foreground">ForeCare</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Predictive care intelligence for senior care providers. Detect early. Act faster. Care better.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4 capitalize">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ForeCare. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for healthcare. Designed for trust.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
