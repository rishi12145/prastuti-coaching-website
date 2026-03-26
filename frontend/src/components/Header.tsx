"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { API_BASE } from "@/lib/api";

const NAV_ITEMS = [
  { href: "/#home", label: "Home" },
  { href: "/#courses", label: "Courses" },
  { href: "/#faculty", label: "Faculty" },
  { href: "/#results", label: "Results" },
  { href: "/#contact", label: "Contact" },
] as const;

type HeaderProps = {
  onNavClick?: (id: string) => void;
};

export function Header({ onNavClick }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [callOpen, setCallOpen] = useState(false);
  const [callState, setCallState] = useState({
    name: "",
    mobile: "",
    loading: false,
    error: "",
    success: "",
  });

  const callHref = useMemo(() => {
    const raw = (process.env.NEXT_PUBLIC_CALL_NUMBER || "").trim();
    if (!raw) return "tel:+91XXXXXXXXXX";
    return raw.startsWith("tel:") ? raw : `tel:${raw}`;
  }, []);

  const submitCallRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callState.name.trim() || !callState.mobile.trim()) {
      setCallState((s) => ({ ...s, error: "Please enter name and mobile.", success: "" }));
      return;
    }

    setCallState((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/public/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callState.name,
          mobile: callState.mobile,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Request failed");
      }
      setCallState({
        name: "",
        mobile: "",
        loading: false,
        error: "",
        success: "Request received. Our team will call you shortly.",
      });
    } catch (err: unknown) {
      setCallState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link href="/" className="site-header__logo" aria-label="Prastuti - Go to Home">
          <Image
            src="/logo/logo.png"
            alt="Prastuti Coaching Institute"
            width={140}
            height={40}
            priority
          />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/#home" ? pathname === "/" : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-header__nav-link ${isActive ? "site-header__nav-link--active" : ""}`}
                onClick={(e) => {
                  if (!onNavClick) return;
                  if (!isHome) return;
                  const id = item.href.startsWith("/#") ? item.href.slice(2) : "";
                  if (!id) return;
                  e.preventDefault();
                  onNavClick(id);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setCallOpen(true)}>
            Request Call Now
          </button>
          <a className="btn btn--ghost btn--sm" href={callHref}>
            Call Now
          </a>
          <Link href="/student/login" className="btn btn--outline btn--sm">
            Student Login
          </Link>
        </div>
      </div>

      {callOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Request call now"
          onClick={() => setCallOpen(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Request a call</h3>
              <button type="button" className="modal__close" onClick={() => setCallOpen(false)} aria-label="Close">
                ×
              </button>
            </div>
            <form className="modal__body" onSubmit={submitCallRequest}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={callState.name}
                  onChange={(e) => setCallState((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={callState.mobile}
                  onChange={(e) => setCallState((s) => ({ ...s, mobile: e.target.value }))}
                  placeholder="10-digit mobile number"
                />
              </div>
              {callState.error && <p className="form-error">{callState.error}</p>}
              {callState.success && <p className="form-success">{callState.success}</p>}
              <div className="modal__actions">
                <button type="button" className="btn btn--outline" onClick={() => setCallOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" disabled={callState.loading}>
                  {callState.loading ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
