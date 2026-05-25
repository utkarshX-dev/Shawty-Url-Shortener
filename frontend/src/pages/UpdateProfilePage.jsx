import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../services/profileService";
import { toastError, toastSuccess } from "../utils/toast";

export default function UpdateProfilePage() {
  const navigate = useNavigate();
  const { user, applyUserUpdate } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    photoUrl: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      if (form.username.trim())
        payload.append("username", form.username.trim());
      if (form.email.trim()) payload.append("email", form.email.trim());
      if (form.password.trim())
        payload.append("password", form.password.trim());
      if (form.photoUrl) payload.append("photoUrl", form.photoUrl);

      const data = await updateProfile(payload);

      applyUserUpdate(data.user);

      setForm((prev) => ({
        ...prev,
        password: "",
        photoUrl: null,
      }));

      toastSuccess(data.message || "Profile updated");
      navigate("/profile");
    } catch (error) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-12">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]"></div>

      <article
        className="
        w-full rounded-3xl
        border border-white/10
        bg-white/5 backdrop-blur-2xl
        p-8 md:p-10
        shadow-[0_0_40px_rgba(255,255,255,0.06)]
        "
      >
        {/* Heading */}
        <div className="mb-8 flexitems-start gap-2 text-center justify-center">
          <h1
            className="
            text-4xl md:text-5xl
            font-bold tracking-tight
            text-white
            "
          >
            Update Profile
          </h1>

          <p className="mt-3 text-zinc-400 text-sm md:text-base">
            Change your details and keep your profile looking clean ✦
          </p>
        </div>

        {/* Form */}
        <form className="grid gap-5" onSubmit={handleUpdate}>
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="
              w-full rounded-2xl
              border border-white/10
              bg-black/40
              px-4 py-3
              text-white
              placeholder:text-zinc-500
              outline-none
              transition-all duration-300
              focus:border-white/30
              focus:ring-2 focus:ring-white/10
              "
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="
              w-full rounded-2xl
              border border-white/10
              bg-black/40
              px-4 py-3
              text-white
              placeholder:text-zinc-500
              outline-none
              transition-all duration-300
              focus:border-white/30
              focus:ring-2 focus:ring-white/10
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave empty to keep same"
              className="
              w-full rounded-2xl
              border border-white/10
              bg-black/40
              px-4 py-3
              text-white
              placeholder:text-zinc-500
              outline-none
              transition-all duration-300
              focus:border-white/30
              focus:ring-2 focus:ring-white/10
              "
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Profile Photo
            </label>

            <input
              type="file"
              name="photoUrl"
              accept="image/*"
              onChange={handleChange}
              className="
              w-full rounded-2xl
              border border-dashed border-white/15
              bg-black/30
              px-4 py-3
              text-sm text-zinc-300
              file:mr-4
              file:rounded-xl
              file:border-0
              file:bg-white
              file:px-4
              file:py-2
              file:text-sm
              file:font-medium
              file:text-black
              hover:border-white/30
              transition-all duration-300
              "
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="
  group relative overflow-hidden
  rounded-2xl
  bg-white
  !text-black
  px-6 py-3
  font-semibold
  transition-all duration-300
  hover:scale-105
  hover:bg-zinc-200
  hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]
  "
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/profile")}
              className="
              rounded-2xl
              border border-white/10
              bg-white/5
              px-6 py-3
              text-white
              hover:bg-white/10
              transition-all duration-300
              "
            >
              Cancel
            </Button>
          </div>
        </form>
      </article>
    </section>
  );
}
