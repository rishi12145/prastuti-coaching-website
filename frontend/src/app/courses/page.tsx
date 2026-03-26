"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header, Footer, SectionHeading, CourseCard } from "@/components";
import { API_BASE } from "@/lib/api";

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [trending, setTrending] = useState<Course[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [coursesRes, trendingRes] = await Promise.all([
          fetch(`${API_BASE}/public/courses`),
          fetch(`${API_BASE}/public/courses/trending`),
        ]);
        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (trendingRes.ok) setTrending(await trendingRes.json());
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
            <h1 className="page-hero__title">Courses</h1>
            <p className="page-hero__subtitle">
              Structured programs for Boards, JEE, NEET and Foundation. Find the right batch for your goals.
            </p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <SectionHeading
              kicker="All programs"
              title="Courses we offer"
              subtitle="Choose a program that matches your class and exam target."
            />
            <div className="courses-grid">
              {courses.length === 0 ? (
                <p className="empty-state">
                  Course details will be published soon. Please <Link href="/contact">contact us</Link> for the latest batch information or <Link href="/register">register for admission</Link>.
                </p>
              ) : (
                courses.map((course) => (
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
                ))
              )}
            </div>
            <SectionHeading
              kicker="Popular right now"
              title="Trending & new batches"
            />
            <div className="courses-grid">
              {trending.length === 0 ? (
                <p className="empty-state">
                  New batch announcements coming soon. <Link href="/contact">Request a callback</Link> and we&apos;ll notify you.
                </p>
              ) : (
                trending.map((course) => (
                  <CourseCard
                    key={course._id}
                    _id={course._id}
                    name={course.name}
                    description={course.description}
                    classOrExam={course.classOrExam}
                    duration={course.duration}
                    fee={course.fee}
                    imageUrl={course.imageUrl}
                    variant="trending"
                    newBatchTag={course.newBatchTag}
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
