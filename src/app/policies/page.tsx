import ExternalLink from "@/src/components/Links/ExternalLink";
import Navbar from "@/src/components/Navbar";

export default function Policies() {
  return (
    <>
      <Navbar
        items={[
          { name: "Home", href: "/" },
          { name: "Features", href: "/#features" },
          { name: "FAQ", href: "/#faq" },
          { name: "Demo", href: "/demo" },
        ]}
      />
      <main className="grid gap-8">
        <section id="#privacy-policy">
          <h1 className="mb-2 text-xl font-semibold underline underline-offset-1">
            Privacy policy
          </h1>
          <ul className="flex flex-col gap-4">
            <li>Effective Date: 12-02-2023</li>
            <li>
              1. Introduction Thank you for using Applii, an open source job
              application tracker (&quot;the App&quot;). This Privacy Policy is
              designed to help you understand how your usage information is
              collected and used when you use the App.
            </li>
            <ul className="flex flex-col gap-2">
              <li>2. Information We Collect </li>
              <li>
                2.1 Usage Information: The App may collect information about how
                you interact with its features, including log data, device
                information, and IP address.
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li>3. How We Use Your Information </li>
              <li>
                3.1 App Functionality: Your usage information is utilized to
                enhance and optimize the functionality of the App.
              </li>
              <li>
                3.2 No Storage of Personal Information: Applii does not store
                personal information, and it does not store the users&apos;
                application information. The responsibility for application data
                storage lies with the users&apos; chosen sync providers (e.g.,
                Dropbox, Google Drive).
              </li>
            </ul>
            <li>
              4. Data Sharing We do not sell, trade, or otherwise transfer your
              usage information to third parties.
            </li>
            <li>
              5. Security We take reasonable measures to protect your usage
              information from unauthorized access, disclosure, alteration, or
              destruction.
            </li>
            <li>
              6. Your Choices You have the right to control the information
              shared with the App, as it relies on external sync providers. You
              can manage your data directly with your chosen sync provider.
            </li>
            <li>
              7. Updates to this Privacy Policy may be updated from time to
              time. We will notify you of any changes by posting the new Privacy
              Policy on this page. 8. Contact Us If you have any questions or
              concerns about this Privacy Policy, please open a discussion on{" "}
              <ExternalLink
                href="https://github.com/curatedcode/applii-tracker/discussions"
                style="underline"
              >
                Github.
              </ExternalLink>
            </li>
          </ul>
        </section>
        <section id="#terms-of-service">
          <h1 className="mb-2 text-xl font-semibold underline underline-offset-1">
            Terms of service
          </h1>
          <ul className="flex flex-col gap-4">
            <li>Effective Date: 12-02-2023</li>
            <li>
              1. Acceptance of Terms By accessing or using Applii, an
              open-source job application tracker (&quot;the App&quote;), you
              agree to comply with and be bound by these Terms of Service. If
              you do not agree with any part of these terms, you may not use the
              App.
            </li>
            <ul className="flex flex-col gap-2">
              2. Use of the App
              <li>
                2.1 License: Applii is provided under an license. You are
                granted a limited, non-exclusive, non-transferable license to
                use the App in accordance with the terms specified in the
                applicable license.
              </li>
              <li>
                2.2 Prohibited Activities: You agree not to engage in any
                activity that may interfere with the proper functioning of the
                App or violate any laws or regulations.
              </li>
            </ul>
            <li>
              3. External Sync Providers Applii relies on external sync
              providers (e.g., Dropbox, Google Drive) for data storage. You are
              responsible for complying with the terms of service of your chosen
              sync provider.
            </li>
            <ul className="flex flex-col gap-2">
              4. Intellectual Property
              <li>
                4.1 The App, is open source and is provided under the terms of
                the (&quot;License&quot;) below.
              </li>
              <li>
                Applii - Copyright (c) 2023 This software consists of voluntary
                contributions made by many individuals. For exact contribution
                history, see the revision history available at
                https://github.com/curatedcode/applii-tracker Permission is
                hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the
                &quot;Software&quot;), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions: The above copyright notice and this permission
                notice shall be included in all copies or substantial portions
                of the Software. THE SOFTWARE IS PROVIDED &quot;AS IS&quot;,
                WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </li>
              <li>
                4.2 Usage: You are granted a limited, non-exclusive,
                non-transferable license to use the App in accordance with the
                terms specified in the &quot;License&quot;.
              </li>
              <li>
                4.3 Restrictions: You may not copy, modify, distribute, sell, or
                lease any part of the App in a manner that is inconsistent with
                the &quot;License&quot;.
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              5. Disclaimers
              <li>
                5.1 No Warranty: The App is provided &quot;AS IS&quot; without
                any warranty, express or implied. The Applii development team
                makes no representations or warranties regarding the accuracy or
                completeness of the App.
              </li>
              <li>
                5.2 Limitation of Liability: The Applii development team will
                not be liable for any direct, indirect, incidental, special, or
                consequential damages arising out of or in any way connected
                with the use of the App.
              </li>
            </ul>
            <li>
              6. Privacy Your use of the App is also governed by our Privacy
              Policy. Please review our Privacy Policy to understand how we
              collect, use, and protect your information.
            </li>
            <li>
              7. Changes to Terms We reserve the right to update or modify these
              Terms of Service at any time without prior notice. Your continued
              use of the App after changes are made constitutes your acceptance
              of the revised terms.
            </li>
            <li>
              8. Termination We reserve the right to terminate or suspend your
              access to the App for any reason, without notice.
            </li>
            <li>
              9. Governing Law These Terms of Service are governed by and
              construed in accordance with the laws of The United States of
              America.
            </li>
            <li>
              10. Contact Us If you have any questions or concerns about these
              Terms of Service, please open a discussion on{" "}
              <ExternalLink
                href="https://github.com/curatedcode/applii-tracker/discussions"
                style="underline"
              >
                Github.
              </ExternalLink>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
