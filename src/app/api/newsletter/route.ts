import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/smtp";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // 1. Send Notification Email to Owner
    await sendEmail({
      to: "sahoovenketeswar@gmail.com",
      subject: "New Newsletter Subscriber! - The Accent Wall Agency",
      text: `You have a new newsletter subscriber!\n\nEmail: ${email}\n\nTime: ${new Date().toISOString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; background-color: #000000; border: 1px solid #141414; border-radius: 16px; overflow: hidden; position: relative;">
            <div style="margin-bottom: 24px; display: inline-block; color: #7ccf00; opacity: 0.85;">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.75" style="display: block; margin: 0 auto;">
                <circle cx="50" cy="50" r="45" stroke-dasharray="1 2" opacity="0.3" />
                <circle cx="50" cy="50" r="35" stroke-dasharray="2 2" opacity="0.4" />
                <circle cx="50" cy="50" r="25" opacity="0.5" />
                <circle cx="50" cy="50" r="12" stroke-dasharray="1 1" opacity="0.6" />
                <path d="M50 5 L50 95 M5 50 L95 50 M18.2 18.2 L81.8 81.8 M18.2 81.8 L81.8 18.2" opacity="0.25" />
                <path d="M50 15 C40 30, 40 40, 50 50 C60 40, 60 30, 50 15" opacity="0.35" />
                <path d="M50 85 C40 70, 40 60, 50 50 C60 60, 60 70, 50 85" opacity="0.35" />
                <path d="M15 50 C30 40, 40 40, 50 50 C40 60, 30 60, 15 50" opacity="0.35" />
                <path d="M85 50 C70 40, 60 40, 50 50 C60 60, 70 60, 85 50" opacity="0.35" />
              </svg>
            </div>
            <h2 style="color: #7ccf00; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 16px 0;">New Subscriber Alert</h2>
            <p style="font-size: 15px; font-weight: 300; color: #cccccc; line-height: 1.6; max-width: 460px; margin: 0 auto 24px auto;">
              You have a new newsletter subscriber on <strong>The Accent Wall Agency</strong> website!
            </p>
            <div style="background-color: #111111; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 16px; margin: 20px auto; max-width: 400px; border: 1px solid #1a1a1a; color: #7ccf00;">
              <strong>${email}</strong>
            </div>
            <p style="font-size: 11px; color: #555555; margin: 0;">Received at: ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `,
    });

    // 2. Send Welcome/Thank You Email to Subscriber
    try {
      await sendEmail({
        to: email,
        subject: "Thank you for subscribing! - The Accent Wall Agency",
        text: `Thank you for subscribing to The Accent Wall Agency newsletter!\n\nWe will keep you updated on our latest hand-painted murals, spatial generative AI progress, and physical showroom launch.\n\nBest regards,\nVenketeswar Sahoo\nThe Accent Wall Agency`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; background-color: #000000; border: 1px solid #141414; border-radius: 16px; overflow: hidden; position: relative;">
              <div style="margin-bottom: 24px; display: inline-block; color: #7ccf00; opacity: 0.85;">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.75" style="display: block; margin: 0 auto;">
                  <circle cx="50" cy="50" r="45" stroke-dasharray="1 2" opacity="0.3" />
                  <circle cx="50" cy="50" r="35" stroke-dasharray="2 2" opacity="0.4" />
                  <circle cx="50" cy="50" r="25" opacity="0.5" />
                  <circle cx="50" cy="50" r="12" stroke-dasharray="1 1" opacity="0.6" />
                  <path d="M50 5 L50 95 M5 50 L95 50 M18.2 18.2 L81.8 81.8 M18.2 81.8 L81.8 18.2" opacity="0.25" />
                  <path d="M50 15 C40 30, 40 40, 50 50 C60 40, 60 30, 50 15" opacity="0.35" />
                  <path d="M50 85 C40 70, 40 60, 50 50 C60 60, 60 70, 50 85" opacity="0.35" />
                  <path d="M15 50 C30 40, 40 40, 50 50 C40 60, 30 60, 15 50" opacity="0.35" />
                  <path d="M85 50 C70 40, 60 40, 50 50 C60 60, 70 60, 85 50" opacity="0.35" />
                </svg>
              </div>
              <h2 style="color: #7ccf00; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 16px 0;">Welcome to The Accent Wall Agency</h2>
              <p style="font-size: 15px; font-weight: 300; color: #cccccc; line-height: 1.6; max-width: 480px; margin: 0 auto 30px auto;">
                Thank you for joining our community! We are excited to keep you updated on our hand-painted sacred geometry murals, generative AI updates, and upcoming physical gallery openings.
              </p>
              <div style="border-top: 1px solid #141414; padding-top: 24px; margin-top: 30px;">
                <p style="font-size: 14px; font-weight: 600; color: #ffffff; margin: 0 0 4px 0;">Venketeswar Sahoo</p>
                <p style="font-size: 11px; font-weight: 400; color: #555555; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Founder & Generative Artist · The Accent Wall Agency</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (welcomeErr) {
      console.error("Error sending welcome email to subscriber:", welcomeErr);
      // Don't fail the registration if the subscriber welcome email bounces/fails
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json({ error: error.message || "Failed to subscribe" }, { status: 500 });
  }
}
