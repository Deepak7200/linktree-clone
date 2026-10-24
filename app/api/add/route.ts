
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type LinkItem = {
  link: string;
  linktext: string;
};

type BittreeData = {
  handle: string;
  links: LinkItem[];
  pic: string;
  desc: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: BittreeData = await request.json();

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection<BittreeData>("links");

    // Check whether the handle is already claimed
    const doc = await collection.findOne({ handle: body.handle });

    if (doc) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "This Bittree already exists!",
        result: null,
      });
    }

    const result = await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      error: false,
      message: "Your Bittree has been generated!",
      result,
    });
  } catch (error) {
    console.error("Error creating Bittree:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "An error occurred while creating your Bittree.",
        result: null,
      },
      { status: 500 }
    );
  }
}
