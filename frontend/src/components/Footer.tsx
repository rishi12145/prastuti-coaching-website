"use client";

import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo">
              <Image
                src="/logo/logo.png"
                alt="Prastuti Coaching Institute"
                width={140}
                height={40}
              />
            </Link>
            <p className="site-footer__tagline">
              A focused, disciplined and student-first coaching environment for
              Boards, JEE, NEET and Foundation courses.
            </p>
          </div>

          <div className="site-footer__block">
            <h4 className="site-footer__heading">Quick links</h4>
            <ul className="site-footer__links">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <h4 className="site-footer__heading">Student portal</h4>
            <ul className="site-footer__links">
              <li>
                <Link href="/student/login" className="site-footer__link">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="site-footer__link">
                  Register for Admission
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {year} Prastuti Coaching Institute.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
