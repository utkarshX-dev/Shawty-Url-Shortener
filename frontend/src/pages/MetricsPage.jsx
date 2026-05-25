import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import StatsCard from '../components/StatsCard'
import EmptyState from '../components/EmptyState'
import { getDashboardMetrics } from '../services/urlService'
import { normalizeShortUrl, truncate } from '../utils/format'
import { toastError } from '../utils/toast'

export default function MetricsPage() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const data = await getDashboardMetrics()
        setMetrics(data)
      } catch (error) {
        toastError(error.message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [])

  if (loading) return <Loader text="Loading metrics..." />

  const totalUrls = metrics?.totalUrls ?? 0
  const totalClicks = metrics?.totalClicks ?? 0
  const avgClicks = totalUrls ? (totalClicks / totalUrls).toFixed(1) : '0.0'

  return (
  <section className="space-y-8">

    {/* heading */}
    <div className="flex flex-col items-center justify-center text-center">

      <h1
        className="
        text-4xl md:text-5xl
        font-black tracking-tight
        bg-gradient-to-r from-white via-zinc-300 to-white
        bg-clip-text text-transparent
        "
      >
        Metrics
      </h1>

      <p className="mt-3 text-sm md:text-base text-zinc-400">
        Track your URLs, clicks, and performance analytics ✦
      </p>
    </div>

    {/* stats */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        transition-all duration-300
        hover:border-white/20
        hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]
        "
      >
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Total URLs
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          {totalUrls}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Current total shortened links
        </p>
      </div>

      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        transition-all duration-300
        hover:border-white/20
        hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]
        "
      >
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Total Clicks
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          {totalClicks}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          All recorded redirects
        </p>
      </div>

      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        transition-all duration-300
        hover:border-white/20
        hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]
        "
      >
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Average
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          {avgClicks}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Average clicks per URL
        </p>
      </div>
    </div>

    {/* top urls */}
    <div
      className="
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6 md:p-8
      shadow-[0_0_40px_rgba(255,255,255,0.04)]
      "
    >

      <div className="mb-6 flex flex-col items-center justify-center text-center">

        <h2
          className="
          text-2xl md:text-3xl
          font-bold text-white
          "
        >
          Top URLs
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Your most visited shortened links
        </p>
      </div>

      {!metrics?.topUrls?.length ? (
        <div
          className="
          rounded-2xl
          border border-dashed border-white/10
          bg-black/20
          py-16
          "
        >
          <EmptyState
            title="No metrics yet"
            description="Share your links to generate click analytics."
          />
        </div>
      ) : (
        <div className="space-y-4">

          {metrics.topUrls.map((item) => (
            <article
              key={item._id}
              className="
              rounded-2xl
              border border-white/10
              bg-black/20
              p-5
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/[0.03]
              "
            >

              <p className="font-medium break-words text-white">
                {truncate(item.originalUrl, 80)}
              </p>

              <a
                href={normalizeShortUrl(item.shortUrl)}
                target="_blank"
                rel="noreferrer"
                className="
                mt-3 inline-block
                break-all
                text-sm
                text-zinc-400
                underline underline-offset-4
                hover:text-white
                transition-colors
                "
              >
                {normalizeShortUrl(item.shortUrl)}
              </a>

              <div className="mt-4 flex items-center justify-between">

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Clicks
                </p>

                <span
                  className="
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-3 py-1
                  text-sm font-semibold
                  text-white
                  "
                >
                  {item.clicks ?? 0}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>
)
}
