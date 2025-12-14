import Image from "next/image";
import Link from "next/link";

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" viewBox="0 0 15 15.55" {...props}>
    <path
      className="fill-current text-white"
      d="M14.49 6.845a.5.5 0 0 1 0 .89L1.644 14.5A.5.5 0 0 1 .9 14.07V1.52A.5.5 0 0 1 1.644 1.05l12.846 6.795Z"
    ></path>
  </svg>
);

const videoCards = [
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/Lonely_Poster-5.webp",
    alt: "Luxury watch product ad",
    title: (
      <h3 className="text-3xl text-white font-medium mb-2">
        Luxury Watch
        <br />
        Collection
      </h3>
    ),
    caption: "Product ad made with Zero V1",
    href: "#",
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/Herd_Poster-6.webp",
    alt: "Fashion brand campaign",
    title: <h3 className="text-3xl text-white font-bold tracking-tight mb-2">STREETWEAR<br />DROP</h3>,
    caption: "Social media ad made with Zero V1",
    href: "#",
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/Retrieval_Poster-7.webp",
    alt: "Skincare product reveal",
    title: (
      <h3 className="text-3xl lg:text-4xl text-white font-black leading-none mb-2">
        GLOW
        <br />
        SERUM
      </h3>
    ),
    caption: "Product reveal made with Zero V1",
    href: "#",
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/NY_Poster-8.webp",
    alt: "Tech product launch",
    title: (
      <h3 className="text-3xl text-white font-medium mb-2">
        Next-Gen <span className="block">Audio</span>
      </h3>
    ),
    caption: "Launch ad made with Zero V1",
    href: "#",
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/Vede_Poster-9.webp",
    alt: "Food & beverage brand ad",
    title: (
      <h3 className="text-3xl lg:text-4xl text-white font-medium tracking-[0.2em] lg:tracking-[0.3em] mb-2">
        ARTISAN
        <br />
        CRAFT
      </h3>
    ),
    caption: "Brand story ad made with Zero V1",
    href: "#",
  },
];

const NarrativeCapabilities = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0f1012] to-black py-24 lg:py-40 text-white">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -left-10 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>
      <div className="rw-container relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex justify-center items-center py-2 px-3 border border-white/30 rounded-full mb-4 bg-white/5 backdrop-blur">
            <div className="rw-eyebrow text-white text-opacity-80">ZERO V1 ENGINE</div>
          </div>
          <h2 className="text-[42px] sm:text-[48px] tracking-[-1.6px] font-sans leading-[1.05] text-white font-normal mb-6">
            From voice note to shoppable ad
          </h2>
          <p className="text-base sm:text-lg text-white text-opacity-80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Brands use Zero Human to ship 4K ads faster than Runway or HeyGen:
            multilingual scripts, cultural nuance, talent casting, shots, music,
            performance hooks—and a marketplace to sell or rent the finished
            spots.
          </p>
          <Link
            href="/research/introducing-zero-v1"
            className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-black bg-white border border-white hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)]"
          >
            Learn More
          </Link>
        </div>

        {/* <div className="mt-14 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCards.map((card, index) => (
              <a key={index} href={card.href} className="group">
                <div className="aspect-[2/3] relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent z-10" />
                  <Image
                    src={card.imageSrc}
                    alt={card.alt}
                    width={500}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex p-6 items-end z-10">
                    <div className="mr-auto">
                      {card.title}
                      <div className="text-white text-opacity-80 text-sm">{card.caption}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ml-4 flex-shrink-0">
                      <PlayIcon className="ml-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default NarrativeCapabilities;
