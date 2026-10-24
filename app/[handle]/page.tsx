
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import type { ObjectId } from "mongodb";

type LinkItem = {
  link: string;
  linktext: string;
};

type Bittree = {
  _id?: ObjectId;
  handle: string;
  links: LinkItem[];
  pic: string;
  desc?: string;
};

type PageProps = {
  params: Promise<{ handle: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-purple-400">
          Loading Bittree...
        </div>
      }
    >
      <BittreeProfile params={params} />
    </Suspense>
  );
}

async function BittreeProfile({ params }: PageProps) {
  await connection();

  const { handle } = await params;

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection<Bittree>("links");

  const item = await collection.findOne({ handle });

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-purple-400 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={item.pic}
          alt={`${item.handle}'s profile picture`}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />

        <span className="text-xl font-bold">@{item.handle}</span>

        <span className="w-80 text-center">
          {item.desc ?? ""}
        </span>

        <div className="links">
          {item.links.map((linkItem, index) => (
            <Link
                key={index}
                href={
                    /^https?:\/\//i.test(linkItem.link)
                    ? linkItem.link
                    : `https://${linkItem.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                >
              <div className="my-3 flex min-w-96 justify-center rounded-md bg-purple-100 px-2 py-4 shadow-lg">
                {linkItem.linktext}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
