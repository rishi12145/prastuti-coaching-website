"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header,
  SectionHeading,
  StatCard,
  CourseCard,
  ResultCard,
  RankerCard,
  FacultyCard,
  Slider,
  Footer,
} from "@/components";
import { TESTIMONIALS_SLIDER, TOP_RANKERS as TOP_RANKERS_FALLBACK, FACULTY_SHOWCASE } from "@/data/home";
import { useCounter } from "@/lib/useCounter";

type StatPayload = {
  yearsOfExperience: number;
  totalStudents: number;
  successfulResults: number;
  expertFaculty: number;
};

type Course = {
  _id: string;
  name: string;
  description?: string;
  classOrExam?: string;
  isTrending?: boolean;
  newBatchTag?: string;
  duration?: string;
  fee?: number;
  imageUrl?: string | null;
};

type Result = {
  _id: string;
  studentName: string;
  course?: string;
  achievement?: string;
  rankAchieved?: string;
  stream?: string;
  isTopper?: boolean;
  photoUrl?: string;
};

type Faculty = {
  _id: string;
  name: string;
  subject: string;
  experienceYears?: number;
  photoUrl?: string;
  bio?: string;
};

export default function HomePage() {
  const [stats, setStats] = useState<StatPayload | null>({yearsOfExperience: 10, totalStudents: 1000, successfulResults: 500, expertFaculty: 20});
  const [courses, setCourses] = useState<Course[]>([]);
  const [trending, setTrending] = useState<Course[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [rankers, setRankers] = useState<Result[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [callbackState, setCallbackState] = useState({
    name: "",
    mobile: "",
    courseInterested: "",
    loading: false,
    error: "",
    success: "",
  });

  const yearsCounter = useCounter(stats?.yearsOfExperience ?? 0);
  const studentsCounter = useCounter(stats?.totalStudents ?? 0);
  const resultsCounter = useCounter(stats?.successfulResults ?? 0);
  const facultyCounter = useCounter(stats?.expertFaculty ?? 0);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackState.name.trim() || !callbackState.mobile.trim()) {
      setCallbackState((s) => ({ ...s, error: "Please enter name and mobile.", success: "" }));
      return;
    }
    setCallbackState((s) => ({ ...s, loading: true, error: "", success: "" }));
    try {
      const res = await fetch(`${API_BASE}/public/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackState.name,
          mobile: callbackState.mobile,
          courseInterested: callbackState.courseInterested,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Request failed");
      }
      setCallbackState({
        name: "",
        mobile: "",
        courseInterested: "",
        loading: false,
        error: "",
        success: "We have received your request. Our team will call you shortly.",
      });
    } catch (err: unknown) {
      setCallbackState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  };

  return (
    <div className="app-shell app-shell--landing">
      <Header onNavClick={handleNavClick} />

      <main className="main">
        {/* Hero */}
        <section id="home" className="section hero">
          <div className="container">
            <div className="hero__grid">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="hero__badge">
                  <span className="hero__badge-dot" />
                  India&apos;s future-ready coaching hub
                </div>
                <h1 className="hero__title">
                  Transforming{" "}
                  <span className="hero__title-highlight">students</span> into{" "}
                  <span className="hero__title-highlight">top rankers.</span>
                </h1>
                <p className="hero__subtitle">
                  Structured classroom programs, expert faculty and personalised
                  mentoring for Boards, JEE, NEET and Foundation batches.
                </p>
                <div className="hero__actions">
                  <Link href="/register" className="btn btn--primary">
                    Register for Admission
                  </Link>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => handleNavClick("callback")}
                  >
                    Request Call Back
                  </button>
                </div>
                <div className="hero__meta">
                  <span>Personalised doubt-solving</span>
                  <span>Regular tests &amp; analytics</span>
                  <span>Parent performance meetings</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hero__visual"
              >
                <div className="hero__visual-media" aria-hidden="true">
                  <Image
                    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80"
                    alt="Students ready for coaching classes"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="hero__visual-caption">
                  <span className="hero__visual-badge">New batches open</span>
                  <p className="hero__visual-text">Boards · JEE · NEET · Foundation</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="container">
            <div className="content-grid">
              <div>
                <SectionHeading
                  align="left"
                  kicker="About the institute"
                  title="A decade of building strong fundamentals."
                  subtitle="Prastuti Coaching Institute is dedicated to nurturing students for competitive exams with a balanced focus on concept clarity, practice and confidence."
                />
                <ul className="feature-list">
                  <li className="feature-list__item">
                    <span className="feature-list__title">Concept-first pedagogy</span>
                    <p className="feature-list__desc">
                      Each topic is taught from first principles with real-world
                      examples and exam-oriented tips.
                    </p>
                  </li>
                  <li className="feature-list__item">
                    <span className="feature-list__title">Structured mentoring</span>
                    <p className="feature-list__desc">
                      Regular 1:1 doubt clearing, performance reviews and
                      counselling for students and parents.
                    </p>
                  </li>
                  <li className="feature-list__item">
                    <span className="feature-list__title">Exam simulation</span>
                    <p className="feature-list__desc">
                      Timely mock tests, analytics and personalised improvement
                      plans to close learning gaps.
                    </p>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => handleNavClick("contact")}
                >
                  Read more &amp; contact us
                </button>
              </div>
              <div className="about-card">
                <div className="about-card__grid">
                  <div className="about-card__block">
                    <h3>Mission</h3>
                    <p>
                      To make quality coaching and mentoring accessible to every
                      sincere student and empower them to outperform their own
                      expectations.
                    </p>
                  </div>
                  <div className="about-card__block">
                    <h3>Vision</h3>
                    <p>
                      To be recognised as a trusted academic partner for families
                      and a launchpad for ambitious learners across India.
                    </p>
                  </div>
                </div>
                <div className="about-card__footer">
                  <span>Why students choose us</span>
                  <p>
                    Small batch sizes, approachable faculty and a culture of
                    consistent hard work – not last-minute shortcuts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="highlights" className="section">
          <div className="container">
            <SectionHeading
              kicker="Key highlights"
              title="Numbers that tell our story."
            />
            <div className="stats-grid">
              <StatCard
                ref={yearsCounter.ref}
                value={yearsCounter.value}
                label="Years of experience"
              />
              <StatCard
                ref={studentsCounter.ref}
                value={studentsCounter.value}
                label="Students mentored"
              />
              <StatCard
                ref={resultsCounter.ref}
                value={resultsCounter.value}
                label="Successful results"
              />
              <StatCard
                ref={facultyCounter.ref}
                value={facultyCounter.value}
                label="Expert faculty"
              />
            </div>
          </div>
        </section>

        {/* Top Rankers Slider */}
        <section id="top-rankers" className="section section--alt">
          <div className="container">
            <SectionHeading
              kicker="Student achievements"
              title="Top rankers."
              subtitle="JEE and NEET achievers who made us proud."
            />
            <Slider autoPlayMs={5500} itemsPerSlide={1} className="slider--single">
              {(rankers.length > 0
                ? rankers.map((r) => ({
                    studentName: r.studentName,
                    rank: r.rankAchieved || r.achievement || "Top performer",
                    stream: r.stream || "JEE / NEET",
                    caption: r.achievement || "",
                    photoUrl: r.photoUrl,
                  }))
                : TOP_RANKERS_FALLBACK
              ).map((r, i) => (
                <RankerCard
                  key={i}
                  studentName={r.studentName}
                  rank={r.rank}
                  stream={r.stream}
                  caption={r.caption}
                  photoUrl={r.photoUrl}
                />
              ))}
            </Slider>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="section">
          <div className="container">
            <SectionHeading
              kicker="Courses we offer"
              title="Structured programs for every milestone."
            />
            {courses.length === 0 ? (
              <p className="empty-state">
                Course details will be published soon. Please contact us for the
                latest batch information.
              </p>
            ) : (
              <Slider autoPlayMs={6500} itemsPerSlide={1} className="slider--single">
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    _id={course._id}
                    name={course.name}
                    description={course.description}
                    classOrExam={course.classOrExam}
                    duration={course.duration}
                    fee={course.fee}
                    imageUrl={course.imageUrl}
                  />
                ))}
              </Slider>
            )}
            <div className="section-cta">
              <Link href="/courses" className="btn btn--outline">
                View All Batches
              </Link>
            </div>
          </div>
        </section>

        {/* Courses / Batches Slider */}
        <section id="trending" className="section section--alt">
          <div className="container">
            <SectionHeading
              kicker="Popular right now"
              title="Trending &amp; new batches."
            />
            {(trending.length > 0 || courses.length > 0) ? (
              <Slider autoPlayMs={6000} itemsPerSlide={1} className="slider--single">
                {(trending.length > 0 ? trending : courses).map((course) => (
                  <CourseCard
                    key={course._id}
                    _id={course._id}
                    name={course.name}
                    description={course.description}
                    classOrExam={course.classOrExam}
                    variant={trending.length > 0 ? "trending" : "default"}
                    newBatchTag={course.newBatchTag}
                  />
                ))}
              </Slider>
            ) : (
              <p className="empty-state">
                New batch announcements coming soon. Fill the callback form and
                we&apos;ll notify you.
              </p>
            )}
          </div>
        </section>

        {/* Results */}
        <section id="results" className="section section--alt">
          <div className="container">
            <SectionHeading
              kicker="Meet our stars"
              title="Students who turned effort into results."
            />
            {results.length === 0 ? (
              <p className="empty-state">
                Detailed result highlights will be added soon. Visit the
                institute to view full result records.
              </p>
            ) : (
              <Slider autoPlayMs={6500} itemsPerSlide={1} className="slider--single">
                {results.map((res) => (
                  <ResultCard
                    key={res._id}
                    _id={res._id}
                    studentName={res.studentName}
                    course={res.course}
                    achievement={res.achievement}
                    photoUrl={res.photoUrl}
                  />
                ))}
              </Slider>
            )}
            <div className="section-cta">
              <Link href="/results" className="btn btn--outline">
                View all results
              </Link>
            </div>
          </div>
        </section>

        {/* Faculty Slider */}
        <section id="faculty" className="section section--alt">
          <div className="container">
            <SectionHeading
              kicker="Our faculty"
              title="Experienced teachers. Personal mentors."
              subtitle="Subject experts with a passion for teaching."
            />
            <Slider autoPlayMs={6500} itemsPerSlide={1} className="slider--single">
              {(faculty.length === 0
                ? FACULTY_SHOWCASE.map((f) => ({
                    name: f.name,
                    subject: f.subject,
                    experience: f.experience,
                    quote: f.quote,
                    photoUrl: f.photoUrl,
                    _id: `${f.name}-${f.subject}`,
                  }))
                : faculty.map((f) => ({
                    name: f.name,
                    subject: f.subject,
                    experience: `${Math.max(0, f.experienceYears ?? 0)}+ years experience`,
                    quote: f.bio || "Focused on concept clarity, exam strategy and student confidence.",
                    photoUrl: f.photoUrl,
                    _id: f._id,
                  }))
              ).map((f) => (
                <FacultyCard
                  key={f._id}
                  name={f.name}
                  subject={f.subject}
                  experience={f.experience}
                  quote={f.quote}
                  photoUrl={f.photoUrl}
                />
              ))}
            </Slider>
            <div className="section-cta">
              <Link href="/faculty" className="btn btn--outline">
                View full faculty
              </Link>
            </div>
          </div>
        </section>

        {/* Callback */}
        <section id="callback" className="section">
          <div className="container">
            <div className="content-grid">
              <div>
                <SectionHeading
                  align="left"
                  kicker="Request a call back"
                  title="Talk to our academic counsellor."
                  subtitle="Share your details and our team will help you choose the right program and batch for your goals."
                />
                <ul className="feature-list">
                  <li className="feature-list__item">
                    <span className="feature-list__title">Guidance on course selection</span>
                    <p className="feature-list__desc">
                      Clarify which stream, course or batch is ideal for your
                      exam timeline and current level.
                    </p>
                  </li>
                  <li className="feature-list__item">
                    <span className="feature-list__title">Fee &amp; scholarship details</span>
                    <p className="feature-list__desc">
                      Learn about fee structures, discounts and performance-based
                      scholarships.
                    </p>
                  </li>
                </ul>
              </div>
              <form className="form-card" onSubmit={onCallbackSubmit}>
                <div className="form-group">
                  <label className="form-label">Student Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={callbackState.name}
                    onChange={(e) =>
                      setCallbackState((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={callbackState.mobile}
                    onChange={(e) =>
                      setCallbackState((s) => ({ ...s, mobile: e.target.value }))
                    }
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Course Interested</label>
                  <input
                    type="text"
                    className="form-input"
                    value={callbackState.courseInterested}
                    onChange={(e) =>
                      setCallbackState((s) => ({
                        ...s,
                        courseInterested: e.target.value,
                      }))
                    }
                    placeholder="e.g. NEET 2027, Class 10 Foundation"
                  />
                </div>
                {callbackState.error && (
                  <p className="form-error">{callbackState.error}</p>
                )}
                {callbackState.success && (
                  <p className="form-success">{callbackState.success}</p>
                )}
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={callbackState.loading}
                >
                  {callbackState.loading ? "Submitting…" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section id="testimonials" className="section">
          <div className="container">
            <SectionHeading
              kicker="Testimonials"
              title="What students &amp; parents say."
            />
            <Slider autoPlayMs={6000} itemsPerSlide={2}>
              {TESTIMONIALS_SLIDER.map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <p>&quot;{t.text}&quot;</p>
                  <span>— {t.author}</span>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="container">
            <div className="content-grid">
              <div>
                <SectionHeading
                  align="left"
                  kicker="Contact &amp; location"
                  title="Visit or reach out to us."
                />
                <div className="contact-card">
                  <p>
                    <strong>Address:</strong> Your Institute Address, City,
                    State – PIN
                  </p>
                  <p>
                    <strong>Phone:</strong> +91-XXXXXXXXXX
                  </p>
                  <p>
                    <strong>Email:</strong> info@prastuticoaching.com
                  </p>
                  <div className="social-row">
                    <span>Connect:</span>
                    <a href="#" aria-label="Facebook">Facebook</a>
                    <a href="#" aria-label="Instagram">Instagram</a>
                    <a href="#" aria-label="YouTube">YouTube</a>
                    <a href="#" aria-label="WhatsApp">WhatsApp</a>
                  </div>
                </div>
              </div>
              <div className="map-wrap">
                <iframe
                  title="Institute location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9166540533153!2d88.36389551504635!3d22.57264698518125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIyLjAiTiA4OMKwMjEnNTEuOSJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
