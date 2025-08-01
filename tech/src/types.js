/**
 * @typedef {Object} LinkedInAccount
 * @property {number} id
 * @property {string} title
 * @property {"Standard" | "Premium" | "Executive"} type
 * @property {string} industry
 * @property {number} connections
 * @property {number} accountAge
 * @property {number} ssiScore
 * @property {string} [premiumType]
 * @property {number} [endorsements]
 * @property {string[]} features
 * @property {number} reviewCount
 * @property {number} reviewScore
 * @property {boolean} [featured]
 * @property {number} dailyPrice
 * @property {number} weeklyPrice
 * @property {number} monthlyPrice
 * @property {string} [imageUrl]
 */

/**
 * @typedef {Object} AccountFilters
 * @property {string} industry
 * @property {string} connections
 * @property {string} accountAge
 * @property {string} priceRange
 */

/**
 * @typedef {Object} Testimonial
 * @property {number} id
 * @property {string} text
 * @property {string} author
 * @property {string} position
 * @property {string} company
 * @property {number} rating
 * @property {string} initials
 */

/**
 * @typedef {Object} FAQ
 * @property {number} id
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef {Object} PricingTier
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} priceRange
 * @property {string[]} features
 * @property {boolean} [popular]
 * @property {string} buttonText
 */

/**
 * @typedef {Object} ContactMessage
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 * @property {boolean} acceptTerms
 */

/**
 * @typedef {Object} RentalPeriod
 * @property {string} startDate
 * @property {string} duration
 */

// Export empty objects to maintain module structure
export const LinkedInAccount = {};
export const AccountFilters = {};
export const Testimonial = {};
export const FAQ = {};
export const PricingTier = {};
export const ContactMessage = {};
export const RentalPeriod = {};
