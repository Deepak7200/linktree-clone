
import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  await connection();

  const handle = request.nextUrl.searchParams.get("handle");

  try {
    if (!handle?.trim()) {
      return NextResponse.json(
        { exists: false, message: "Please enter a handle." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const item = await collection.findOne({
      handle: handle.trim(),
    });

    return NextResponse.json({
      exists: Boolean(item),
      message: item ? "Handle found." : "This handle does not exist.",
    });
  } catch (error) {
    console.error("Error checking handle:", error);

    return NextResponse.json(
      { message: "Unable to check handle. Please try again." },
      { status: 500 }
    );
  }
}
