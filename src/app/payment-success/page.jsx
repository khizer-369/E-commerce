// ⚠️ I used AI for payment-success page
const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4 py-8">
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
      @keyframes checkDraw {
        0%   { stroke-dashoffset: 62; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes rippleOut {
        0%   { transform: scale(0.9); opacity: 0.55; }
        100% { transform: scale(1.55); opacity: 0; }
      }
      @keyframes fadeUp {
        0%   { transform: translateY(10px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }

      .icon-in { animation: iconIn 0.56s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .disc-in { animation: discIn 0.42s cubic-bezier(0.22,0.61,0.36,1) forwards; }
      .ring-draw { animation: ringDraw 0.62s cubic-bezier(0.65,0,0.35,1) 0.14s forwards; }
      .check-draw { animation: checkDraw 0.34s cubic-bezier(0.65,0,0.35,1) 0.62s forwards; }
      .ripple-anim { animation: rippleOut 0.9s cubic-bezier(0.2,0.6,0.35,1) 0.52s forwards; }
      .fade-up-anim { animation: fadeUp 0.5s ease-out 0.9s forwards; }

      @media (prefers-reduced-motion: reduce) {
        .icon-in, .disc-in, .ring-draw, .check-draw, .ripple-anim, .fade-up-anim {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
        .ripple-anim { display: none; }
      }
    `}</style>

      <div className="flex flex-col items-center">
        <div
          className="icon-in relative w-28 h-28 opacity-0"
          style={{ transform: "scale(0.4)" }}
        >
          {/* ripple pulse */}
          <div
            className="ripple-anim absolute inset-0 rounded-full border-2 border-emerald-700 opacity-0"
            style={{ transform: "scale(0.9)" }}
          />

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
              className="fill-green-500 disc-in origin-center opacity-0"
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
              className="text-green-600 ring-draw origin-center"
            />

            {/* checkmark draw */}
            <path
              d="M32 54 L46 68 L74 38"
              stroke="#ecfdf5"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="62"
              strokeDashoffset="62"
              className="check-draw"
            />
          </svg>
        </div>

        <h1
          className="fade-up-anim opacity-0 mt-6 text-2xl font-semibold text-green-500"
          style={{ transform: "translateY(10px)" }}
        >
          Payment successful
        </h1>
      </div>
    </div>
  )
}

export default page
