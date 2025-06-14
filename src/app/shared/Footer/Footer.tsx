/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Footer.js
"use client"
import { FaFacebookF, FaTwitter, FaReddit, FaYoutube, FaTiktok, FaLinkedin, FaInstagram, FaTelegram } from "react-icons/fa";
import Logo from "@/components/Shared/Logo";
import Link from "next/link";
import { footerItems } from "@/components/Constant/Navbar.constant";
import { usePathname } from "next/navigation";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61564695827270",
    icon: FaFacebookF,
    hoverColor: "hover:text-blue-500"
  },
  {
    name: "Twitter",
    href: "https://x.com/Trobits_inc",
    icon: FaTwitter,
    hoverColor: "hover:text-blue-400"
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/trobits",
    icon: FaReddit,
    hoverColor: "hover:text-red-500"
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@TrobitsCommunity",
    icon: FaYoutube,
    hoverColor: "hover:text-red-600"
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@trobits_community",
    icon: FaTiktok,
    hoverColor: "hover:text-pink-500"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/trobits",
    icon: FaLinkedin,
    hoverColor: "hover:text-blue-500"
  },
  {
    name: "Telegram",
    href: "https://t.me/Trobits1",
    icon: FaTelegram,
    hoverColor: "hover:text-blue-400"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/trobits_inc/",
    icon: FaInstagram,
    hoverColor: "hover:text-pink-600"
  }
];

export default function Footer() {
  const pathname = usePathname();
  
  // Group footer items by category
  const companyLinks = footerItems.filter(item => 
    ["aboutus", "privacypolicy", "cookiepolicy", "disclaimer"].includes(item.value)
  );
  
  const supportLinks = footerItems.filter(item => 
    ["contactUs", "faq", "howitworks"].includes(item.value)
  );

  return (
    <footer className="bg-black py-8 mt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Company Section */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors duration-200 ${
                      pathname === item.href
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Support</h2>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors duration-200 ${
                      pathname === item.href
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-center">Connect With Us</h2>
            <div className="grid grid-cols-4 gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`text-gray-300 ${social.hoverColor} transition-colors duration-200 flex items-center justify-center`}
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Trobits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


