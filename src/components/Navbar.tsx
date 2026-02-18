import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import forecareLogo from "@/assets/forecare-logo.png";

const navLinks = [
  { label: "Solution", href: "/#solution" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Parameters", href: "/#parameters" },
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/security", isRoute: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleHashLink = (href: string) => {
    const hash = href.replace("/", "");
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-card border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between px-4 sm:px-6 py-3 md:py-4 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={forecareLogo} alt="ForeCare logo" className="h-9 w-9 md:h-10 md:w-10 object-contain" style={{ mixBlendMode: 'multiply' }} />
          <span className="text-lg md:text-xl font-bold text-foreground">ForeCare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ) : (
              <button key={link.href} onClick={() => handleHashLink(link.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </button>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/request-demo">Request Demo</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1" /> Enterprise Login
            </Link>
          </Button>
        </div>

        {/* Mobile: show Request Demo + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Button size="sm" className="h-9 text-xs" asChild>
            <Link to="/request-demo">Demo</Link>
          </Button>
          <button
            className="p-2 text-foreground h-11 w-11 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 sm:px-6 py-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground py-3 px-2 rounded-md hover:bg-muted min-h-[44px] flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => { handleHashLink(link.href); setMobileOpen(false); }}
                  className="text-sm font-medium text-muted-foreground py-3 px-2 text-left rounded-md hover:bg-muted min-h-[44px] flex items-center"
                >
                  {link.label}
                </button>
              )
            )}
            <div className="mt-2 space-y-2">
              <Button size="lg" className="w-full h-11" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>Enterprise Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
