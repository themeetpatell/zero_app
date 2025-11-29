'use client';

import React from 'react';
import { X } from 'lucide-react';

interface WhatsNewProps {
  onClose?: () => void;
}

const WhatsNew = ({ onClose }: WhatsNewProps) => {
  return (
    <div className="w-[542px] scale-80 bg-[#3A3939] text-[#D3D3D3] rounded-xl p-8 relative shadow-lg">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#B0B0B0] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <h2 className="text-[28px] font-bold text-primary mb-8">WHAT'S NEW?</h2>

      <div className="space-y-4">
        <p className="text-sm text-[#B0B0B0]">1 January 2026</p>

        <h3 className="text-xl font-semibold text-white">Zero Human 1.0 is here</h3>

        <p className="text-sm font-semibold text-white">Re-imagine ads creation</p>

        <p className="text-sm">
          We are introducing Zero Human 1.0 - Diverse, Dynamic, Detailed and Digital with consistent
          long and high quality video generation for SMBs.
        </p>

        <p className="text-sm font-bold text-white mt-4">
          Basic Users : Try it for free with pro feature exclusive credits for first 2000 users.
        </p>
      </div>
    </div>
  );
};

export default WhatsNew;