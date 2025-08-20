import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8 tracking-normal">
            Terms of Service
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Welcome to TechInRent. Please read these terms of service
              carefully before using our service.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using our service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, you may not
              access the service.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              2. Description of Service
            </h2>
            <p className="mb-4">
              TechInRent provides a platform for renting LinkedIn accounts for
              business purposes. Our service allows businesses to temporarily
              access and use professionally established LinkedIn accounts to
              enhance their networking and lead generation capabilities.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              3. Account Usage Guidelines
            </h2>
            <p className="mb-4">
              When renting a LinkedIn account through our service, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the account professionally and ethically</li>
              <li>Not alter core profile information</li>
              <li>Not engage in spamming or harassment</li>
              <li>
                Not use the account for illegal purposes or in violation of
                LinkedIn's terms
              </li>
              <li>Maintain the confidentiality of account credentials</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              4. Payment and Refunds
            </h2>
            <p className="mb-4">
              Payment for account rentals is required in advance. We offer
              refunds in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account access issues not resolved within 24 hours</li>
              <li>Account suspension not due to user activity</li>
              <li>Significant downtime that impacts business activities</li>
            </ul>
            <p className="mb-4">
              Refunds will be prorated based on the remaining rental period.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              5. Liability Limitation
            </h2>
            <p className="mb-4">TechInRent is not responsible for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Actions taken by LinkedIn against accounts due to user
                activities
              </li>
              <li>Business outcomes or results from using the accounts</li>
              <li>Any damages arising from use of our service</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              6. Termination
            </h2>
            <p className="mb-4">
              We reserve the right to terminate service to any user who violates
              these terms. Upon termination, your access to the account will be
              immediately revoked without refund.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              7. Changes to Terms
            </h2>
            <p className="mb-4">
              We may modify these terms at any time. Continued use of the
              service after any modifications indicates acceptance of the
              updated terms.
            </p>

            <h2 className="font-heading text-xl font-semibold mt-6 mb-3 tracking-normal">
              8. Contact
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at
              vibhanshu@techinrent.com.
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

export default Terms;
