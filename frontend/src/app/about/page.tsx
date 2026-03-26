export const dynamic = "force-dynamic";

import Link from "next/link";
import { Header, Footer, SectionHeading } from "@/components";

export const metadata = {
  title: "About Us | Prastuti Coaching Institute",
  description: "Learn about Prastuti – our mission, vision and commitment to student success.",
};

export default function AboutPage() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">About Us</h1>
            <p className="page-hero__subtitle">
              A decade of building strong fundamentals. Know our mission, vision and why students choose us.
            </p>
          </div>
        </section>
        <section className="page-content">
          <div className="container">
            <div className="content-grid">
              <div className="content-block">
                <SectionHeading
                  align="left"
                  kicker="About the institute"
                  title="A decade of building strong fundamentals."
                  subtitle="Prastuti Coaching Institute is dedicated to nurturing students for competitive exams with a balanced focus on concept clarity, practice and confidence."
                />
                <ul>
                  <li><strong>Concept-first pedagogy</strong> – Each topic is taught from first principles with real-world examples and exam-oriented tips.</li>
                  <li><strong>Structured mentoring</strong> – Regular 1:1 doubt clearing, performance reviews and counselling for students and parents.</li>
                  <li><strong>Exam simulation</strong> – Timely mock tests, analytics and personalised improvement plans to close learning gaps.</li>
                </ul>
                <p>
                  <Link href="/contact">Contact us</Link> for more details or{" "}
                  <Link href="/register">register for admission</Link> to join our batches.
                </p>
              </div>
              <div className="about-card">
                <div className="about-card__grid">
                  <div className="about-card__block">
                    <h3>Mission</h3>
                    <p>
                      To make quality coaching and mentoring accessible to every sincere student and empower them to outperform their own expectations.
                    </p>
                  </div>
                  <div className="about-card__block">
                    <h3>Vision</h3>
                    <p>
                      To be recognised as a trusted academic partner for families and a launchpad for ambitious learners across India.
                    </p>
                  </div>
                </div>
                <div className="about-card__footer">
                  <span>Why students choose us</span>
                  <p>
                    Small batch sizes, approachable faculty and a culture of consistent hard work – not last-minute shortcuts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
