"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navItems, archiveItems, learnItems } from "@/components/Constant/Navbar.constant";
import Logo from "@/components/Shared/Logo";
import VideoModal from "@/components/VideoModal/VideoModal";

const AdBannerHeader = ({ adClass }: { adClass: string }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  const injectAdScript = () => {
    if (!adContainerRef.current) return;

    // Remove existing ad script if any
    const existingScript = document.querySelector(
        `script[data-ad-class="${adClass}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new ad script
    const script = document.createElement("script");
    script.innerHTML = `
      !function(e,n,c,t,o,r,d){
        !function e(n,c,t,o,r,m,d,s,a){
          s=c.getElementsByTagName(t)[0],
          (a=c.createElement(t)).async=!0,
          a.src="https://"+r[m]+"/js/"+o+".js?v="+d,
          a.onerror=function(){a.remove(),(m+=1)>=r.length||e(n,c,t,o,r,m)},
          s.parentNode.insertBefore(a,s)
        }(window,document,"script","${adClass}",["cdn.bmcdn6.com"], 0, new Date().getTime())
      }();
    `;
    script.setAttribute("data-ad-class", adClass);
    document.body.appendChild(script);
  };

  useEffect(() => {
    injectAdScript(); // Inject on mount

    // Listen for page visibility changes (when navigating back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        injectAdScript(); // Re-inject ads on page activation
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [adClass]);

  return (
      <div ref={adContainerRef}>
        <ins
            className={adClass}
            style={{ display: "inline-block", width: "1px", height: "1px" }}
            key={adClass + Date.now()}
        ></ins>
      </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isArchiveDropdownOpen, setIsArchiveDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          setIsVisible(true);
        } else {
          setIsVisible(currentScrollY < lastScrollY);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#0000004d] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-white text-xl font-bold">
                  <Logo />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Learn Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsLearnDropdownOpen(!isLearnDropdownOpen)}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      Learn
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {isLearnDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#0000004d] backdrop-blur-md rounded-md shadow-lg py-1">
                        {learnItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Archive Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsArchiveDropdownOpen(!isArchiveDropdownOpen)}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      Archive
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {isArchiveDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#0000004d] backdrop-blur-md rounded-md shadow-lg py-1">
                        {archiveItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-300 hover:text-white"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-[#0000004d] backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Learn Dropdown */}
              <div>
                <button
                  onClick={() => setIsLearnDropdownOpen(!isLearnDropdownOpen)}
                  className="text-gray-300 hover:text-white w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                >
                  Learn
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isLearnDropdownOpen && (
                  <div className="pl-4">
                    {learnItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Archive Dropdown */}
              <div>
                <button
                  onClick={() => setIsArchiveDropdownOpen(!isArchiveDropdownOpen)}
                  className="text-gray-300 hover:text-white w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                >
                  Archive
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isArchiveDropdownOpen && (
                  <div className="pl-4">
                    {archiveItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}