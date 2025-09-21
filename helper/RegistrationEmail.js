const DentalTourismRegistrationEmail = ({
  name,
  email,
  phoneNumber,
  centerName,
  labName,
  ownerName,
  OwnerName,
  ClinicName,
  phone,

  brandName
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Dental Tourism India</title>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5fafa; margin: 0; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,100,100,0.1); overflow: hidden; border: 1px solid #e0f7fa;">
              <!-- Header with Dental Theme -->
              <tr>
                <td style="background: linear-gradient(to right, #1455bcff, #060ea5ff); color: white; padding: 30px; text-align: center;">
                  <h2 style="margin: 10px 0 0; font-size: 28px; font-weight: 600;">Welcome to Dental Tourism India!</h2>
                  <p style="margin: 5px 0 0; font-size: 16px;">Your Journey to a Perfect Smile Begins Here</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding: 30px;">
                 <p style="margin-bottom: 15px; color: #333;">
 Dear ${name || ownerName || OwnerName || "sir/madam"},


</p>
                  <p style="margin-bottom: 20px; color: #555; line-height: 1.6;">
                    Thank you for choosing Dental Tourism India for your dental treatment. 
                    We're honored to be part of your healthcare journey and look forward to serving you.
                  </p>

                  <!-- Patient Details -->
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #e0f7fa; border-radius: 8px; margin: 20px 0; border: 1px solid #b2ebf2;">
                    <tr>
                      <td colspan="2" style="border-bottom: 1px solid #b2ebf2;">
                        <strong style="color: #00796b; font-size: 16px;">Your Registration Details</strong>
                      </td>
                    </tr>
                    <tr>
                    ${labName ? `
                    <tr>
                      <td width="30%"><strong>Lab Name:</strong></td>
                      <td>${labName}</td>
                    </tr>
                    ` : ''}
                    
                    ${!labName && name ? `
                    <tr>
                      <td width="30%"><strong>Name:</strong></td>
                      <td>${name}</td>
                    </tr>
                    ` : ''}
                   

                    ${
                         ClinicName
                           ? `
                    <tr>
                      <td><strong>Clinic Name:</strong></td>
                      <td>${ClinicName}</td>
                    </tr>
                    `
                           : ""
                       }
                    
                    ${!labName && !name && brandName ? `
                    <tr>
                      <td width="30%"><strong>Brand Name:</strong></td>
                      <td>${brandName}</td>
                    </tr>
                    ` : ''}

                       ${
                         centerName
                           ? `
                    <tr>
                      <td><strong>Center Name:</strong></td>
                      <td>${centerName}</td>
                    </tr>
                    `
                           : ""
                       }
                       
                    ${
                      ownerName || OwnerName
                        ? `
                    <tr>
                      <td><strong>Owner Name:</strong></td>
                      <td>${ownerName || OwnerName}</td>
                    </tr>
                    `
                        : ""
                    }
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>${email}</td>
                    </tr>
                    <tr>
                      <td><strong>Phone:</strong></td>
                      <td>${phoneNumber ||phone || "Not provided"}</td>
                    </tr>
                  </table>

                  <!-- Next Steps -->
                  <div style="background-color: #f1f8e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4b42b3ff;">
                    <h3 style="margin-top: 0; color: #1e1f69ff;">Next Steps:</h3>
                    <ol style="margin-bottom: 0; padding-left: 20px; color: #555;">
                      <li>Our patient coordinator will contact you within 24 hours</li>
                      <li>We'll finalize your treatment plan and estimate</li>
                      <li>Receive your travel itinerary and accommodation details</li>
                    </ol>
                  </div>

                  <!-- Contact Info -->
                  <!--<table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #e8f5e9; border-radius: 8px; padding: 15px;">
                    <tr>
                      <td>
                        <h3 style="margin-top: 0; color: #2f2e7dff;">Our India Office</h3>
                        <p style="margin-bottom: 5px;"><strong>Address:</strong> Urja Clinic 3B2 Mohali,Punjab,160058 India</p>
                        <p style="margin-bottom: 5px;"><strong>Phone:</strong> +91 1234567890</p>
                        <p style="margin-bottom: 5px;"><strong>Email:</strong> care@dentaltourismindia.com</p>
                        <p style="margin-bottom: 0;"><strong>24/7 Patient Support:</strong> +91 9876543210</p>
                      </td>
                    </tr>-->
                  </table>

                  <!-- Call to Action -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://dentaltourismindia.com/contact" style="display: inline-block; padding: 12px 30px; background: #ffffff; color: #001a79ff; text-decoration: none; border-radius: 50px; font-weight: 500; border: 2px solid #004379ff; margin: 0 10px;">
                          Contact Us
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

module.exports = DentalTourismRegistrationEmail;
