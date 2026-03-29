import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">PV</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">PVaaS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-sm font-medium">Log In</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="gradient-primary text-primary-foreground text-sm font-display font-semibold rounded-lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-6 space-y-4">
          <a href="#features" className="block text-foreground" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-foreground" onClick={() => setIsOpen(false)}>How It Works</a>
          <a href="#pricing" className="block text-foreground" onClick={() => setIsOpen(false)}>Pricing</a>
          <Link to="/docs" className="block text-foreground" onClick={() => setIsOpen(false)}>Docs</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <Button className="w-full gradient-primary text-primary-foreground font-display">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
