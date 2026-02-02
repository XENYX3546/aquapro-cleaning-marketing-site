import { LegalLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and Conditions for ${siteConfig.name} cleaning services.`,
  alternates: {
    canonical: `${siteConfig.url}/terms-conditions`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="January 2026">
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of cleaning services provided by
        <strong> {siteConfig.legalName}</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
        a company registered in England and Wales.
      </p>
      <p>
        By booking our services, you agree to be bound by these Terms. Please read them carefully before
        making a booking.
      </p>

      <h2>1. Services</h2>
      <h3>1.1 Service Description</h3>
      <p>We provide professional cleaning services including:</p>
      <ul>
        <li>Carpet cleaning</li>
        <li>Upholstery cleaning</li>
        <li>Pressure washing</li>
        <li>Roof cleaning</li>
        <li>Window cleaning</li>
      </ul>

      <h3>1.2 Service Area</h3>
      <p>We provide services across Essex and surrounding areas. Availability may vary by location.</p>

      <h3>1.3 Quotes</h3>
      <p>
        All quotes are provided free of charge and are valid for 30 days from the date of issue.
        Quotes are based on the information provided to us. If the actual condition differs significantly
        from what was described, we reserve the right to adjust the price before commencing work.
      </p>

      <h2>2. Bookings</h2>
      <h3>2.1 Making a Booking</h3>
      <p>
        Bookings can be made by phone, email, or through our website. A booking is confirmed when we
        have agreed on a date, time, and price for the service.
      </p>

      <h3>2.2 Access</h3>
      <p>
        You must ensure we have clear access to the areas to be cleaned at the agreed time.
        If access is not available, we may charge a call-out fee.
      </p>

      <h3>2.3 Preparation</h3>
      <p>For certain services, we may ask you to:</p>
      <ul>
        <li>Move vehicles from driveways (pressure washing)</li>
        <li>Remove fragile items from the cleaning area</li>
        <li>Ensure water and electricity are available</li>
        <li>Inform us of any known issues or fragile areas</li>
      </ul>

      <h2>3. Cancellations and Rescheduling</h2>
      <h3>3.1 Cancellation by You</h3>
      <p>
        You may cancel or reschedule your booking free of charge with at least 48 hours&apos; notice.
        Cancellations with less than 48 hours&apos; notice may incur a cancellation fee of up to 50% of
        the quoted price.
      </p>

      <h3>3.2 Cancellation by Us</h3>
      <p>
        We reserve the right to cancel or reschedule bookings due to adverse weather conditions,
        equipment failure, illness, or other circumstances beyond our control. We will provide as much
        notice as possible and offer an alternative date.
      </p>

      <h3>3.3 Weather Conditions</h3>
      <p>
        Outdoor services (pressure washing, roof cleaning, window cleaning) may be rescheduled if
        weather conditions make it unsafe or impractical to proceed. This is not considered a
        cancellation by either party.
      </p>

      <h2>4. Pricing and Payment</h2>
      <h3>4.1 Pricing</h3>
      <p>
        Prices are quoted in British Pounds Sterling (GBP) and include VAT where applicable.
        Prices may vary based on the size, condition, and accessibility of the area to be cleaned.
      </p>

      <h3>4.2 Payment Terms</h3>
      <p>
        Payment is due upon completion of the work unless otherwise agreed. We accept cash, bank
        transfer, and major credit/debit cards.
      </p>

      <h3>4.3 Additional Charges</h3>
      <p>Additional charges may apply for:</p>
      <ul>
        <li>Particularly heavy soiling requiring extra time or treatment</li>
        <li>Specialist stain removal products</li>
        <li>Work outside normal hours (by prior arrangement)</li>
        <li>Return visits due to access issues</li>
      </ul>
      <p>We will always discuss any additional charges with you before proceeding.</p>

      <h2>5. Our Responsibilities</h2>
      <h3>5.1 Standard of Work</h3>
      <p>We will:</p>
      <ul>
        <li>Carry out all work with reasonable care and skill</li>
        <li>Use professional equipment and cleaning products</li>
        <li>Treat your property with respect</li>
        <li>Leave the work area clean and tidy</li>
      </ul>

      <h3>5.2 Insurance</h3>
      <p>
        We carry public liability insurance to cover accidental damage or injury during our work.
        Details of our insurance are available on request.
      </p>

      <h3>5.3 Results</h3>
      <p>
        While we strive for excellent results, we cannot guarantee the removal of all stains.
        Some old, set-in, or chemically-altered stains may be permanent. We will always provide
        honest advice about what can realistically be achieved.
      </p>

      <h2>6. Your Responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>Provide accurate information about the areas to be cleaned</li>
        <li>Inform us of any known damage or fragile areas</li>
        <li>Ensure safe access to all work areas</li>
        <li>Secure pets during our visit</li>
        <li>Remove valuable or fragile items from the immediate work area</li>
        <li>Be present or arrange for someone over 18 to be present</li>
      </ul>

      <h2>7. Damage and Liability</h2>
      <h3>7.1 Pre-Existing Damage</h3>
      <p>
        We are not liable for damage that existed before our arrival or damage that becomes apparent
        during cleaning due to pre-existing wear, defects, or weakness in materials.
      </p>

      <h3>7.2 Reporting Damage</h3>
      <p>
        Any concerns about damage must be reported to us within 24 hours of the service being completed.
        Please take photographs where possible.
      </p>

      <h3>7.3 Limitation of Liability</h3>
      <p>
        Our liability for any claim is limited to the value of the service provided or the cost of
        repair/replacement of the affected item, whichever is lower. We are not liable for indirect
        or consequential losses.
      </p>

      <h2>8. Complaints and Guarantees</h2>
      <h3>8.1 Satisfaction</h3>
      <p>
        Your satisfaction is important to us. If you are not happy with any aspect of our work,
        please contact us within 24 hours and we will arrange to return and address your concerns
        free of charge.
      </p>

      <h3>8.2 Complaints</h3>
      <p>
        Complaints should be made in writing to {siteConfig.contact.email}. We aim to respond to
        all complaints within 5 working days.
      </p>

      <h2>9. Health and Safety</h2>
      <p>We maintain appropriate health and safety standards. Please inform us of:</p>
      <ul>
        <li>Any known hazards on your property</li>
        <li>Any health conditions that may be affected by cleaning products</li>
        <li>Any areas that are unsafe or restricted</li>
      </ul>

      <h2>10. Data Protection</h2>
      <p>
        We collect and process your personal data in accordance with our Privacy Policy and applicable
        data protection laws. Your data is used only to provide our services and communicate with you
        about your bookings.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. The version in effect at the time of your booking
        applies to that booking.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of England and Wales. Any disputes will be subject to
        the jurisdiction of the courts of England and Wales.
      </p>

      <h2>13. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us:</p>

      <div className="contact-card">
        <ul>
          <li><strong>Company:</strong> {siteConfig.legalName}</li>
          <li><strong>Email:</strong> {siteConfig.contact.email}</li>
          <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
          <li><strong>Website:</strong> {siteConfig.url}</li>
        </ul>
      </div>

      <hr />

      <p>
        <strong>By booking our services, you acknowledge that you have read, understood, and agree to
        be bound by these Terms and Conditions.</strong>
      </p>
    </LegalLayout>
  );
}
