
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState<string>("");

  const getTree = (): void => {
    router.push(`${process.env.NEXT_PUBLIC_HOST}/${encodeURIComponent(text)}`);
    setText("");
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-2 pt-32">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-6xl">
            Everything you
          </p>
          <p className="text-yellow-300 font-bold text-6xl">
            are. In one,
          </p>
          <p className="text-yellow-300 font-bold text-6xl">
            simple link in bio.
          </p>

          <p className="text-yellow-300 text-xl my-4">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="input flex gap-2">
            <input
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              className="px-2 py-2 bg-white rounded-md"
              type="text"
              placeholder="Enter your Handle"
            />

            <button
              onClick={getTree}
              className="bg-purple-400 hover:bg-purple-500 rounded-full px-4 py-4 font-semibold"
            >
              Claim your Bittree
            </button>
            
          </div>
        </div>

        <div className="flex items-center justify-center flex-col mr-[10vw]">
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
