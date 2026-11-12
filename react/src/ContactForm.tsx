import { useState, type FormEvent } from "react";

const ENDPOINT = "https://api.tryembedio.com/f/frm_your_form_key";

type Status =
  | { state: "idle" | "sending" | "sent" }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending" });

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (response.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }

      if (response.status === 429) {
        setStatus({ state: "error", message: "Too many attempts. Try again in a minute." });
        return;
      }

      const body = await response.json().catch(() => ({}));
      const message =
        body.error === "validation_failed"
          ? body.fields.map((f: { message: string }) => f.message).join(" ")
          : "Something went wrong. Please try again.";
      setStatus({ state: "error", message });
    } catch {
      setStatus({ state: "error", message: "Network error. Check your connection and retry." });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required />

      {/* Honeypot: hidden from people, filled in by bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

      <button type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send"}
      </button>

      <p role="status" aria-live="polite">
        {status.state === "sent" && "Thanks! Your message is on its way."}
        {status.state === "error" && status.message}
      </p>
    </form>
  );
}
