import { Resend } from "resend";
import { redirect } from 'next/navigation';

// EMAIL SENDING FUNCTIONALITY
const resend = new Resend(process.env.RESEND_API_KEY);

export const SendEmail = async (formdata: FormData) => {
  const message = formdata.get("message");
  const name = formdata.get("name");
  const SenderEmail = formdata.get("SenderEmail");

  if (!message) {
    return {
      error: "Invalid message",
    };
  }

  try {
    // Send the email using Resend API
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: `mdtaqui.jhar@gmail.com`,
      subject: `${name} From Contact Form.`,
      text: `Sender email: ${SenderEmail}\n${message}`, // Including SenderEmail in the text instead of reply_to
    });

    // Redirect after email sent
    return redirect('/');
  } catch (error) {
    // Handle error (optional)
    return { error: "Failed to send email, please try again." };
  }
};
