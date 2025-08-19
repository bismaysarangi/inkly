import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaFileContract,
  FaUserCheck,
  FaLock,
  FaCookie,
  FaEnvelope,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

// Terms of Service Page Component
export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <FaFileContract className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Clear guidelines for using Inkly platform
            </p>
            <div className="flex items-center justify-center text-sm opacity-75">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              Last updated: August 18th, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="#acceptance"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                1. Acceptance of Terms
              </a>
              <a
                href="#user-accounts"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                2. User Accounts
              </a>
              <a
                href="#content-policy"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                3. Content Policy
              </a>
              <a
                href="#prohibited-uses"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                4. Prohibited Uses
              </a>
              <a
                href="#intellectual-property"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                5. Intellectual Property
              </a>
              <a
                href="#termination"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                6. Termination
              </a>
            </div>
          </div>

          {/* Terms Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-8">
              {/* Section 1 */}
              <section id="acceptance" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaUserCheck className="w-6 h-6 mr-3 text-purple-600" />
                  1. Acceptance of Terms
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    By accessing and using Inkly, you accept and agree to be
                    bound by the terms and provision of this agreement. If you
                    do not agree to abide by the above, please do not use this
                    service.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    These terms apply to all visitors, users, and others who
                    access or use the service.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="user-accounts" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. User Accounts
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    When you create an account with us, you must provide
                    information that is accurate, complete, and current at all
                    times. You are responsible for safeguarding the password and
                    for all activities that occur under your account.
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>
                      You must be at least 13 years old to use this service
                    </li>
                    <li>
                      You are responsible for maintaining account security
                    </li>
                    <li>
                      You must notify us immediately of any unauthorized use
                    </li>
                    <li>
                      One person or legal entity may maintain only one account
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="content-policy" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Content Policy
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Our service allows you to post, link, store, share and
                    otherwise make available certain information, text,
                    graphics, videos, or other material. You are responsible for
                    the content you post to the service.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Content Guidelines:</strong> All content must be
                      respectful, legal, and in accordance with our community
                      standards.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="prohibited-uses" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaExclamationTriangle className="w-6 h-6 mr-3 text-red-500" />
                  4. Prohibited Uses
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You may not use our service:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>
                      For any unlawful purpose or to solicit others to perform
                      illegal acts
                    </li>
                    <li>
                      To violate any international, federal, provincial, or
                      state regulations, rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                    <li>
                      To upload viruses or any other type of malicious code
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="intellectual-property" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Intellectual Property Rights
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The service and its original content, features, and
                    functionality are and will remain the exclusive property of
                    Inkly and its licensors. The service is protected by
                    copyright, trademark, and other laws.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You retain rights to any content you submit, post, or
                    display on or through the service. By submitting content,
                    you grant us a worldwide, non-exclusive license to use,
                    copy, reproduce, and distribute such content.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="termination" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Termination
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We may terminate or suspend your account and bar access to
                    the service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever,
                    including breach of the Terms.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Upon termination, your right to use the service will cease
                    immediately. If you wish to terminate your account, you may
                    simply discontinue using the service.
                  </p>
                </div>
              </section>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-b-lg">
              <div className="text-center">
                <FaEnvelope className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Questions about our Terms?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
