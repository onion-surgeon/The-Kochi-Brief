import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const scrollToSubscribe = () => {
    const el = document.getElementById("subscribe");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-xl font-bold text-foreground tracking-tight">
          The Kochi Brief
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Button size="sm" onClick={scrollToSubscribe}>
            Subscribe
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium py-2">Home</Link>
            <Link to="/about" className="text-sm font-medium py-2">About</Link>
            <Button size="sm" onClick={scrollToSubscribe} className="w-fit">Subscribe</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
