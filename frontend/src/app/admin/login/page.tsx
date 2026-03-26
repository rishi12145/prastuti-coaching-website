
"use client";

import Link from "next/link";
import { useState } from "react";
import { Header, Footer } from "@/components";
import { API_BASE } from "@/lib/api";

type Role = "admin" | "student";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"mobile" | "role" | "otp">("mobile");
  const [role, setRole] = useState<Role>("admin");
  const [state, setState] = useState({
    mobile: "",
    code: "",
    loading: false,
    error: "",
    success: "",
  });

  const sendOtp = async (requestedRole?: Role) => {
    setState((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: state.mobile, requestedRole }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message ?? "Failed to send OTP");

      if (data?.requiresRoleSelection) {
        setStep("role");
        setState((s) => ({ ...s, loading: false }));
        return;
      }

      setStep("otp");
      setState((s) => ({ ...s, loading: false, success: "OTP sent. Please check your phone." }));
    } catch (err: unknown) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  };

  const onMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.mobile.trim()) {
      setState((s) => ({ ...s, error: "Please enter your mobile number.", success: "" }));
      return;
    }
    await sendOtp(undefined);
  };

  const onRoleContinue = async () => {
    await sendOtp(role);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.code.trim()) {
      setState((s) => ({ ...s, error: "Please enter the OTP.", success: "" }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: state.mobile, code: state.code, requestedRole: role }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message ?? "OTP verification failed");
      if (data?.token) localStorage.setItem("auth_token", data.token);
      setState((s) => ({ ...s, loading: false, success: `Logged in as ${data?.role || role}.`, error: "" }));
    } catch (err: unknown) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">Admin Login</h1>
            <p className="page-hero__subtitle">Login using OTP (admin allowlist supported).</p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <div className="form-card-wrap">
              {step === "mobile" && (
                <form className="form-card" onSubmit={onMobileSubmit}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={state.mobile}
                      onChange={(e) => setState((s) => ({ ...s, mobile: e.target.value }))}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {state.error && <p className="form-error">{state.error}</p>}
                  {state.success && <p className="form-success">{state.success}</p>}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button type="submit" className="btn btn--primary" disabled={state.loading}>
                      {state.loading ? "Please wait…" : "Continue"}
                    </button>
                    <Link href="/" className="btn btn--ghost">
                      Back to Home
                    </Link>
                  </div>
                </form>
              )}

              {step === "role" && (
                <div className="form-card">
                  <p style={{ marginTop: 0, color: "var(--color-text-muted)" }}>
                    This number can login as Admin or User. Choose how you want to continue.
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    <button
                      type="button"
                      className={`btn ${role === "admin" ? "btn--primary" : "btn--outline"}`}
                      onClick={() => setRole("admin")}
                    >
                      Login as Admin
                    </button>
                    <button
                      type="button"
                      className={`btn ${role === "student" ? "btn--primary" : "btn--outline"}`}
                      onClick={() => setRole("student")}
                    >
                      Login as User
                    </button>
                  </div>
                  {state.error && <p className="form-error">{state.error}</p>}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button type="button" className="btn btn--primary" onClick={onRoleContinue} disabled={state.loading}>
                      {state.loading ? "Sending…" : "Send OTP"}
                    </button>
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => {
                        setStep("mobile");
                        setState((s) => ({ ...s, code: "", error: "", success: "" }));
                      }}
                    >
                      Change number
                    </button>
                  </div>
                </div>
              )}

              {step === "otp" && (
                <form className="form-card" onSubmit={verifyOtp}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input type="tel" className="form-input" value={state.mobile} disabled />
                  </div>
                  <div className="form-group">
                    <label className="form-label">OTP *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={state.code}
                      onChange={(e) => setState((s) => ({ ...s, code: e.target.value }))}
                      placeholder="Enter 6-digit OTP"
                      inputMode="numeric"
                    />
                  </div>
                  {state.error && <p className="form-error">{state.error}</p>}
                  {state.success && <p className="form-success">{state.success}</p>}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button type="submit" className="btn btn--primary" disabled={state.loading}>
                      {state.loading ? "Verifying…" : "Verify & Login"}
                    </button>
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => {
                        setStep("mobile");
                        setState((s) => ({ ...s, code: "", error: "", success: "" }));
                      }}
                    >
                      Start over
                    </button>
                    <Link href="/" className="btn btn--ghost">
                      Back to Home
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
