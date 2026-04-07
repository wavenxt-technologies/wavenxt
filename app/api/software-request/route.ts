import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, requestType, message, product } = body;

    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    await transporter.sendMail({
      from: `"Wavenxt Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Software Request — ${product || "Unknown Product"}`,
      html: `
        <h2>New Software Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Product</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${product || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${phone || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Request Type</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${requestType || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Message</td><td style="padding:8px 12px;">${message || "—"}</td></tr>
        </table>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Software request email error:", error);
    return Response.json(
      { error: "Failed to send request. Please try again." },
      { status: 500 },
    );
  }
}
