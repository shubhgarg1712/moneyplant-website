import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, phone, email, service, message } = req.body;

  // Validation
  if (!fullName || !phone || !email || !service || !message) {
    return res.status(400).json({ 
      error: 'All fields (fullName, phone, email, service, message) are required.' 
    });
  }

  const submittedOn = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const sanitizeSubjectValue = (value: string): string => {
    return value
      .replace(/[\r\n\t\x00-\x1F\x7F]+/g, ' ')
      .replace(/[\u2028\u2029]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const cleanCustomerName = sanitizeSubjectValue(String(fullName)).slice(0, 80) || 'Customer';
  const cleanService = sanitizeSubjectValue(String(service)).slice(0, 50) || 'General Inquiry';
  const targetEmail = "info.mpfinserve@gmail.com";
  const subject = cleanCustomerName;

  // Forwarding payload
  const payload = {
    _subject: subject,
    _name: cleanCustomerName,
    _replyto: String(email).trim(),
    _template: 'table',
    _captcha: 'false',
    "Name": cleanCustomerName,
    "Phone": String(phone).trim(),
    "Email": String(email).trim(),
    "Service Required": cleanService,
    "Message": String(message).trim(),
    "Submitted from": "MoneyPlant Website",
    "Submitted On": submittedOn
  };

  try {
    const relayResponse = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await relayResponse.json().catch(() => null);

    if (relayResponse.ok && (data?.success === 'true' || data?.success === true || data?.message?.includes('activate'))) {
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for contacting MoneyPlant. Your enquiry has been received. Our team will get back to you shortly.' 
      });
    }

    return res.status(500).json({ 
      error: 'Something went wrong. Please try again or contact us directly.' 
    });
  } catch (error) {
    console.error('API Contact relay error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong. Please try again or contact us directly.' 
    });
  }
}
