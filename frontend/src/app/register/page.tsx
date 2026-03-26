"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { API_BASE } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    parentName: "",
    class: "",
    courseInterested: "",
    message: "",
    loading: false,
    error: "",
    success: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      setForm((s) => ({ ...s, error: "Please enter name and mobile.", success: "" }));
      return;
    }
    setForm((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/public/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          courseInterested: form.courseInterested,
          email: form.email,
          parentName: form.parentName,
          class: form.class,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Request failed");
      }
      setForm((s) => ({
        ...s,
        name: "",
        email: "",
        mobile: "",
        parentName: "",
        class: "",
        courseInterested: "",
        message: "",
        loading: false,
        error: "",
        success: "We have received your registration request. Our team will contact you shortly with next steps.",
      }));
    } catch (err: unknown) {
      setForm((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }));
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">Register for Admission</h1>
            <p className="page-hero__subtitle">
              Fill in your details to register. Our academic counsellor will get in touch with fee structure and batch details.
            </p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <div className="form-card-wrap">
              <form className="form-card form-card--wide" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.parentName}
                      onChange={(e) => setForm((s) => ({ ...s, parentName: e.target.value }))}
                      placeholder="Parent name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={form.mobile}
                      onChange={(e) => setForm((s) => ({ ...s, mobile: e.target.value }))}
                      placeholder="10-digit mobile"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Class / Grade</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.class}
                      onChange={(e) => setForm((s) => ({ ...s, class: e.target.value }))}
                      placeholder="e.g. Class 10, 12"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Course interested in</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.courseInterested}
                      onChange={(e) => setForm((s) => ({ ...s, courseInterested: e.target.value }))}
                      placeholder="e.g. NEET 2027, JEE, Boards"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message (optional)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Any specific question or note"
                  />
                </div>
                {form.error && <p className="form-error">{form.error}</p>}
                {form.success && <p className="form-success">{form.success}</p>}
                <button type="submit" className="btn btn--primary" disabled={form.loading}>
                  {form.loading ? "Submitting…" : "Submit Registration"}
                </button>
              </form>
            </div>
            <p className="page-content__cta-text">
              Prefer to talk first? <Link href="/contact">Contact us</Link> or request a callback from the <Link href="/">home page</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
