
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted w-full">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-base font-medium">PlacementHub</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting talented students with the right career opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/training" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Training & Development
                </Link>
              </li>
              <li>
                <Link to="/communication" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Communication
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Placement Department</li>
              <li>University Campus</li>
              <li>placement@university.edu</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} PlacementHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
