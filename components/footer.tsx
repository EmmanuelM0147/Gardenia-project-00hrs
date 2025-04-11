"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-foreground">About Us</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="/press" className="text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="/safety" className="text-muted-foreground hover:text-foreground">Safety Information</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-muted-foreground hover:text-foreground">Blog</a></li>
              <li><a href="/newsletter" className="text-muted-foreground hover:text-foreground">Newsletter</a></li>
              <li><a href="/social" className="text-muted-foreground hover:text-foreground">Social Media</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Gardenia Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}