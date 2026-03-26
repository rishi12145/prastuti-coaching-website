"use client";

import Link from "next/link";

type CourseCardProps = {
  _id: string;
  name: string;
  description?: string;
  classOrExam?: string;
  duration?: string;
  fee?: number;
  imageUrl?: string | null;
  variant?: "default" | "trending";
  newBatchTag?: string;
};

export function CourseCard({
  name,
  description,
  classOrExam,
  duration,
  fee,
  imageUrl,
  variant = "default",
  newBatchTag = "New Batch",
}: CourseCardProps) {
  const isTrending = variant === "trending";
  const desc =
    description ||
    (isTrending
      ? "Ideal for serious aspirants looking for a focused and disciplined environment."
      : "Comprehensive coverage with regular tests, doubt-solving and mentoring.");

  return (
    <article
      className={`course-card ${isTrending ? "course-card--trending" : ""}`}
    >
      {imageUrl ? (
        <div className="course-card__media" aria-hidden="true">
          <img src={imageUrl} alt="" />
        </div>
      ) : (
        <div className="course-card__media course-card__media--placeholder" aria-hidden="true" />
      )}
      <div className="course-card__header">
        <h3 className="course-card__title">{name}</h3>
        {isTrending ? (
          <span className="course-card__badge course-card__badge--new">
            {newBatchTag}
          </span>
        ) : (
          classOrExam && (
            <span className="course-card__badge">{classOrExam}</span>
          )
        )}
      </div>
      <p className="course-card__body">{desc}</p>
      {(duration || typeof fee === "number") && (
        <div className="course-card__meta">
          {duration && <span className="course-card__meta-item">Duration: {duration}</span>}
          {typeof fee === "number" && <span className="course-card__meta-item">Fee: ₹{fee.toLocaleString("en-IN")}</span>}
        </div>
      )}
      <div className="course-card__footer">
        {isTrending ? (
          <Link href="/register" className="btn btn--primary">
            Enroll Now
          </Link>
        ) : (
          <button type="button" className="btn btn--outline">
            View Details
          </button>
        )}
      </div>
    </article>
  );
}
