import tls from "tls";

interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export function sendEmail({ to, subject, text, html }: SendMailOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "";
    const pass = process.env.SMTP_PASS || "";
    const from = process.env.SMTP_FROM || user;

    if (!user || !pass) {
      return reject(new Error("SMTP credentials are not configured in environment variables."));
    }

    // Connect securely using TLS on port 465
    // Note: Gmail SMTP works perfectly on 465 via direct secure TLS
    const socket = tls.connect(
      {
        host,
        port: port === 587 ? 465 : port, // Gmail SMTP works seamlessly on port 465 via direct TLS
        rejectUnauthorized: false,
      },
      () => {
        // Connection established successfully
      }
    );

    let stage = 0;
    const send = (data: string) => {
      socket.write(data + "\r\n");
    };

    socket.setEncoding("utf8");

    socket.on("data", (chunk: string) => {
      const lines = chunk.split("\r\n").filter(Boolean);
      for (const line of lines) {
        const code = parseInt(line.substring(0, 3), 10);

        if (stage === 0) {
          if (code === 220) {
            send("EHLO localhost");
            stage = 1;
          } else {
            socket.destroy();
            reject(new Error(`SMTP connection failed: ${line}`));
            return;
          }
        } else if (stage === 1) {
          if (code === 250) {
            send("AUTH LOGIN");
            stage = 2;
          }
        } else if (stage === 2) {
          if (code === 334) {
            send(Buffer.from(user).toString("base64"));
            stage = 3;
          }
        } else if (stage === 3) {
          if (code === 334) {
            send(Buffer.from(pass).toString("base64"));
            stage = 4;
          }
        } else if (stage === 4) {
          if (code === 235) {
            send(`MAIL FROM:<${from}>`);
            stage = 5;
          } else {
            socket.destroy();
            reject(new Error(`SMTP Authentication failed: ${line}`));
            return;
          }
        } else if (stage === 5) {
          if (code === 250) {
            send(`RCPT TO:<${to}>`);
            stage = 6;
          }
        } else if (stage === 6) {
          if (code === 250) {
            send("DATA");
            stage = 7;
          }
        } else if (stage === 7) {
          if (code === 354) {
            const headers = [
              `From: ${from}`,
              `To: ${to}`,
              `Subject: ${subject}`,
              "MIME-Version: 1.0",
              html
                ? "Content-Type: text/html; charset=utf-8"
                : "Content-Type: text/plain; charset=utf-8",
              "",
              html || text,
              ".",
            ].join("\r\n");

            send(headers);
            stage = 8;
          }
        } else if (stage === 8) {
          if (code === 250) {
            send("QUIT");
            stage = 9;
          }
        } else if (stage === 9) {
          socket.end();
          resolve();
          return;
        }
      }
    });

    socket.on("error", (err) => {
      reject(err);
    });

    socket.on("close", () => {
      if (stage < 9) {
        reject(new Error("SMTP connection closed unexpectedly."));
      }
    });
  });
}
