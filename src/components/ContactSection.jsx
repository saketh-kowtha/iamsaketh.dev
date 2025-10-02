import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useMode } from "../hooks/useMode";
import { useTheme } from "../hooks/useTheme";
import { getContent } from "../utils/content";

export default function ContactSection() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const { mode } = useMode();
  const { theme } = useTheme();
  const content = getContent(mode, theme);
  const contactContent = content.contact;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("sending");

      // Validate form data before sending
      const formData = new FormData(formRef.current);
      const fromName = formData.get("from_name");
      const replyTo = formData.get("reply_to");
      const message = formData.get("message");

      if (!fromName || !replyTo || !message) {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
        return;
      }

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC,
        }
      );
      setStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error("Email error:", err);
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="w-full max-w-2xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {contactContent.title}
          </h2>
          <p className="text-base text-muted">{contactContent.subtitle}</p>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-5 p-8 card ornate-border"
        >
          {/* Hidden field for recipient - required by EmailJS */}
          <input
            type="hidden"
            name="to_email"
            value="k.sakeths2010@gmail.com"
          />

          <div>
            <input
              name="from_name"
              className="w-full bg-base text-primary border-2 border-ornate/50 rounded-lg px-4 py-3 placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 hover:border-ornate"
              placeholder={contactContent.form.name}
              required
            />
          </div>

          <div>
            <input
              name="reply_to"
              type="email"
              className="w-full bg-base text-primary border-2 border-ornate/50 rounded-lg px-4 py-3 placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 hover:border-ornate"
              placeholder={contactContent.form.email}
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              rows="5"
              className="w-full bg-base text-primary border-2 border-ornate/50 rounded-lg px-4 py-3 placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none hover:border-ornate"
              placeholder={contactContent.form.message}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : contactContent.form.send}
          </button>

          {status === "sent" && (
            <div className="text-center p-3 bg-accent/10 border border-accent rounded-lg animate-fadeIn">
              <p className="text-accent font-medium">
                {contactContent.form.sent}
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center p-3 bg-danger/10 border border-danger rounded-lg animate-fadeIn">
              <p className="text-danger font-medium">
                {contactContent.form.error}
              </p>
            </div>
          )}
        </form>

        <div className="mt-12 flex justify-center gap-6">
          <a
            href={`mailto:${contactContent.email}`}
            className="text-muted hover:text-accent transition-colors"
            aria-label="Email"
          >
            📧 Email
          </a>
          <a
            href={contactContent.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            💻 GitHub
          </a>
          <a
            href={contactContent.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            💼 LinkedIn
          </a>
          <a
            href={contactContent.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            🐦 Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
