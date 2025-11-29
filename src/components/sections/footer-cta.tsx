import React from 'react';

const FooterCta = () => {
  return (
    <section className="bg-black">
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-auto w-full"
        >
          <source
            src="/herovideo.mp4"
            type="video/webm"
          />
          <source
            src="/herovideo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <p className="absolute bottom-4 right-4 text-xs font-normal text-white md:bottom-8 md:right-8">
          Zero Human V1
        </p>
      </div>
    </section>
  );
};

export default FooterCta;