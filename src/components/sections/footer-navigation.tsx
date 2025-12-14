import React from 'react';

const sections = [
  {
    title: 'Product',
    links: [
      { label: 'Voice-to-Video', href: '/use-cases', showSoon: false },
      { label: 'AI Co-Director', href: '/research/introducing-zero-v1', showSoon: false },
      { label: 'Marketplace', href: '/use-cases#marketplace', showSoon: false },
      { label: 'Use Cases', href: '/use-cases', showSoon: false },
      { label: 'Pricing', href: '/pricing', showSoon: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about', showSoon: false },
      { label: 'Research', href: '/research/introducing-zero-v1', showSoon: false },
      { label: 'Customer Stories', href: '/company', showSoon: false },
      { label: 'Careers', href: '/careers', showSoon: true },
      { label: 'News', href: '/news', showSoon: true },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Create an Ad', href: '/signin', showSoon: false },
      { label: 'Login', href: '/signin', showSoon: false },
      { label: 'Contact Sales', href: 'mailto:sales@zerohuman.co', showSoon: false },
      { label: 'Pricing', href: '/pricing', showSoon: false },
      { label: 'Data Security', href: '/security', showSoon: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Press', href: 'mailto:press@zerohuman.co', showSoon: false },
      { label: 'Partnerships', href: 'mailto:partnerships@zerohuman.co', showSoon: false },
      { label: 'Twitter >', href: 'https://x.com/zerohuman', showSoon: false },
      { label: 'Linkedin >', href: 'https://www.linkedin.com/company/zerohuman', showSoon: false },
      { label: 'Instagram >', href: 'https://www.instagram.com/zerohuman', showSoon: false },
      { label: 'YouTube >', href: 'https://www.youtube.com/zerohuman', showSoon: false },
    ],
  },
];

const legalLinks = [
  { label: 'Terms of Use', href: '/terms-of-use', target: '_blank', rel: 'noopener noreferrer'  },
  { label: 'Privacy Policy', href: '/privacy-policy', target: '_blank', rel: 'noopener noreferrer'  },
  // { label: 'California Notices', href: '/california-notices' },
  // { label: 'Your Privacy Choices', href: '#', hasIcon: true, target: '_blank', rel: 'noopener noreferrer' },
  { label: 'Code of Conduct', href: '/code-of-conduct', target: '_blank', rel: 'noopener noreferrer'  },
  // { label: 'System Status', href: '/status' },
];

const PrivacyChoicesIcon = () => (
  <svg
    width="28"
    height="14"
    viewBox="0 0 28 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-1 relative"
    style={{ top: '-1px' }}
  >
    <rect x="0.5" y="0.5" width="27" height="13" rx="6.5" fill="#FFFFFF" stroke="#999999" />
    <path
      d="M7 6.5L10 9.5L14 5.5"
      stroke="#003BFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 9.5L17 5.5M17 9.5L21 5.5"
      stroke="#003BFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterNavigation = () => {
  return (
    <footer className="bg-black text-white">
      <div className="rw-container pt-12 lg:pt-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 pb-12 lg:pb-24">
          {sections.map(section => (
            <div key={section.title}>
              <h3 className="mb-5 text-xs font-medium text-neutral-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white hover:text-white/70 transition-colors duration-200 inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      {link.showSoon && (
                        <span className="text-[9px] font-medium px-1.5 py-0.5 bg-white/10 text-white/60 rounded">
                          soon
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <a href="/" className="text-xl font-semibold tracking-tight hover:text-white/70 transition-colors">
            Zero Human
          </a>
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-y-4 gap-x-6">
            <p className="text-xs text-neutral-400 whitespace-nowrap">© 2025 ZERO HUMAN AI, INC.</p>
            <nav>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {legalLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      {link.hasIcon && <PrivacyChoicesIcon />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNavigation;
