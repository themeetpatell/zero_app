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
    <section className="bg-gradient-to-b from-white via-[#f9f9f9] to-white text-foreground pt-20 lg:pt-24 pb-16 lg:pb-32">
      <div className="rw-container">
        <div className="lg:w-8/12 w-full text-center mx-auto mb-10 lg:mb-14">
          <h2 className="text-[36px] sm:text-[40px] tracking-[-1px] font-sans leading-[1.2] mb-4 text-off-black">
            How brands are transforming <br />
            video advertising with Zero Human.
          </h2>
          <a
            href="/signin"
            className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-white bg-off-black border border-off-black hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
          >
            Try Now
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <a
              key={story.href}
              href={story.href}
              className="cursor-pointer block relative transition-transform duration-300 group rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={story.imgSrc}
                  alt={story.imgAlt}
                  width={story.imgWidth}
                  height={story.imgHeight}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5 space-y-2">
                <div className="text-muted-foreground rw-eyebrow">
                  {story.category}
                </div>
                <div className="text-base font-normal text-off-black leading-relaxed">{story.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
