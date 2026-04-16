import { Link } from "react-router-dom";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => (
  <footer className="border-t bg-secondary/50 mt-20">
    <div className="container py-12">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <h4 className="font-serif text-lg font-bold mb-2">The Kochi Brief</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your daily dose of curated Kochi news, delivered in 5 minutes.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-semibold mb-1">Links</h5>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <div id="subscribe">
          <h5 className="text-sm font-semibold mb-3">Stay Updated</h5>
          <SubscriptionForm compact />
        </div>
      </div>

      <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Kochi Brief. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
