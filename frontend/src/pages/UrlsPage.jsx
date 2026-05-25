import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import URLCard from '../components/URLCard'
import EmptyState from '../components/EmptyState'
import ConfirmModal from '../components/ConfirmModal'
import useClipboard from '../hooks/useClipboard'
import { deleteUserUrl, getUserUrls } from '../services/urlService'
import { toastError, toastInfo, toastSuccess } from '../utils/toast'

export default function UrlsPage() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [deleteId, setDeleteId] = useState('')

  const { copy } = useClipboard()

  const loadUrls = async () => {
    setLoading(true)

    try {
      const data = await getUserUrls()
      setItems(data.urls || [])
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
        const data = await getUserUrls()

        if (active) {
          setItems(data.urls || [])
        }
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

  const handleCopy = async (text) => {
    await copy(text)
    toastInfo('URL copied to clipboard')
  }

  const confirmDelete = async () => {
    try {
      const data = await deleteUserUrl(deleteId)

      toastSuccess(data.message || 'URL deleted')

      setDeleteId('')

      await loadUrls()
    } catch (error) {
      toastError(error.message)
    }
  }

  if (loading) {
    return <Loader text="Loading URL list..." />
  }

  return (
    <section className="space-y-6">

      {/* urls container */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6 md:p-8
        shadow-[0_0_40px_rgba(255,255,255,0.04)]
        "
      >

        {/* section title */}
        <div className="mb-6 flex flex-col items-center justify-center text-center">

          <h2
            className="
            text-2xl md:text-3xl
            font-bold text-white
            "
          >
            All User URLs
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Manage, copy, and delete all your shortened links ✦
          </p>
        </div>

        {/* empty state */}
        {!items.length ? (
          <div
            className="
            rounded-2xl
            border border-dashed border-white/10
            bg-black/20
            py-16
            "
          >
            <EmptyState
              title="No URLs found"
              description="Create links from Home page and manage them here."
            />
          </div>
        ) : (
          <div className="grid gap-4">

            {items.map((item) => (
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
                hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]
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
        description="Are you sure you want to delete this URL?"
        confirmText="Delete"
        danger
        onCancel={() => setDeleteId('')}
        onConfirm={confirmDelete}
      />
    </section>
  )
}