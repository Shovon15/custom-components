import Image from "next/image";

export default function MarqueeLayout() {
  return (
    <div className="flex flex-col items-center">
      <HorizontalMarquee />
      <div className="my-5" />
      <HorizontalMarquee reverse />
    </div>
  );
}

function HorizontalMarquee({ reverse = false }) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <MarqueeLogos />
        <MarqueeLogos />
      </div>
    </div>
  );
}

function MarqueeLogos() {
  const logos = [
    "https://i.ibb.co/q5XDptD/client-logo-1.png",
    "https://i.ibb.co/LSmZvJD/client-logo-4.png",
    "https://i.ibb.co/pK9KdhT/client-logo-5.png",
    "https://i.ibb.co/Q6PRFPg/client-logo-3.png",
    "https://i.ibb.co/pK9KdhT/client-logo-5.png",
    "https://i.ibb.co/LSmZvJD/client-logo-4.png",
    "https://i.ibb.co/Q6PRFPg/client-logo-3.png",
    "https://i.ibb.co/pK9KdhT/client-logo-5.png",
    "https://i.ibb.co/LSmZvJD/client-logo-4.png",
    "https://i.ibb.co/Q6PRFPg/client-logo-3.png",
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <div
          key={index}
          className="flex items-center justify-center mx-4 w-[200px]"
        >
          <Image
            src={logo || "/placeholder.svg"}
            alt={`Client logo ${index + 1}`}
            width={100}
            height={100}
            className="max-w-[100px] h-auto"
          />
        </div>
      ))}
    </>
  );
}

function TextMarquee({ reverse = false }) {
  const texts = [
    "This is a horizontal Marquee",
    "It just keeps going and going",
    "No interactions or Javascript Involved",
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-4">
      <div
        className={`flex ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } whitespace-nowrap`}
      >
        {texts.map((text, index) => (
          <span key={index} className="mx-4 text-xl font-bold">
            {text}
          </span>
        ))}
        {texts.map((text, index) => (
          <span key={index + texts.length} className="mx-4 text-xl font-bold">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
// function VerticalMarquee({ reverse = false }) {
//   return (
//     <div className="flex">
//       {[1, 2, 3].map((index) => (
//         <div key={index} className="w-[200px] h-[600px] overflow-hidden mx-2">
//           <div
//             className={`flex flex-col ${
//               reverse ? "animate-marquee-up" : "animate-marquee-down"
//             }`}
//           >
//             <MarqueeLogos vertical />
//             <MarqueeLogos vertical />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
