import React from 'react'

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-400">
          Your privacy matters to us. Here's how Shawty collects, uses, and protects your information ✦
        </p>
      </div>

      {/* content */}
      <article
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6 md:p-10
        shadow-[0_0_40px_rgba(255,255,255,0.04)]
        "
      >

        {/* intro */}
        <div
          className="
          rounded-2xl
          border border-white/10
          bg-black/20
          p-5
          "
        >
          <p className="text-sm leading-relaxed text-zinc-300">
            This Privacy Policy explains how <span className="font-semibold text-white">Shawty</span> ("we", "our", "us")
            collects, uses, and discloses information when you use our service.
          </p>
        </div>

        {/* sections */}
        <div className="mt-8 space-y-8">

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              Information We Collect
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We collect information you provide directly such as account details
              (username, email) and profile photo. We also collect usage data
              (URLs shortened, click metrics), and technical data like IP address
              and user agent for link analytics.
            </p>
          </section>

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              How We Use Information
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We use information to operate and improve the service, provide
              analytics, manage accounts, and prevent abuse. Photos and profile
              data are used to display your profile and personalize the experience.
            </p>
          </section>

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              Sharing & Disclosure
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We do not sell personal information. We may share data with service
              providers (e.g., cloud storage, analytics) to operate the service.
              We may disclose information to comply with legal obligations.
            </p>
          </section>

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              Data Retention & Controls
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We retain user data for as long as necessary to provide the service
              or as required by law. You can request account deletion which will
              remove your profile and associated URLs.
            </p>
          </section>

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              Security
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We implement reasonable security measures to protect your information,
              but no system is completely secure. Use strong passwords and safeguard
              your account.
            </p>
          </section>

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            "
          >
            <h2 className="text-xl font-bold text-white">
              Contact
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Questions about this policy can be sent to our support contact
              in the app or repository.
            </p>
          </section>

        </div>

        {/* footer */}
        <div className="mt-10 border-t border-white/10 pt-5 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Last updated • 2026
          </p>
        </div>
      </article>
    </section>
  )
}