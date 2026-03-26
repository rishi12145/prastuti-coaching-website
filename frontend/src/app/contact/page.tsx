import { Header, Footer, SectionHeading } from "@/components";

export const metadata = {
  title: "Contact | Prastuti Coaching Institute",
  description: "Visit or reach out – address, phone, email and map.",
};

export default function ContactPage() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero__title">Contact</h1>
            <p className="page-hero__subtitle">
              Visit or reach out to us. We are here to help with admissions and queries.
            </p>
          </div>
        </section>
        <section className="page-content section">
          <div className="container">
            <div className="content-grid">
              <div>
                <SectionHeading
                  align="left"
                  kicker="Contact & location"
                  title="Visit or reach out to us."
                />
                <div className="contact-card">
                  <p>
                    <strong>Address:</strong> Your Institute Address, City, State – PIN
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
