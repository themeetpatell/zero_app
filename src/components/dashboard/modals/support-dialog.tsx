"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronDown } from "lucide-react";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SupportDialog({ open, onOpenChange }: SupportDialogProps) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subjects = [
    "Payment and billing problems",
    "Questions about the product and features",
    "Video quality issues",
    "Watermark problems",
    "Technical Issue",
    "Bug Report"
  ];

  const handleSubmit = () => {
    console.log("Support request submitted:", { name, subject, message });
    onOpenChange(false);
    setName("");
    setSubject("");
    setMessage("");
  };

  const isSubmitDisabled = !name.trim() || !subject || !message.trim();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content - Compact and Centered */}
        <DialogPrimitive.Content className="fixed scale-80 left-1/2 top-1/2 z-50 w-[440px] -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          
          {/* Close Button */}
          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-full opacity-70 hover:opacity-100 transition-opacity focus:outline-none z-10">
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="px-6 py-6">
            {/* Header - More Compact */}
            <DialogPrimitive.Title className="text-xl font-light text-white mb-5">
              Support
            </DialogPrimitive.Title>

            {/* Form */}
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-[#a0a0a0] text-xs mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full font-light rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:outline-none focus:ring-1 focus:ring-[#4a4a4a] focus:border-[#4a4a4a] transition-all"
                />
              </div>

              {/* Subject Dropdown - Custom Styled */}
              <div>
                <label className="block text-[#a0a0a0] text-xs mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full font-light rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] px-4 py-2.5 text-sm text-left flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#4a4a4a] focus:border-[#4a4a4a] transition-all"
                  >
                    <span style={{ color: subject ? '#ffffff' : '#5a5a5a' }}>
                      {subject || 'Please select a subject'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#D4C5A0] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute font-light top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-xl z-20 max-h-64 overflow-y-auto">
                        {subjects.map((subj) => (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => {
                              setSubject(subj);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full font-light text-left px-4 py-3 text-sm text-white hover:bg-[#2a2a2a] transition-colors border-b border-[#2a2a2a] last:border-b-0"
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-[#a0a0a0] text-xs mb-1.5">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe how we can help you"
                  maxLength={1000}
                  rows={4}
                  className="w-full font-light rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] px-4 py-2.5 text-white text-xs placeholder:text-[#5a5a5a] focus:outline-none focus:ring-1 focus:ring-[#4a4a4a] focus:border-[#4a4a4a] resize-none transition-all"
                />
                <div className="text-right text-xs text-[#5a5a5a] mt-1">
                  {message.length}/1000
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-normal text-[#1a1a1a] hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send message
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Demo component to show the dialog in action
function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-primary text-[#1a1a1a] font-light rounded-xl hover:bg-primary/80 transition-colors"
      >
        Open Support Dialog
      </button>
      <SupportDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}