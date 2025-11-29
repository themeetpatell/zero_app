import Image from "next/image";

type Story = {
  href: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  category: string;
  title: string;
};

const stories: Story[] = [
  {
    href: "/stories/dtc-fashion-brand",
    imgSrc: "/ecom success.jpg",
    imgAlt: "DTC fashion brand scales ad production with Zero Human",
    imgWidth: 520,
    imgHeight: 292,
    category: "E-commerce Success",
    title: "How a DTC Fashion Brand Cut Ad Production Costs by 90% with Zero Human",
  },
  {
    href: "/stories/performance-marketing",
    imgSrc: "/advertisement.jpg",
    imgAlt: "Performance marketing agency creates winning TikTok ads",
    imgWidth: 520,
    imgHeight: 292,
    category: "Performance Marketing",
    title: "Agency Creates 50+ Winning TikTok Ads Per Week Using Voice-Directed AI",
  },
  {
    href: "/stories/product-launches",
    imgSrc: "/product launch.jpg",
    imgAlt: "Tech startup launches products with cinematic video ads",
    imgWidth: 520,
    imgHeight: 292,
    category: "Product Launches",
    title: "Startup Launches 10 Products in 30 Days with Zero Human's Cinematic AI",
  },
];

const CustomerStories = () => {
  return (
    <section className="bg-background text-foreground pt-20 lg:pt-20 pb-16 lg:pb-32">
      <div className="rw-container">
        <div className="lg:w-8/12 w-full text-center mx-auto mb-10 lg:mb-16">
          <h2 className="text-[40px] tracking-[-1px] font-sans leading-[1.2] mb-6">
            How brands are transforming <br />
            video advertising with Zero Human.
          </h2>
          <a
            href="/signin"
            className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-off-black border border-off-black hover:bg-off-black hover:text-white"
          >
            Try Now
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <a
              key={story.href}
              href={story.href}
              className="cursor-pointer block relative transition-colors duration-300 group"
            >
              <div className="bg-[#3B3B3B]/10 absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-full relative overflow-hidden rounded-lg">
                  <Image
                    src={story.imgSrc}
                    alt={story.imgAlt}
                    width={story.imgWidth}
                    height={story.imgHeight}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-muted-foreground rw-eyebrow">
                  {story.category}
                </div>
                <div className="text-base font-normal">{story.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;