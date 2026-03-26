
"use client";

import Link from "next/link";
import { useState } from "react";
import { Header, Footer } from "@/components";
import { API_BASE } from "@/lib/api";

export default function StudentLoginPage() {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [state, setState] = useState({
    mobile: "",
    code: "",
    loading: false,
    error: "",
    success: "",
  });

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.mobile.trim()) {
      setState((s) => ({ ...s, error: "Please enter your mobile number.", success: "" }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: state.mobile, requestedRole: "student" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message ?? "Failed to send OTP");
      setStep("otp");
      setState((s) => ({ ...s, loading: false, success: "OTP sent. Please check your phone.", error: "" }));
    } catch (err: unknown) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
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
        body: JSON.stringify({ mobile: state.mobile, code: state.code, requestedRole: "student" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message ?? "OTP verification failed");
      if (data?.token) localStorage.setItem("auth_token", data.token);
      setState((s) => ({ ...s, loading: false, success: "Logged in successfully.", error: "" }));
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
            <h1 className="page-hero__title">Student Login</h1>
            <p className="page-hero__subtitle">Login using OTP (no password required).</p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <div className="form-card-wrap">
              <form className="form-card" onSubmit={step === "mobile" ? sendOtp : verifyOtp}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={state.mobile}
                    onChange={(e) => setState((s) => ({ ...s, mobile: e.target.value }))}
                    placeholder="10-digit mobile number"
                    disabled={step === "otp"}
                  />
                </div>
                {step === "otp" && (
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
                )}
                {state.error && <p className="form-error">{state.error}</p>}
                {state.success && <p className="form-success">{state.success}</p>}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="submit" className="btn btn--primary" disabled={state.loading}>
                    {state.loading ? "Please wait…" : step === "mobile" ? "Send OTP" : "Verify & Login"}
                  </button>
                  {step === "otp" && (
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => {
                        setStep("mobile");
                        setState((s) => ({ ...s, code: "", success: "", error: "" }));
                      }}
                    >
                      Change number
                    </button>
                  )}
                  <Link href="/" className="btn btn--ghost">
                    Back to Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
