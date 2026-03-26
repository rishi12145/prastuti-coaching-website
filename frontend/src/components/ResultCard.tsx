"use client";

type ResultCardProps = {
  _id: string;
  studentName: string;
  course?: string;
  achievement?: string;
  photoUrl?: string;
};

export function ResultCard({
  studentName,
  course,
  achievement,
}: ResultCardProps) {
  const initial = studentName.charAt(0).toUpperCase();

  return (
    <article className="result-card">
      <div className="result-card__avatar" aria-hidden>
        {initial}
      </div>
      <h3 className="result-card__name">{studentName}</h3>
      {course && <p className="result-card__course">{course}</p>}
      {achievement && (
        <p className="result-card__achievement">{achievement}</p>
      )}
    </article>
  );
}
