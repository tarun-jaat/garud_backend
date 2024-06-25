
module.exports.adminEmailResEmail =(
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
  ) => {
      return`
     <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Request</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
  
          .header img {
              max-width: 150px;
          }
  
          h2 {
              color: #333;
          }
  
          ul {
              list-style-type: none;
              padding: 0;
          }
  
          li {
              margin-bottom: 10px;
          }
  
          li strong {
              font-weight: bold;
              margin-right: 5px;
          }
  
          p {
              margin-bottom: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://i.ibb.co/gF1McwB/Logo2.png" alt="Your Logo">
          </div>
          <h2>New Contact Request</h2>
          <p>You have received a new contact request. Here are the details:</p>
          <ul>
              <li><strong>Name:</strong> ${firstname} ${lastname}</li>
              <li><strong>Email:</strong> ${email}</li>
                          <li><strong>PhoneNo:</strong> ${phoneNo}</li>
  
              <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>Please take necessary actions to respond to this request promptly.</p>
      </div>
      Best regards,
  Garud Classes
  </body>
  </html>`
  
  
  
  
  }