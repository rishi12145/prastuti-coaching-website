"use client";

type RankerCardProps = {
  studentName: string;
  rank: string;
  stream: string;
  caption: string;
  photoUrl?: string | null;
};

export function RankerCard({
  studentName,
  rank,
  stream,
  caption,
  photoUrl,
}: RankerCardProps) {
  return (
    <article className="ranker-card">
      <div className="ranker-card__photo-wrap">
        {photoUrl ? (
          <img src={photoUrl} alt={studentName} />
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
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {studentName.charAt(0)}
          </div>
        )}
      </div>
      <div className="ranker-card__body">
        <h3 className="ranker-card__name">{studentName}</h3>
        <p className="ranker-card__rank">{rank}</p>
        <p className="ranker-card__stream">{stream}</p>
        <p className="ranker-card__caption">{caption}</p>
      </div>
    </article>
  );
}
