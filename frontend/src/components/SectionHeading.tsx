"use client";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading--${align}`}
      data-section-heading
    >
      <p className="section-heading__kicker">{kicker}</p>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
