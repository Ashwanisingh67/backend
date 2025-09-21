const FixMyTeethConsultationEmail = ({
  name,
  email,
  selectedProblems,
  selectedState,
  otherProblemText,
  photo,
  consultationId,
}) => {
  // Format problems list
  const formatProblems = (selectedProblems) => {
    const problemlu=selectedProblems.split(',')
  if (!Array.isArray(problemlu) || problemlu.length === 0)

    return "No specific problems mentioned";
  return problemlu.map(problem => `• ${problem}`).join("<br>");
};


  // Format photos section
  const formatPhotos = (photo) => {
    if (!photo || photo.length === 0) return "No photos provided";
    return photo
      .map(
        (photoUrl, index) => `
      <div style="margin: 10px 0; text-align: center;">
        <img src="${photoUrl}" alt="Dental Photo ${
          index + 1
        }" style="max-width: 300px; max-height: 200px; border-radius: 8px; border: 2px solid #e0f7fa; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <p style="margin: 5px 0 0; font-size: 12px; color: #666;">Photo ${
          index + 1
        }</p>
      </div>
    `
      )
      .join("");
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fix My Teeth - Consultation Request Confirmation</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
      </style>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5fafa; margin: 0; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,100,100,0.1); overflow: hidden; border: 1px solid #e0f7fa;">
              <!-- Header with Dental Theme -->
              <tr>
                <td style="background: linear-gradient(to right, #1455bcff, #060ea5ff); color: white; padding: 30px; text-align: center;">
                  <img src="https://example.com/logo.png" alt="Dental Tourism India" width="120" style="margin-bottom: 15px;">
                  <h2 style="margin: 10px 0 0; font-size: 28px; font-weight: 600;">Fix My Teeth Consultation</h2>
                  <p style="margin: 5px 0 0; font-size: 16px;">Your Dental Consultation Request is Received</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin-bottom: 15px; color: #333;">Dear ${name},</p>
                  <p style="margin-bottom: 20px; color: #555; line-height: 1.6;">
                    Thank you for submitting your "Fix My Teeth" consultation request. Our dental experts will review your case and provide you with a comprehensive treatment plan tailored to your specific needs.
                  </p>

                  <!-- Consultation Details -->
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #e0f7fa; border-radius: 8px; margin: 20px 0; border: 1px solid #b2ebf2;">
                    <tr>
                      <td colspan="2" style="border-bottom: 1px solid #b2ebf2;">
                        <strong style="color: #00796b; font-size: 16px;">Consultation Request Details</strong>
                      </td>
                    </tr>
                    
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td>${name}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>${email}</td>
                    </tr>
                    <tr>
                      <td><strong>State:</strong></td>
                      <td>${selectedState}</td>
                    </tr>
                    <tr>
                      <td><strong>Submitted:</strong></td>
                      <td>${new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</td>
                    </tr>
                  </table>

                  <!-- Dental Problems Section -->
                  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00796b;">
                    <h3 style="margin-top: 0; color: #00796b;">Dental Problems Reported</h3>
                    <div style="color: #555; line-height: 1.6;">
                      ${formatProblems(selectedProblems)}
                    </div>
                    ${
                      otherProblemText
                        ? `
                      <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e9; border-radius: 5px;">
                        <strong>Additional Details:</strong><br>
                        ${otherProblemText}
                      </div>
                    `
                        : ""
                    }
                  </div>

                  <!-- Photos Section -->
                  ${
                    photo && photo.length > 0
                      ? `
                  <div style="background-color: #fff8e1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                    <h3 style="margin-top: 0; color: #ff6f00;">Submitted Photos</h3>
                    <p style="color: #555; margin-bottom: 15px;">Our dental experts will analyze these photos to better understand your dental concerns.</p>
                    ${formatPhotos(photo)}
                  </div>
                  `
                      : ""
                  }

                  <!-- Next Steps -->
                  <div style="background-color: #f1f8e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4b42b3ff;">
                    <h3 style="margin-top: 0; color: #1e1f69ff;">What Happens Next?</h3>
                    <ol style="margin-bottom: 0; padding-left: 20px; color: #555; line-height: 1.6;">
                      <li><strong>Expert Review (24-48 hours):</strong> Our dental specialists will review your case details and photos</li>
                      <li><strong>Personalized Treatment Plan:</strong> You'll receive a detailed treatment plan with options and cost estimates</li>
                      <li><strong>Consultation Call:</strong> Our patient coordinator will contact you to discuss your treatment plan</li>
                      <li><strong>Treatment Scheduling:</strong> Once you're ready, we'll help you schedule your dental treatment</li>
                    </ol>
                  </div>

                  <!-- Important Notes -->
                  <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800;">
                    <h3 style="margin-top: 0; color: #e65100;">Important Information</h3>
                    <ul style="margin-bottom: 0; padding-left: 20px; color: #555;">
                      <li>All consultations are completely free and confidential</li>
                      <li>Treatment plans are customized based on your specific needs</li>
                      <li>We work with certified dental clinics across India</li>
                      <li>Cost estimates include all procedures and follow-up care</li>
                    </ul>
                  </div>

                  <!-- Contact Info -->
                  <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #1976d2;">Need Immediate Assistance?</h3>
                    <p style="margin-bottom: 10px; color: #555;">If you have any urgent questions or concerns, please don't hesitate to contact us:</p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> +91 9876543210</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> care@dentaltourismindia.com</p>
                    <p style="margin: 5px 0;"><strong>WhatsApp:</strong> +91 9876543210</p>
                  </div>

                  <!-- Call to Action -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://dentaltourismindia.com/my-account" style="display: inline-block; padding: 12px 30px; background: linear-gradient(to right, #000079ff, #003c96ff); color: white; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 0 10px;">
                          Track Your Request
                        </a>
                        <a href="https://dentaltourismindia.com/contact" style="display: inline-block; padding: 12px 30px; background: #ffffff; color: #001a79ff; text-decoration: none; border-radius: 50px; font-weight: 500; border: 2px solid #004379ff; margin: 0 10px;">
                          Contact Support
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; color: #666; font-size: 12px; background-color: #e0f2f1; border-top: 1px solid #b2dfdb;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} Dental Tourism India. All rights reserved.</p>
                  <p style="margin: 5px 0 0;">3B2 Sector 60 Urja Clinic, Mohali, Punjab , 160059, India</p>
                  <p style="margin: 5px 0 0;">
                    <a href="https://dentaltourismindia.com" style="color: #001a79ff; text-decoration: none;">www.dentaltourismindia.com</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = FixMyTeethConsultationEmail;