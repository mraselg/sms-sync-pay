import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">PV</span>
              </div>
              <span className="font-display font-bold text-lg">PVaaS</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Automated bKash, Nagad & Rocket payment verification for Bangladeshi merchants.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Pricing</a></li>
              <li><Link to="/docs" className="hover:text-background transition-colors">Documentation</Link></li>
              <li><Link to="/payment" className="hover:text-background transition-colors">Payment Widget</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Integrations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>WordPress Plugin</span></li>
              <li><span>WooCommerce Gateway</span></li>
              <li><span>PHP SDK</span></li>
              <li><span>REST API</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>About Us</span></li>
              <li><span>Contact</span></li>
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PVaaS. All rights reserved. Made in Bangladesh 🇧🇩
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
