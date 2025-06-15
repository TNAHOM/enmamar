import Link from "next/link";
import React from "react";

// Types for better type safety and maintainability
interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Social Media Icons Component
const SocialIcons = {
  Facebook: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  Instagram: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  Twitter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  ),
  LinkedIn: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
};

// Footer Section Component
const FooterSection: React.FC<{ section: FooterSection }> = ({ section }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
    <ul className="space-y-3">
      {section.links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-sm text-muted-foreground hover:text-purple-600 transition-colors duration-200"
            {...(link.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Social Links Component
const SocialLinks: React.FC<{ socialLinks: SocialLink[] }> = ({
  socialLinks,
}) => (
  <div className="flex justify-center sm:justify-start space-x-4 mt-6 sm:mt-0">
    {socialLinks.map((social, index) => (
      <Link
        key={index}
        href={social.href}
        className="text-muted-foreground hover:text-purple-600 transition-colors duration-200 p-2 hover:bg-purple-50 rounded-full"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
      >
        {social.icon}
      </Link>
    ))}
  </div>
);

// Footer Data Configuration
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/become-instructor", label: "Contact Us" },
    ],
  },
  {
    title: "Learning & Support",
    links: [
      { href: "/", label: "All Courses" },
      { href: "/", label: "Free Courses" },
      { href: "/become-instructor", label: "Become an Instructor" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://facebook.com/enmamar",
    icon: <SocialIcons.Facebook />,
    label: "Follow us on Facebook",
  },
  {
    href: "https://instagram.com/enmamar",
    icon: <SocialIcons.Instagram />,
    label: "Follow us on Instagram",
  },
  {
    href: "https://twitter.com/enmamar",
    icon: <SocialIcons.Twitter />,
    label: "Follow us on Twitter",
  },
  {
    href: "https://linkedin.com/company/enmamar",
    icon: <SocialIcons.LinkedIn />,
    label: "Follow us on LinkedIn",
  },
];

// Main Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background pt-16 pb-8 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Enmamar
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering learners worldwide with quality education and expert
                instruction. Join thousands of students in their journey to
                success.
              </p>
            </div>
            <SocialLinks socialLinks={SOCIAL_LINKS} />
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Enmamar. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-purple-600 transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-purple-600 transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-purple-600 transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
