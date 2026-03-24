import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-gradient">PHISHIELD</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</a>
            <a href="#footer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 PHISHIELD. AI-Powered Phishing Protection.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
