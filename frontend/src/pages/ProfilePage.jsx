import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'
import ConfirmModal from '../components/ConfirmModal'
import useAuth from '../hooks/useAuth'
import { toastError, toastInfo } from '../utils/toast'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, removeAccount } = useAuth()

  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDeleteAccount = async () => {
    try {
      const data = await removeAccount()

      toastInfo(data.message || 'Account deleted')

      navigate('/register')
    } catch (error) {
      toastError(error.message)
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8">

      {/* heading */}
      <div className="flex flex-col items-center justify-center text-center">

        <h1
          className="
          text-4xl md:text-5xl
          font-black tracking-tight
          bg-gradient-to-r from-white via-zinc-300 to-zinc-500
          bg-clip-text text-transparent
          "
        >
          Your Profile
        </h1>

        <p className="mt-3 text-sm md:text-base text-zinc-400">
          Manage your account settings and personal information ✦
        </p>
      </div>

      {/* profile card */}
      <article
        className="
        rounded-[2rem]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6 md:p-8
        shadow-[0_0_40px_rgba(255,255,255,0.04)]
        "
      >

        <div className="flex flex-col gap-8 md:flex-row md:items-center">

          {/* avatar */}
          <div
            className="
            relative mx-auto md:mx-0
            h-28 w-28
            overflow-hidden rounded-full
            border border-white/10
            bg-black/30
            shadow-[0_0_30px_rgba(255,255,255,0.08)]
            "
          >
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                flex h-full w-full
                items-center justify-center
                text-4xl font-bold text-white
                "
              >
                {(user?.username || 'U')[0]}
              </div>
            )}
          </div>

          {/* details */}
          <div className="flex-1 text-center md:text-left">

            <h1 className="text-3xl font-bold text-white">
              {user?.username || 'Unknown'}
            </h1>

            <p className="mt-2 text-zinc-400">
              {user?.email}
            </p>

            <div
              className="
              mt-5 inline-flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-black/20
              px-4 py-2
              "
            >
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                User ID
              </span>

              <span className="font-mono text-sm text-zinc-200">
                {user?._id || user?.id || '—'}
              </span>
            </div>
          </div>

          {/* edit button */}
          <div className="flex justify-center md:justify-end">
            <Link to="/profile/edit">

              <button
                className="
                group relative overflow-hidden
                rounded-2xl
                border border-white/15
                bg-white/10
                px-6 py-3
                font-semibold tracking-wide
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:scale-105
                hover:border-white/30
                hover:bg-white
                hover:text-black
                hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                active:scale-95
                "
              >
                <span className="relative z-10">
                  Edit Profile
                </span>

                <span
                  className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r from-transparent via-white/40 to-transparent
                  transition-transform duration-1000
                  group-hover:translate-x-full
                  "
                />
              </button>

            </Link>
          </div>

        </div>
      </article>

      {/* danger zone */}
      <article
        className="
        rounded-[2rem]
        border border-red-500/20
        bg-red-500/[0.05]
        backdrop-blur-2xl
        p-6 md:p-8
        shadow-[0_0_40px_rgba(239,68,68,0.08)]
        "
      >

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <h2
              className="
              text-2xl md:text-3xl
              font-bold tracking-wide
              text-transparent bg-clip-text
              bg-gradient-to-r from-red-400 via-red-200 to-red-500
              drop-shadow-[0_0_12px_rgba(248,113,113,0.35)]
              "
            >
              Delete Account
            </h2>

            <p className="mt-3 max-w-xl text-sm text-red-300">
              This action permanently removes your account and all associated URLs.
              This cannot be undone.
            </p>
          </div>

          {/* delete button */}
          <Button
            onClick={() => setConfirmOpen(true)}
            className="
            group relative overflow-hidden
            rounded-2xl
            border border-red-500/30
            bg-red-500/10
            px-6 py-3
            font-semibold tracking-wide
            text-red-300
            backdrop-blur-md
            transition-all duration-300
            hover:scale-105
            hover:border-red-400
            hover:bg-red-500
            hover:text-white
            hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]
            active:scale-95
            "
          >
            <span className="relative z-10">
              Delete Account
            </span>

            <span
              className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r from-transparent via-white/20 to-transparent
              transition-transform duration-1000
              group-hover:translate-x-full
              "
            />
          </Button>

        </div>
      </article>

      {/* modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Account"
        description="This will remove your account permanently. Continue?"
        confirmText="Delete Account"
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </section>
  )
}