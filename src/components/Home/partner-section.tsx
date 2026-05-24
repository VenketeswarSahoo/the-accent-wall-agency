import React from "react";
import Image from "next/image";
import {
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
  partner10,
  partner11,
  partner12,
  partner13,
  partner14,
  partner15,
  partner16,
  partner17,
} from "@/assets";

const partnerLogos = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
  partner10,
  partner11,
  partner12,
  partner13,
  partner14,
  partner15,
];

import Section from "../ui/section";

interface PartnerSectionProps {
  dict: any;
}

const PartnerSection = ({ dict }: PartnerSectionProps) => {
  const services: string[] = dict?.partners?.services || [];

  return (
    <Section py="py-12 lg:py-32">
      <div className="relative w-full bg-primary overflow-hidden min-h-[180px] flex items-center p-10 lg:p-16 selection:bg-white selection:text-primary-foreground">

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">
            {dict?.partners?.title}
          </h2>
          <p className="text-lg lg:text-2xl text-white">
            {dict?.partners?.subtitle}
          </p>
        </div>

        {/* Right side decorative SVG */}
        <div className="absolute right-0 top-0 h-full w-full sm:w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
          <svg
            width="510"
            height="588"
            viewBox="0 0 510 588"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 -translate-y-[18%] right-16 hidden sm:block h-[150%] w-auto opacity-80"
          >
            <path
              opacity="0.4"
              d="M315.242 0.00152588C388.648 0.00214156 448.154 131.605 448.154 293.944C448.154 456.283 388.648 587.884 315.242 587.884V587.885L376.587 587.884L377.446 587.878C450.456 586.856 509.5 455.648 509.5 293.943C509.5 131.603 449.993 0.000747503 376.587 0.000549316L315.242 0.000549316V0.00152588Z"
              fill="white"
            ></path>
            <path
              opacity="0.4"
              d="M223.337 0.00109863C296.743 0.00109863 356.25 131.604 356.25 293.943C356.25 456.283 296.743 587.885 223.337 587.885L223.335 587.884V587.886H284.68L285.54 587.879C358.55 586.857 417.593 455.649 417.593 293.943C417.593 131.604 358.086 0.00109863 284.68 0.00109863L223.337 0.00109863Z"
              fill="white"
            ></path>
            <path
              opacity="0.4"
              d="M131.21 0.00158691C204.615 0.00284563 264.122 131.605 264.122 293.944C264.122 456.283 204.615 587.883 131.21 587.884V587.885H192.555L193.414 587.88C266.424 586.857 325.468 455.65 325.468 293.944C325.468 131.604 265.96 0.00066497 192.555 0.000610352L131.21 0.000610352V0.00158691Z"
              fill="white"
            ></path>
            <path
              d="M133.057 0.000976562L194.258 0.000976562C120.852 0.00193884 61.3457 131.604 61.3457 293.943C61.3458 456.282 120.852 587.883 194.258 587.884V587.885H132.914V587.883L132.913 587.884C59.5075 587.883 0 456.281 0 293.941C0.000136262 131.602 59.5076 0.000453643 132.913 0C132.961 0 133.009 0.000863435 133.057 0.000976562Z"
              fill="white"
            ></path>
            <path
              d="M378.29 0.00109863C304.885 0.00297758 245.379 131.605 245.379 293.943C245.379 456.282 304.885 587.882 378.29 587.884V587.885H317.089C317.041 587.885 316.993 587.886 316.945 587.886C243.54 587.885 184.032 456.283 184.032 293.943C184.032 131.604 243.54 0.00163156 316.945 0.00109863L378.29 0.00109863Z"
              fill="white"
            ></path>
            <path
              d="M286.383 0.00109863C212.977 0.00109863 153.469 131.604 153.469 293.943C153.469 456.193 212.91 587.738 286.26 587.885H225.182C225.135 587.885 225.087 587.886 225.039 587.886C151.633 587.886 92.1258 456.283 92.1257 293.943C92.1257 131.604 151.633 0.00137634 225.039 0.00109863L286.383 0.00109863Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Partner Logos Grid - Internal borders only */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 mt-24">
        {partnerLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 aspect-video grayscale hover:grayscale-0 transition-all duration-500 bg-black"
          >
            <Image
              src={logo}
              alt={`Partner ${index + 1}`}
              className="max-h-44 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Service Marquee - Left to Right */}
      <div className="w-full mt-32 overflow-hidden py-10">
        <div className="flex whitespace-nowrap animate-ticker w-fit border-y border-white/10 py-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {services.map((service, index) => (
                <React.Fragment key={index}>
                  <span className="text-2xl md:text-3xl text-muted-foreground hover:text-white transition-colors cursor-default tracking-tight">
                    {service}
                  </span>
                  <span className="text-primary text-2xl md:text-7xl opacity-40 -mt-3">
                    ·
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PartnerSection;
