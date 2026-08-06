// ⚠️ I used AI for payment-failed page
const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50/70 px-4 py-8">
            <style>{`
        @keyframes iconIn {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          80%  { transform: scale(0.97); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes discIn {
          0%   { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ringDraw {
          0%   { stroke-dashoffset: 289; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes crossDraw {
          0%   { stroke-dashoffset: 46; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-5px); }
          40%  { transform: translateX(4px); }
          60%  { transform: translateX(-3px); }
          80%  { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeUp {
          0%   { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
 
        .icon-in { animation: iconIn 0.56s cubic-bezier(0.34,1.56,0.64,1) forwards, shake 0.4s ease-in-out 1.02s forwards; }
        .disc-in { animation: discIn 0.42s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .ring-draw { animation: ringDraw 0.62s cubic-bezier(0.65,0,0.35,1) 0.14s forwards; }
        .cross-draw-1 { animation: crossDraw 0.22s cubic-bezier(0.65,0,0.35,1) 0.68s forwards; }
        .cross-draw-2 { animation: crossDraw 0.22s cubic-bezier(0.65,0,0.35,1) 0.82s forwards; }
        .fade-up-anim { animation: fadeUp 0.5s ease-out 1.05s forwards; }
 
        @media (prefers-reduced-motion: reduce) {
          .icon-in, .disc-in, .ring-draw, .cross-draw-1, .cross-draw-2, .fade-up-anim {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

            <div className="flex flex-col items-center">
                <div
                    className="icon-in relative w-28 h-28 opacity-0"
                    style={{ transform: "scale(0.4)" }}
                >
                    <svg
                        viewBox="0 0 104 104"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* filled base disc */}
                        <circle
                            cx="52"
                            cy="52"
                            r="44"
                            className="fill-red-500 disc-in origin-center opacity-0"
                            style={{ transform: "scale(0.6)" }}
                        />

                        {/* ring stroke draw */}
                        <circle
                            cx="52"
                            cy="52"
                            r="46"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            transform="rotate(-90 52 52)"
                            strokeDasharray="289"
                            strokeDashoffset="289"
                            className="text-red-500 ring-draw origin-center"
                        />

                        {/* cross: two strokes drawn in sequence */}
                        <path
                            d="M36 36 L68 68"
                            stroke="#fff1f2"
                            strokeWidth="6.5"
                            strokeLinecap="round"
                            strokeDasharray="46"
                            strokeDashoffset="46"
                            className="cross-draw-1"
                        />
                        <path
                            d="M68 36 L36 68"
                            stroke="#fff1f2"
                            strokeWidth="6.5"
                            strokeLinecap="round"
                            strokeDasharray="46"
                            strokeDashoffset="46"
                            className="cross-draw-2"
                        />
                    </svg>
                </div>

                <h1
                    className="fade-up-anim opacity-0 mt-6 text-2xl font-semibold text-red-500"
                    style={{ transform: "translateY(10px)" }}
                >
                    Payment failed
                </h1>
            </div>
        </div>
    )
}

export default page
