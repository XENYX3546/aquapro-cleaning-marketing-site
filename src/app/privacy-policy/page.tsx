import { LegalLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name} - how we collect, use, and protect your data.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2026">
      <p>
        <strong>{siteConfig.legalName}</strong> (Company No. {siteConfig.companyNumber}),
        (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed
        to protecting your privacy. This Privacy Policy explains how we collect, use, and
        safeguard your information when you use our website and cleaning services.
      </p>
      <p>
        We are registered in England and Wales and comply with the UK General Data Protection Regulation
        (UK GDPR), the Data Protection Act 2018, and other applicable data protection laws.
      </p>

      <h2>1. Data Controller Information</h2>
      <p>{siteConfig.legalName} (Company No. {siteConfig.companyNumber}) is the data controller responsible for your personal data.</p>

      <div className="contact-card">
        <p><strong>Contact Details</strong></p>
        <ul>
          <li><strong>Company:</strong> {siteConfig.legalName}</li>
          <li><strong>Company Number:</strong> {siteConfig.companyNumber}</li>
          <li><strong>Email:</strong> {siteConfig.contact.email}</li>
          <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
          <li><strong>Website:</strong> {siteConfig.url}</li>
        </ul>
      </div>

      <h2>2. Information We Collect</h2>
      <p>We collect information that you provide directly to us when you:</p>
      <ul>
        <li>Request a quote or contact us</li>
        <li>Book our cleaning services</li>
        <li>Communicate with us by phone, email, or through our website</li>
      </ul>

      <h3>2.1 Personal Information</h3>
      <p>This may include:</p>
      <ul>
        <li>Name and contact details (email, phone number)</li>
        <li>Service address</li>
        <li>Details about your cleaning requirements</li>
        <li>Payment information (processed securely)</li>
        <li>Any correspondence between us</li>
      </ul>

      <h3>2.2 Technical Information</h3>
      <p>When you visit our website, we may automatically collect:</p>
      <ul>
        <li>IP address (anonymised)</li>
        <li>Browser type and version</li>
        <li>Pages visited and time spent</li>
        <li>Referring website</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide quotes and respond to enquiries</li>
        <li>Deliver our cleaning services</li>
        <li>Process payments</li>
        <li>Send service confirmations and reminders</li>
        <li>Improve our services and website</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>4. Legal Basis for Processing</h2>
      <p>We process your personal data under the following legal bases:</p>
      <ul>
        <li><strong>Contract:</strong> To provide the cleaning services you have requested</li>
        <li><strong>Legitimate Interests:</strong> To respond to enquiries and improve our services</li>
        <li><strong>Legal Obligation:</strong> To comply with tax and business regulations</li>
        <li><strong>Consent:</strong> Where you have given explicit consent for marketing communications</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>We do not sell your personal data. We may share your information with:</p>
      <ul>
        <li><strong>Payment processors:</strong> To process payments securely</li>
        <li><strong>Professional advisers:</strong> Accountants or legal advisers where necessary</li>
        <li><strong>Legal authorities:</strong> If required by law</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>We retain your personal data for as long as necessary to:</p>
      <ul>
        <li>Provide our services to you</li>
        <li>Comply with legal requirements (typically 6 years for financial records)</li>
        <li>Resolve disputes and enforce agreements</li>
      </ul>
      <p>Enquiry data from customers who do not proceed with a booking is deleted after 12 months.</p>

      <h2>7. Your Rights</h2>
      <p>Under UK GDPR, you have the right to:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
        <li><strong>Erasure:</strong> Request deletion of your data (where applicable)</li>
        <li><strong>Restriction:</strong> Request restriction of processing</li>
        <li><strong>Portability:</strong> Request your data in a portable format</li>
        <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
        <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
      </ul>

      <p>To exercise any of these rights, please contact us at {siteConfig.contact.email}.</p>

      <h2>8. Cookies</h2>
      <p>Our website uses essential cookies to ensure it functions properly. We do not use
        tracking cookies or third-party analytics that identify individual users.</p>

      <h2>9. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal data, including:</p>
      <ul>
        <li>Secure HTTPS encryption on our website</li>
        <li>Secure payment processing</li>
        <li>Limited access to personal data</li>
        <li>Regular review of security practices</li>
      </ul>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page
        with an updated revision date.</p>

      <h2>11. Complaints</h2>
      <p>If you have concerns about how we handle your data, please contact us first.
        You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO):</p>
      <div className="info-box">
        <p><strong>Information Commissioner&apos;s Office</strong></p>
        <p>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>
        <p>Phone: 0303 123 1113</p>
      </div>

      <h2>12. Contact Us</h2>
      <p>For any questions about this Privacy Policy or our data practices, please contact us:</p>
      <div className="contact-card">
        <ul>
          <li><strong>Email:</strong> {siteConfig.contact.email}</li>
          <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
        </ul>
      </div>
    </LegalLayout>
  );
}
