export default function ContactPage() {
  return (
    <main>
      <h1>Contact</h1>
      <form action="https://api.tryembedio.com/f/frm_your_form_key" method="POST">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />

        {/* Honeypot: hidden from people, filled in by bots */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

        {/* Where to send people after a successful submit (same site) */}
        <input type="hidden" name="_redirect" value="/contact/thanks" />

        <button type="submit">Send</button>
      </form>
    </main>
  );
}
