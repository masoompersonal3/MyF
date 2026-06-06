const mongoose = require('mongoose');

const footerLinkSchema = new mongoose.Schema(
  {
    url: { type: String, default: '' },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteContentSchema = new mongoose.Schema(
  {
    heroTexts: {
      type: [String],
      default: ['Developer', 'Designer', 'Student'],
    },
    aboutContent: {
      type: String,
      default: '',
    },
    featuredTitle: {
      type: String,
      default: 'Featured Work',
    },
    featuredSubtitle: {
      type: String,
      default: 'A selection of my recent full-stack applications and functional frontends.',
    },
    timelineTitle: {
      type: String,
      default: 'My Journey',
    },
    timelineSubtitle: {
      type: String,
      default: 'A timeline of my academic background and educational milestones.',
    },
    contactHeading: {
      type: String,
      default: "Let's",
    },
    contactSubtitle: {
      type: String,
      default:
        "Have a project in mind, or just want to say hi? I'm always open to discussing new opportunities and creative ideas.",
    },
    contactEmail: {
      type: String,
      default: 'mullamasoom50@gmail.com',
    },
    footerLinks: {
      linkedin: {
        type: footerLinkSchema,
        default: () => ({ url: 'https://linkedin.com', visible: true }),
      },
      github: {
        type: footerLinkSchema,
        default: () => ({ url: 'https://github.com', visible: true }),
      },
      instagram: {
        type: footerLinkSchema,
        default: () => ({ url: 'https://instagram.com', visible: true }),
      },
    },
  },
  { timestamps: true }
);

// Static method to find or create the single document
siteContentSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

module.exports = SiteContent;
