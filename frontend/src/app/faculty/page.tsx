export const dynamic = "force-dynamic";

import Link from "next/link";
import { Header, Footer, SectionHeading, FacultyCard } from "@/components";

export const metadata = {
  title: "Faculty | Prastuti Coaching Institute",
  description: "Meet our experienced teachers and mentors for Boards, JEE and NEET.",
};

type Faculty = {
  _id: string;
  name: string;
  subject: string;
  experienceYears?: number;
  photoUrl?: string;
  bio?: string;
};

export default function FacultyPage() {
  let faculty: Faculty[] = [];

  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">Faculty</h1>
            <p className="page-hero__subtitle">
              Experienced teachers. Personal mentors. Hand-picked subject experts for your success.
            </p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <SectionHeading
              kicker="Our faculty"
              title="Experienced teachers. Personal mentors."
              subtitle="Each faculty member brings deep subject expertise and a proven track record."
            />
            <div className="faculty-showcase-grid">
              {faculty.length === 0 ? (
                <p className="empty-state">
                  Faculty profiles will appear here once added by admin. Meanwhile, you can <Link href="/contact">contact us</Link> or <Link href="/register">register for admission</Link>.
                </p>
              ) : (
                faculty.map((f) => (
                  <FacultyCard
                    key={f._id}
                    name={f.name}
                    subject={f.subject}
                    experience={`${Math.max(0, f.experienceYears ?? 0)}+ years experience`}
                    quote={f.bio || "Focused on concept clarity, exam strategy and student confidence."}
                    photoUrl={f.photoUrl}
                  />
                ))
              )}
            </div>
            <div className="content-block">
              <p>
                Want to know more about our teaching methodology? <Link href="/about">Read about us</Link> or <Link href="/contact">get in touch</Link>. Ready to join?{" "}
                <Link href="/register">Register for admission</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
