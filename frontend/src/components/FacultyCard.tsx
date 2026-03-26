"use client";

type FacultyCardProps = {
  name: string;
  subject: string;
  experience: string;
  quote: string;
  photoUrl?: string | null;
};

export function FacultyCard({
  name,
  subject,
  experience,
  quote,
  photoUrl,
}: FacultyCardProps) {
  return (
    <article className="faculty-showcase-card">
      <div className="faculty-showcase-card__photo-wrap">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <div
            style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, var(--color-accent-muted), var(--color-bg-elevated))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-accent)",
                fontSize: "2rem",
                fontWeight: 700,
              }}
          >
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="faculty-showcase-card__name">{name}</h3>
      <p className="faculty-showcase-card__subject">{subject}</p>
      <p className="faculty-showcase-card__exp">{experience}</p>
      <p className="faculty-showcase-card__quote">&ldquo;{quote}&rdquo;</p>
    </article>
  );
}
