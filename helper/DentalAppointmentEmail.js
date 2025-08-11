const DentalAppointmentEmail = ({
  personName,
  personEmail,
  personPhone,
  date,
  time,
  clinicName,
  doctorName,
  bookingFor,
  bookedBy,
  address
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Your Dental Appointment Confirmation</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
      </style>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5fafa; margin: 0; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,100,100,0.1); overflow: hidden; border: 1px solid #e0f7fa;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(to right, #0066cc, #004080); color: white; padding: 30px; text-align: center;">
                  <h2 style="margin: 0; font-size: 28px; font-weight: 600;">Appointment Confirmed</h2>
                  <p style="margin: 5px 0 0; font-size: 16px;">We look forward to seeing you!</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin-bottom: 15px; color: #333;">Dear ${bookedBy},</p>
                  <p style="margin-bottom: 20px; color: #555; line-height: 1.6;">
                    Your dental appointment has been successfully scheduled. Below are your appointment details:
                  </p>

                  <!-- Appointment Details -->
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f0f9ff; border-radius: 8px; margin: 20px 0; border: 1px solid #cce7ff;">
                    <tr>
                      <td colspan="2" style="border-bottom: 1px solid #cce7ff;">
                        <strong style="color: #0066cc; font-size: 16px;">Appointment Summary</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width="30%"><strong>Clinic:</strong></td>
                      <td>${clinicName}</td>
                    </tr>
                    <tr>
                      <td><strong>Doctor:</strong></td>
                      <td>Dr. ${doctorName}</td>
                    </tr>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>${date}</td>
                    </tr>
                    <tr>
                      <td><strong>Time:</strong></td>
                      <td>${time}</td>
                    </tr>
                  </table>

                  <!-- Patient Details -->
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
                    <tr>
                      <td colspan="2" style="border-bottom: 1px solid #e0e0e0;">
                        <strong style="color: #333; font-size: 16px;">Your Information</strong>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Service:</strong></td>
                      <td>${bookingFor || 'General Dental Checkup'}</td>
                    </tr>
                    <tr>
                      <td width="30%"><strong>Name:</strong></td>
                      <td>${personName}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>${personEmail}</td>
                    </tr>
                    <tr>
                      <td><strong>Phone:</strong></td>
                      <td>${personPhone}</td>
                    </tr>
                  </table>

                  <!-- Important Notes -->
                  <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                    <h3 style="margin-top: 0; color: #ff6f00;">Important Reminders:</h3>
                    <ul style="margin-bottom: 0; padding-left: 20px; color: #555;">
                      <li>Please arrive 15 minutes before your scheduled time</li>
                      <li>Bring your ID and any relevant medical records</li>
                      <li>Cancel at least 24 hours in advance if needed</li>
                    </ul>
                  </div>

                  <!-- Call to Action -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://${clinicName.toLowerCase().replace(/\s+/g, '')}.com/contact" style="display: inline-block; padding: 12px 30px; background: #ffffff; color: #0066cc; text-decoration: none; border-radius: 50px; font-weight: 500; border: 2px solid #0066cc; margin: 0 10px;">
                          Contact Clinic
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; color: #666; font-size: 12px; background-color: #e6f2ff; border-top: 1px solid #cce0ff;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} ${clinicName}. All rights reserved.</p>
                  <p style="margin: 5px 0 0;">${address ||"Dental Tourism Clinics India"}</p>
                  <p style="margin: 5px 0 0;">
                    <a href="https://${clinicName.toLowerCase().replace(/\s+/g, '')}.com" style="color: #0066cc; text-decoration: none;">Visit our website</a>
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

module.exports = DentalAppointmentEmail;