import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = location.startsWith("/blog") || location.startsWith("/diario") 
    ? [
        { name: "Início", href: "/" },
      ]
    : [
        { name: "Início", href: "/" },
        { name: "Sobre", href: "#sobre" },
        { name: "Como Ajudo", href: "#servicos" },
        { name: "Atendimento", href: "#atendimento" },
        { name: "Diário", href: "/diario" },
        { name: "Blog", href: "/blog" },
        { name: "Contato", href: "#contato" },
      ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id.startsWith("/")) {
      if (location === id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Allow normal navigation for non-anchor routes
        setIsMobileMenuOpen(false);
      }
      return;
    }
    
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/images/AndreDuarte_Marca2.png" 
            alt="Logo André Duarte" 
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-xl font-medium leading-none text-primary",
              isScrolled ? "text-primary" : "text-primary"
            )}>
              André Duarte
            </span>
            <span className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
              Psicólogo Clínico
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => 
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            )
          )}
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            onClick={() => scrollToSection("#contato")}
          >
            Agendar Consulta
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "0" }}
      >
        <button
          className="absolute top-6 right-6 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
        
        {navLinks.map((link) => 
          link.href.startsWith("#") ? (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          )
        )}
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg mt-4"
          onClick={() => scrollToSection("#contato")}
        >
          Agendar Consulta
        </Button>
      </div>
    </header>
  );
}
