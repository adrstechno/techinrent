import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8 tracking-normal">
            Privacy Policy
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              At TechInRent, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, and protect your personal
              information.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information (name, email address, phone number)</li>
              <li>Business information (company name, industry, role)</li>
              <li>
                Payment information (processed through secure payment providers)
              </li>
              <li>
                Usage data (how you interact with our website and services)
              </li>
              <li>Communication data (inquiries, support requests)</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing and managing account rental services</li>
              <li>Processing payments and managing billing</li>
              <li>Communicating about your service and support needs</li>
              <li>
                Sending relevant marketing communications (with your consent)
              </li>
              <li>Improving our services and website</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              3. Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your
              information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
            <p className="mb-4">
              While we take all reasonable steps to protect your data, no system
              is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              4. Data Retention
            </h2>
            <p className="mb-4">
              We retain your information for as long as necessary to provide our
              services and comply with legal obligations. You may request
              deletion of your data at any time.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              5. Sharing Your Information
            </h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who help us operate our business</li>
              <li>Payment processors for billing purposes</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              6. Your Rights
            </h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us at
              privacy@techinrent.com.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              7. Cookies and Tracking
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve your experience
              on our website. You can manage cookie preferences through your
              browser settings.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              8. Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes through our website or direct
              communication.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              9. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact
              our Data Protection Officer at privacy@techinrent.com.
            </p>

            <p className="mt-8 text-sm text-neutral-dark">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
