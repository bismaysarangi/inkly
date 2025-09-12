import {
  FaShieldAlt,
  FaCalendarAlt,
  FaUserCheck,
  FaLock,
  FaCookie,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <FaShieldAlt className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-90 mb-6">
              How we protect and handle your personal information
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
                href="#information-collected"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                1. Information We Collect
              </a>
              <a
                href="#how-we-use"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                2. How We Use Information
              </a>
              <a
                href="#information-sharing"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                3. Information Sharing
              </a>
              <a
                href="#data-security"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                4. Data Security
              </a>
              <a
                href="#cookies"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                5. Cookies & Tracking
              </a>
              <a
                href="#your-rights"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                6. Your Rights
              </a>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-8">
              {/* Section 1 */}
              <section id="information-collected" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaUserCheck className="w-6 h-6 mr-3 text-green-600" />
                  1. Information We Collect
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We collect information you provide directly to us,
                    information we obtain automatically when you use our
                    services, and information from third parties.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Personal Information:
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2 mb-4">
                    <li>Name and email address</li>
                    <li>Profile information and photos</li>
                    <li>Content you create, upload, or share</li>
                    <li>Communications with us</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Automatic Information:
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>Device information and identifiers</li>
                    <li>Usage data and analytics</li>
                    <li>Log information</li>
                    <li>Location information (with permission)</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="how-we-use" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We use the information we collect to provide, maintain, and
                    improve our services:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>Provide and operate the Inkly service</li>
                    <li>
                      Process your account registration and manage your account
                    </li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Analyze usage patterns to improve our service</li>
                    <li>Detect and prevent fraud and abuse</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="information-sharing" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Information Sharing and Disclosure
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to
                    third parties. We may share your information in limited
                    circumstances:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>
                      With service providers who help us operate our platform
                    </li>
                    <li>
                      In connection with a merger, acquisition, or sale of
                      assets
                    </li>
                  </ul>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                    <p className="text-green-800 dark:text-green-200">
                      <strong>We never sell your data:</strong> Your personal
                      information is not for sale and never will be.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="data-security" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaLock className="w-6 h-6 mr-3 text-blue-600" />
                  4. Data Security
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Secure data storage and backup procedures</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="cookies" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaCookie className="w-6 h-6 mr-3 text-yellow-600" />
                  5. Cookies and Tracking Technologies
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance
                    your experience:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>
                      <strong>Essential cookies:</strong> Required for the
                      service to function
                    </li>
                    <li>
                      <strong>Analytics cookies:</strong> Help us understand how
                      you use our service
                    </li>
                    <li>
                      <strong>Preference cookies:</strong> Remember your
                      settings and preferences
                    </li>
                    <li>
                      <strong>Marketing cookies:</strong> Used to deliver
                      relevant advertisements
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    You can control cookie settings through your browser
                    preferences.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="your-rights" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Your Rights and Choices
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You have several rights regarding your personal information:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 leading-relaxed list-disc ml-6 space-y-2">
                    <li>
                      <strong>Access:</strong> Request a copy of your personal
                      data
                    </li>
                    <li>
                      <strong>Correction:</strong> Update or correct inaccurate
                      information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal data
                    </li>
                    <li>
                      <strong>Portability:</strong> Export your data in a
                      readable format
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to certain processing
                      activities
                    </li>
                    <li>
                      <strong>Restriction:</strong> Limit how we process your
                      data
                    </li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Exercise Your Rights:</strong> Contact us anytime
                      to exercise these rights or ask questions about your
                      privacy.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-b-lg">
              <div className="text-center">
                <FaEnvelope className="w-8 h-8 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Questions?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please
                  don't hesitate to contact us.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors"
                >
                  Contact Privacy Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
