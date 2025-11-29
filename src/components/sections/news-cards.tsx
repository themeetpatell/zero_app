import Image from "next/image";

const newsItems = [
  {
    category: "Research",
    date: "July 25, 2025",
    title: "Introducing Runway Aleph",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/rw-card-aleph-01-2.jpg",
    link: "#"
  },
  {
    category: "News",
    date: "May 10, 2024",
    title: "Exploring the Future of Filmmaking with Tribeca Festival 2024",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/aiff-img-13.png",
    link: "#"
  },
  {
    category: "News",
    date: "September 18, 2024",
    title: "Runway Partners with Lionsgate",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e07d407-143f-44e7-b17b-607a2796f0be-runwayml-com/assets/images/03b-17.jpg",
    link: "#"
  }
];

type NewsItem = typeof newsItems[0];

const NewsCard = ({ item }: { item: NewsItem }) => {
  return (
    <a href={item.link} className="block group">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={512}
          height={384}
          className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-base font-normal text-foreground tracking-tight">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {item.category} / {item.date}
        </p>
      </div>
    </a>
  );
};

const NewsCards = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="rw-container">
        <h2 className="text-[40px] font-normal leading-tight tracking-tighter mb-12 text-foreground">
          News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCards;