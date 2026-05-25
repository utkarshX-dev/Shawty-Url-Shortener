import { useEffect, useMemo, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import Loader from '../components/Loader'
import StatsCard from '../components/StatsCard'
import URLCard from '../components/URLCard'
import EmptyState from '../components/EmptyState'
import { getDashboardMetrics, deleteUserUrl } from '../services/urlService'
import useClipboard from '../hooks/useClipboard'
import ConfirmModal from '../components/ConfirmModal'
import { toastError, toastInfo, toastSuccess } from '../utils/toast'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)
  const [deleteId, setDeleteId] = useState('')
  const { copy, copiedText } = useClipboard()

  const loadMetrics = async () => {
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

  useEffect(() => {
    let active = true

    const run = async () => {
      try {
        const data = await getDashboardMetrics()
        if (active) setMetrics(data)
      } catch (error) {
        if (active) toastError(error.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    void run()

    return () => {
      active = false
    }
  }, [])

  const cards = useMemo(() => {
    if (!metrics) {
      return [
        { title: 'Total URLs', value: '0', subtitle: 'All your links' },
        { title: 'Total Clicks', value: '0', subtitle: 'Redirect analytics' },
        { title: 'Top URLs', value: '0', subtitle: 'Highest click links' },
      ]
    }

    return [
      { title: 'Total URLs', value: metrics.totalUrls ?? 0, subtitle: 'All your links' },
      { title: 'Total Clicks', value: metrics.totalClicks ?? 0, subtitle: 'Redirect analytics' },
      { title: 'Top URLs', value: metrics.topUrls?.length ?? 0, subtitle: 'Highest click links' },
    ]
  }, [metrics])

  const handleCopy = async (text) => {
    await copy(text)
    toastInfo('URL copied to clipboard')
  }

  const confirmDelete = async () => {
    try {
      const data = await deleteUserUrl(deleteId)
      toastSuccess(data.message || 'URL deleted')
      setDeleteId('')
      await loadMetrics()
    } catch (error) {
      toastError(error.message)
    }
  }

  if (loading) return <Loader text="Loading dashboard..." />

  return (
  <section className="relative space-y-8">

    {/* background glow */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
    </div>

    {/* heading */}
    <div className="flex flex-col items-center justify-center text-center">
      <h1
        className="
        bg-gradient-to-r from-white via-zinc-300 to-white
        bg-clip-text text-transparent
        text-4xl md:text-5xl
        font-black tracking-tight
        "
      >
        Dashboard
      </h1>

      <p className="mt-3 max-w-lg text-sm md:text-base text-zinc-400">
        Track your links, monitor clicks, and manage everything beautifully ✦
      </p>
    </div>

    {/* stats cards */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
          group rounded-3xl
          border border-white/10
          bg-white/5 backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-white/20
          hover:bg-white/[0.07]
          hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]
          "
        >
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            {card.title}
          </p>

          <h2
            className="
            mt-3 text-4xl
            font-black text-white
            "
          >
            {card.value}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>

    {/* recent urls */}
    <div
      className="
      rounded-3xl
      border border-white/10
      bg-white/5 backdrop-blur-xl
      p-6 md:p-8
      shadow-[0_0_40px_rgba(255,255,255,0.04)]
      "
    >

      {/* top */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="w-full flex flex-col items-center justify-center text-center">
  <h2
    className="
    w-full
    text-center
    text-2xl md:text-3xl
    font-bold text-white
    "
  >
    Recent URLs
  </h2>

  <p className="mt-2 w-full text-center text-sm text-zinc-500">
    Your latest shortened links
  </p>
</div>

        {copiedText ? (
          <span
            className="
            inline-flex items-center gap-2
            rounded-full
            border border-white/10
            bg-white/10
            px-4 py-2
            text-xs font-medium text-zinc-200
            backdrop-blur-md
            "
          >
            <FaCopy className="text-white" />
            Copied
          </span>
        ) : null}
      </div>

      {/* empty */}
      {!metrics?.recentUrls?.length ? (
        <div
          className="
          rounded-2xl
          border border-dashed border-white/10
          bg-black/20
          py-16
          "
        >
          <EmptyState
            title="No URLs yet"
            description="Create your first shortened URL from the home page."
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {metrics.recentUrls.map((item) => (
            <div
              key={item._id}
              className="
              rounded-2xl
              border border-white/10
              bg-black/20
              p-4
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/[0.03]
              "
            >
              <URLCard
                item={item}
                onCopy={handleCopy}
                onDelete={setDeleteId}
              />
            </div>
          ))}
        </div>
      )}
    </div>

    {/* modal */}
    <ConfirmModal
      open={Boolean(deleteId)}
      title="Delete URL"
      description="This action will permanently remove the selected URL."
      confirmText="Delete"
      danger
      onCancel={() => setDeleteId('')}
      onConfirm={confirmDelete}
    />
  </section>
)
}
