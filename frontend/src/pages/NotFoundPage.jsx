import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section
      className="
      relative mx-auto flex min-h-[80vh]
      w-full max-w-2xl
      items-center justify-center
      px-4
      "
    >

      {/* glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      <div
        className="
        relative overflow-hidden
        w-full
        rounded-[2rem]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-10 md:p-14
        text-center
        shadow-[0_0_50px_rgba(255,255,255,0.05)]
        "
      >

        {/* background text */}
        <h1
          className="
          pointer-events-none absolute inset-0
          flex items-center justify-center
          text-[8rem] md:text-[12rem]
          font-black italic
          text-white/[0.03]
          select-none
          "
        >
          404
        </h1>

        <div className="relative z-10">

          <p
            className="
            text-xs uppercase
            tracking-[0.35em]
            text-zinc-500
            "
          >
            lost in space
          </p>

          <h1
            className="
            mt-4
            text-5xl md:text-6xl
            font-black tracking-tight
            bg-gradient-to-r from-white via-zinc-300 to-zinc-500
            bg-clip-text text-transparent
            "
          >
            Page Not Found
          </h1>

          <p className="mt-5 text-sm md:text-base text-zinc-400">
            The page you are looking for does not exist or may have been moved.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              to="/"
              className="
              inline-flex items-center justify-center
              rounded-2xl
              bg-white
              px-6 py-3
              text-sm font-semibold
              text-black
              transition-all duration-300
              hover:scale-105
              hover:bg-zinc-200
              hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
              "
            >
              Go Home
            </Link>

            <Link
              to="/privacy-policy"
              className="
              inline-flex items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/5
              px-6 py-3
              text-sm font-semibold
              text-zinc-300
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
              "
            >
              Privacy Policy
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}