import nodemailer from 'nodemailer'
class EmailService {

    //This funtion is set the email service with the help of nodeemailer
    constructor(){
        this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    }

    //this funtion cheak the service connetion is okay or not
    async verifyConnetion(){
    try {
      await this.transporter.verify();
      console.log('Email service is ready');
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
    }


    //this funtion is send the email to the admin
    async sendContactNotification(contactData) {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Contact: ${contactData.name}`,
      html: this.generateContactEmailTemplate(contactData),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

    //this funtion is autoreply the user
  async sendAutoReply(contactData) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for contacting us!',
      html: this.generateAutoReplyTemplate(contactData),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Auto-reply sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending auto-reply:', error);
      throw error;
    }
  }

  //template for admin email
    generateContactEmailTemplate(contactData) {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin-bottom: 10px;">New Contact Form Submission</h1>
            <div style="width: 50px; height: 3px; background: linear-gradient(to right, #3498db, #8e44ad); margin: 0 auto;"></div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #34495e; margin-top: 0; font-size: 18px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #7f8c8d; font-weight: 600;">Name:</td>
                <td style="padding: 8px 0; color: #2c3e50;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7f8c8d; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${contactData.email}" style="color: #3498db; text-decoration: none;">${contactData.email}</a></td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; color: #7f8c8d; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${contactData.phone}" style="color: #3498db; text-decoration: none;">${contactData.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #7f8c8d; font-weight: 600;">Date:</td>
                <td style="padding: 8px 0; color: #2c3e50;">${new Date(contactData.timestamp).toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h2 style="color: #34495e; margin-top: 0; font-size: 18px;">Message</h2>
            <p style="line-height: 1.6; color: #2c3e50; margin-bottom: 0;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #95a5a6; font-size: 14px; margin: 0;">
              This email was automatically generated from the Electric Bike website contact form.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  //template for user email
   generateAutoReplyTemplate(contactData) {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin-bottom: 10px;">Thank You for Contacting Us!</h1>
            <div style="width: 50px; height: 3px; background: linear-gradient(to right, #3498db, #8e44ad); margin: 0 auto;"></div>
          </div>
          
          <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">Hi ${contactData.name},</p>
          
          <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to us! We've received your message and our team will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #34495e; margin-top: 0;">Your Message Summary:</h3>
            <p style="color: #7f8c8d; margin-bottom: 0; font-style: italic;">"${contactData.message}"</p>
          </div>
          
          <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
            In the meantime, feel free to explore our website or follow us on social media for the latest updates about our electric bikes.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #2c3e50; font-weight: 600; margin-bottom: 10px;">Best regards,</p>
            <p style="color: #3498db; font-weight: 600; font-size: 18px;">The Electric Bike Team</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #95a5a6; font-size: 14px; margin: 0;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;
  }

}
export default EmailService;