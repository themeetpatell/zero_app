import React from 'react';
import "@/app/dashboard/dashboard.css";

const MainCanvas = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="@container/main relative isolate min-h-0 flex-1 overflow-clip bg-base">
      <div className="mx-auto flex h-full w-full flex-col">
        <div className="scrollable-container flex flex-1 basis-0 overflow-auto [scrollbar-gutter:stable] scrollbar-subtle">
          <div className="mx-auto h-full w-full max-w-screen-md px-[16px] md:px-[24px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;