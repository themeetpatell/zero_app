import React from 'react';

export default function CodeOfConductPage() {
  return (
    <div className="bg-[#1b1b1b] text-[#dfdfdf] mx-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Code of Conduct & Usage Policy</h1>
        <p className="mb-6">Last Updated: November 23, 2025</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mission Statement</h2>
            <p className="mb-3">
              At ZeroHuman, our mission is to democratize cinematic video creation through voice-directed AI, enabling creators, entrepreneurs, 
              and agencies to bring their stories to life affordably and efficiently. Our usage policy—combined with our Terms of Service and 
              Enterprise Agreements—seeks to enable creative expression while mitigating the risk of potential harm and maintaining the integrity 
              of our platform.
            </p>
            <p className="mb-3">
              ZeroHuman employs a combination of automated content filters and human review processes to detect and block harmful content in user 
              inputs and outputs. We prioritize reports related to child safety and platform integrity. ZeroHuman reserves the right to suspend, 
              restrict, or terminate your account for any violation of this usage policy. If you believe your account has been wrongly suspended 
              or restricted, you may appeal by emailing <a href="mailto:support@zerohuman.co" className="no-underline">support@zerohuman.co</a> with a detailed explanation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Children's Safety</h2>
            <p className="mb-3">
              We are committed to protecting children and maintaining a safe environment. We strictly prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">1.1 Child Sexual Abuse Material (CSAM)</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content that depicts, facilitates, or promotes child sexual abuse or the sexualization of children in any form</li>
              <li>Generated content designed to sexualize, groom, or exploit minors</li>
              <li>Attempts to create, modify, or distribute imagery depicting child sexual abuse</li>
            </ul>
            <p className="mb-3">
              <strong>Action:</strong> All instances of suspected CSAM are reported to the National Center for Missing and Exploited Children (NCMEC) 
              and relevant law enforcement authorities. Associated accounts are indefinitely suspended without appeal.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">1.2 Minor Exploitation and Grooming</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content facilitating minor grooming or designed to impersonate minors for deceptive purposes</li>
              <li>Generated content intended to normalize harmful interactions with children</li>
              <li>Content depicting minors in dangerous, harmful, or exploitative scenarios</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">1.3 Child Endangerment</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content depicting child abuse, neglect, or endangerment</li>
              <li>Minor participation in harmful, dangerous, or illegal acts</li>
              <li>Content designed to manipulate or coerce minors</li>
            </ul>
            <p className="mb-3">
              <strong>Enhanced Standards:</strong> We apply stricter content review standards to any content depicting children, even if individual 
              elements might otherwise be permitted. Ambiguous cases involving minors are resolved conservatively in favor of child safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Violence & Harmful Conduct</h2>
            <p className="mb-3">
              We prohibit content that promotes, glorifies, or facilitates violence, terrorism, or harm. Specifically, we prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">2.1 Terrorism & Violent Extremism</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content depicting, promoting, or facilitating terrorist acts or violent extremism</li>
              <li>Content designed to radicalize, recruit, or inspire violence</li>
              <li>Detailed instructions or glorification of terrorist methodologies</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">2.2 Graphic Violence & Gore</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Depictions of graphic violence, gore, mutilation, dismemberment, or beheading</li>
              <li>Content depicting extreme injury, exposed organs, bones, or exposed musculature</li>
              <li>Content designed to incite, glorify, or encourage violence against individuals or groups</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">2.3 Animal Abuse</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Depictions of animal abuse, torture, or cruelty</li>
              <li>Content promoting animal fighting, experimentation, or harm</li>
              <li>Graphic animal suffering presented for entertainment</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">2.4 Self-Harm & Suicide</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content depicting, promoting, or facilitating self-injury or self-harm</li>
              <li>Suicide methods, encouragement, or romanticization of suicide</li>
              <li>Content promoting eating disorders, starvation, or harmful weight practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Sexually Explicit Content & Nudity</h2>
            <p className="mb-3">
              We maintain community standards regarding adult content while respecting creative expression for legitimate purposes. We prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">3.1 Explicit Sexual Content</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Depictions of sexual acts, intercourse, or sexual penetration</li>
              <li>Use of sex toys, sex dolls, or fetish content in explicit scenarios</li>
              <li>Sexual content involving bodily fluids or graphic sexual imagery</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">3.2 Adult Nudity</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Full or partial nudity presented in sexual or suggestive contexts</li>
              <li>Nude imagery intended for sexual arousal or gratification</li>
              <li>Non-consensual distribution of intimate imagery</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">3.3 Non-Consensual Intimate Imagery (NCII)</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Attempts to create, manipulate, or distribute intimate imagery without consent</li>
              <li>Deepfake pornography or synthetic intimate content of real individuals</li>
              <li>Revenge porn, leaked intimate content, or image-based sexual abuse</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">3.4 Sexually Suggestive Content</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content featuring lingerie, swimwear, or underwear in sexualized contexts</li>
              <li>Content objectifying individuals through a primarily sexual lens</li>
              <li>Suggestive choreography or visual content intended for sexual gratification</li>
            </ul>
            <p className="mb-3">
              <strong>Note:</strong> We recognize legitimate uses for artistic, educational, and documentary purposes. Context and intent are 
              evaluated carefully, but these exceptions are narrowly construed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Hateful Conduct, Discrimination & Harassment</h2>
            <p className="mb-3">
              We are committed to maintaining an inclusive platform free from discrimination, harassment, and hateful conduct. We prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">4.1 Hate Speech & Discrimination</h3>
            <p className="mb-3">
              Content that dehumanizes, demeans, or promotes discrimination based on protected attributes including (but not limited to):
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Race, ethnicity, or national origin</li>
              <li>Religion or religious practice</li>
              <li>Gender identity or expression</li>
              <li>Sexual orientation</li>
              <li>Disability or health status</li>
              <li>Immigration status</li>
              <li>Socioeconomic status or caste</li>
            </ul>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content promoting conspiracy theories targeting specific groups</li>
              <li>Slurs, epithets, or dehumanizing language targeting protected groups</li>
              <li>Calls for discrimination, segregation, or violence against protected groups</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">4.2 Targeted Harassment & Abuse</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content created with the intent to harass, bully, intimidate, defame, or abuse an individual or group</li>
              <li>Coordinated campaigns to harass or abuse specific people</li>
              <li>Doxxing—sharing private information with intent to harm</li>
              <li>Threats, intimidation, or harassment based on personal characteristics</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">4.3 Cyberbullying</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Repeated, malicious content targeting minors or vulnerable individuals</li>
              <li>Mockery, shaming, or ridicule designed to cause psychological harm</li>
              <li>Content encouraging others to harass or abuse a specific person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Misinformation, Deception & Fraud</h2>
            <p className="mb-3">
              We prohibit content designed to deceive, defraud, or mislead. Specifically, we prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">5.1 Impersonation & Misrepresentation</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Impersonating an individual, organization, or entity with intent to deceive</li>
              <li>Misrepresenting affiliation, credentials, or authority</li>
              <li>Creating content falsely attributed to public figures or celebrities</li>
              <li>Pretending to represent ZeroHuman or our services</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">5.2 Fraud & Scams</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Use of the platform to defraud, scam, or deliberately mislead for financial gain</li>
              <li>Phishing content, investment scams, or financial fraud</li>
              <li>False medical claims, fake product endorsements, or misleading health information</li>
              <li>Election misinformation, voter suppression, or electoral fraud</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">5.3 Deepfakes & Synthetic Media</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Synthetic media designed to deceive about material facts</li>
              <li>Deepfake videos of public figures making false statements with intent to mislead</li>
              <li>Non-consensual synthetic intimate content (also covered under NCII)</li>
              <li>Media presented without clear disclosure of AI generation when context could reasonably cause confusion</li>
            </ul>
            <p className="mb-3">
              <strong>Note:</strong> Clearly labeled satire, parody, or fictional content intended for entertainment is generally permitted if not 
              presented as factual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Privacy & Rights Violations</h2>
            <p className="mb-3">
              We protect the privacy and rights of all individuals. We prohibit the following:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">6.1 Unauthorized Use of Others' Likenesses</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Use of an individual's image, video, or likeness without their consent</li>
              <li>Creation of videos featuring real people without permission or proper licensing</li>
              <li>Commercial exploitation of someone's identity or appearance</li>
              <li>Use of personal photos or videos in contexts the individual did not authorize</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">6.2 Privacy Violations</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Sharing private information (phone numbers, addresses, email, etc.) without consent</li>
              <li>Doxxing or disclosing confidential personal data</li>
              <li>Creating content that compromises the privacy of identifiable individuals</li>
              <li>Unauthorized recording or distribution of private moments</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">6.3 Intellectual Property Rights</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Use of copyrighted music, footage, or creative works without proper licensing</li>
              <li>Violation of trademark rights or brand impersonation</li>
              <li>Plagiarism or unauthorized use of others' creative content</li>
              <li>Generation of content in the distinctive style of living artists without permission (as this may violate copyright or right of publicity)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Illegal Activities</h2>
            <p className="mb-3">
              We prohibit any use of ZeroHuman for illegal purposes, including but not limited to:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">7.1 Criminal Activity</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Content promoting or facilitating illegal drug manufacturing, distribution, or use</li>
              <li>Content related to human trafficking, forced labor, or modern slavery</li>
              <li>Theft, hacking, fraud, or other criminal activity</li>
              <li>Instructions for committing crimes</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">7.2 Weapons & Dangerous Materials</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Detailed instructions for creating weapons, explosives, or dangerous materials</li>
              <li>Content promoting illegal weapons trafficking or distribution</li>
              <li>Content designed to facilitate violence or terrorism</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Platform-Specific Policies</h2>
            
            <h3 className="text-xl font-semibold mb-2">8.1 Commercial & Agency Usage</h3>
            <p className="mb-3">
              As ZeroHuman is designed for SMBs and creative agencies, additional standards apply:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li><strong>Client Consent:</strong> Agencies and creators must obtain explicit consent from clients before generating content featuring their identities or brands</li>
              <li><strong>Licensing & Rights:</strong> All generated content must respect existing intellectual property rights and licensing agreements</li>
              <li><strong>Attribution:</strong> Generated videos should include appropriate attribution as required by client agreements or brand guidelines</li>
              <li><strong>Unauthorized Commercial Use:</strong> Creating content for commercial purposes without proper authorization or payment to rights holders is prohibited</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">8.2 Training Data & Model Inputs</h3>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Input content that violates this policy will not be used to train or improve our models</li>
              <li>We do not retain or use customer-provided content for model training without explicit opt-in consent</li>
              <li>Personal data used in generation (faces, voices, likenesses) will not be used beyond the specific authorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Enforcement & Appeals</h2>
            
            <h3 className="text-xl font-semibold mb-2">9.1 Suspension & Termination</h3>
            <p className="mb-3">
              ZeroHuman reserves the right to:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Remove violating content</li>
              <li>Restrict or limit account access</li>
              <li>Suspend or permanently terminate accounts</li>
              <li>Refer serious violations to law enforcement</li>
            </ul>
            <p className="mb-3">
              Violations related to child safety result in immediate account termination without appeal.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">9.2 Appeal Process</h3>
            <p className="mb-3">
              If your account is suspended or terminated, you may appeal by:
            </p>
            <ol className="list-decimal pl-6 mb-3 space-y-2">
              <li>Emailing <a href="mailto:appeals@zerohuman.co" className="no-underline">appeals@zerohuman.co</a> within 30 days of suspension</li>
              <li>Providing detailed explanation of why you believe the action was in error</li>
              <li>Including relevant context, permissions, or documentation (when applicable)</li>
            </ol>
            <p className="mb-3">
              We will review appeals within 10 business days and respond with a decision.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">9.3 Reporting Violations</h3>
            <p className="mb-3">
              If you encounter ZeroHuman-generated content that violates this policy, please report it immediately by:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Using the "Report Content" feature in the platform</li>
              <li>Emailing <a href="mailto:abuse@zerohuman.co" className="no-underline">abuse@zerohuman.co</a> with details and links to the violating content</li>
              <li>Contacting our Abuse Team through your account dashboard</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="mb-3">
              This policy may be updated periodically to reflect evolving platform usage, legal requirements, and safety considerations. 
              We will notify users of material changes to this policy via email or in-app notification at least 30 days before implementation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact & Support</h2>
            <p className="mb-3">
              For questions about this Code of Conduct or our usage policies:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li><strong>Policy Questions:</strong> <a href="mailto:policy@zerohuman.co" className="no-underline">policy@zerohuman.co</a></li>
              <li><strong>Abuse Reports:</strong> <a href="mailto:abuse@zerohuman.co" className="no-underline">abuse@zerohuman.co</a></li>
              <li><strong>Appeals:</strong> <a href="mailto:appeals@zerohuman.co" className="no-underline">appeals@zerohuman.co</a></li>
              <li><strong>General Support:</strong> <a href="mailto:support@zerohuman.co" className="no-underline">support@zerohuman.co</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Reference: What You Cannot Create</h2>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Sexual content involving minors in any form</li>
              <li>Graphic violence, gore, or torture</li>
              <li>Content designed to harass, bully, or defame individuals</li>
              <li>Deepfake videos impersonating real people for deception</li>
              <li>Non-consensual intimate imagery or deepfake pornography</li>
              <li>Hate speech or content promoting discrimination</li>
              <li>Content featuring others without their consent</li>
              <li>Fraud, scams, or misleading financial content</li>
              <li>Copyrighted content used without proper licensing</li>
              <li>Illegal instructions or terrorism-related content</li>
              <li>Content violating others' privacy or intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Reference: What You CAN Create</h2>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Commercial videos for your business with proper permissions</li>
              <li>Marketing and promotional content with appropriate consent</li>
              <li>Educational and documentary content</li>
              <li>Satirical or parody content (clearly labeled)</li>
              <li>Artistic and creative expression within policy bounds</li>
              <li>Brand and agency work with proper licensing</li>
              <li>Cinematic storytelling and narrative content</li>
              <li>Social media content (within all policy parameters)</li>
              <li>Training and instructional videos</li>
              <li>Entertainment content that doesn't violate other policies</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}