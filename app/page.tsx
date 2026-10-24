
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getTree = async (): Promise<void> => {
    const handle = text.trim();

    if (!handle) {
      setError("Please enter a handle.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/check-handle?handle=${encodeURIComponent(handle)}`
      );

      const data: { exists?: boolean; message?: string } =
        await response.json();

      if (!response.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }

      if (!data.exists) {
        setError("This handle does not exist. Please check it.");
        return;
      }

      router.push(
        `${process.env.NEXT_PUBLIC_HOST}/${encodeURIComponent(handle)}`
      );

      setText("");
    } catch {
      setError("Unable to check the handle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="grid min-h-screen grid-cols-2 bg-[#254f1a] pt-32">
        <div className="ml-[10vw] flex flex-col justify-center gap-3">
          <p className="text-6xl font-bold text-yellow-300">
            Everything you
          </p>
          <p className="text-6xl font-bold text-yellow-300">
            are. In one,
          </p>
          <p className="text-6xl font-bold text-yellow-300">
            simple link in bio.
          </p>

          <p className="my-4 text-xl text-yellow-300">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  void getTree();
                }
              }}
              className="rounded-md bg-white px-2 py-2"
              type="text"
              placeholder="Enter your Handle"
            />

            <button
              onClick={getTree}
              disabled={loading}
              className="rounded-full bg-purple-400 px-4 py-4 font-semibold hover:bg-purple-500 disabled:opacity-50"
            >
              {loading ? "Checking..." : "Claim your Bittree"}
            </button>
          </div>

          {error && (
            <p role="alert" className="text-sm font-semibold text-red-300">
              {error}
            </p>
          )}
        </div>

        <div className="mr-[10vw] flex flex-col items-center justify-center">
          <Image
            src="/home1.png"
            alt="Homepage image"
            width={500}
            height={500}
            priority
          />
        </div>
      </section>
    </main>
  );
}
