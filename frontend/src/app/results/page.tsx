"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header, Footer, SectionHeading, ResultCard } from "@/components";
import { API_BASE } from "@/lib/api";

type Result = {
  _id: string;
  studentName: string;
  course?: string;
  achievement?: string;
  photoUrl?: string;
};

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/public/results/top`);
        if (res.ok) setResults(await res.json());
      } catch {
        // ignore
      }
    }
    load();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">Results</h1>
            <p className="page-hero__subtitle">
              Students who turned effort into results. See our top achievers and success stories.
            </p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <SectionHeading
              kicker="Meet our stars"
              title="Students who turned effort into results."
              subtitle="Detailed result highlights and rankers across courses."
            />
            <div className="results-grid">
              {results.length === 0 ? (
                <p className="empty-state">
                  Detailed result highlights will be added soon. Visit the institute to view full result records. You can <Link href="/contact">contact us</Link> or <Link href="/register">register for admission</Link> to be part of our success stories.
                </p>
              ) : (
                results.map((res) => (
                  <ResultCard
                    key={res._id}
                    _id={res._id}
                    studentName={res.studentName}
                    course={res.course}
                    achievement={res.achievement}
                    photoUrl={res.photoUrl}
                  />
                ))
              )}
            </div>
            <div className="section-cta">
              <Link href="/register" className="btn btn--primary">
                Register for Admission
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
