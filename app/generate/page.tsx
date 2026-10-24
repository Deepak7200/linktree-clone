
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LinkItem = {
  link: string;
  linktext: string;
};

type ApiResult = {
  success: boolean;
  message: string;
};

const Generate = () => {

    const [handle, setHandle] = useState<string>("");

  const [links, setLinks] = useState<LinkItem[]>([
    { link: "", linktext: "" },
  ]);

  const [pic, setPic] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleChange = (
    index: number,
    link: string,
    linktext: string
  ): void => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const addLink = (): void => {
    setLinks((previousLinks) => [
      ...previousLinks,
      { link: "", linktext: "" },
    ]);
  };

  const submitLinks = async (): Promise<void> => {
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          links,
          handle,
          pic,
          desc,
        }),
      });

      const result: ApiResult = await response.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linktext: "" }]);
        setPic("");
        setDesc("");
        setHandle("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-2 pt-36">
      <div className="col1 flex justify-center items-center flex-col text-gray-900">
        <div className="flex flex-col gap-5 my-8">
          <h1 className="font-bold text-4xl">Create your Bittree</h1>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim your Handle
            </h2>

            <div className="mx-4">
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="px-4 py-2 my-2 bg-white rounded-full"
                type="text"
                placeholder="Choose a Handle"
              />
            </div>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 2: Add Links
            </h2>

            {links.map((item, index) => (
              <div key={index} className="mx-4">
                <input
                  value={item.linktext}
                  onChange={(e) =>
                    handleChange(index, item.link, e.target.value)
                  }
                  className="px-4 py-2 mx-2 my-2 bg-white rounded-full"
                  type="text"
                  placeholder="Enter link text"
                />

                <input
                  value={item.link}
                  onChange={(e) =>
                    handleChange(index, e.target.value, item.linktext)
                  }
                  className="px-4 py-2 mx-2 my-2 bg-white rounded-full"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}

            <button
              onClick={addLink}
              className="p-5 py-2 mx-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-3xl"
            >
              + Add Link
            </button>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add Picture and Description
            </h2>

            <div className="mx-4 flex flex-col">
              <input
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                className="px-4 py-2 mx-2 my-2 bg-white rounded-full"
                type="text"
                placeholder="Enter link to your Picture"
              />

              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-2 mx-2 my-2 bg-white rounded-full"
                type="text"
                placeholder="Enter description"
              />

              <button
                disabled={
                  pic.trim() === "" ||
                  handle.trim() === "" ||
                  links.length === 0 ||
                  links[0].linktext.trim() === ""
                }
                onClick={submitLinks}
                className="disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 bg-slate-900 text-white font-bold rounded-3xl"
              >
                Create your BitTree
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col2 w-full h-screen bg-[#E9C0E9]">
        <Image
          className="h-full w-full object-contain"
          src="/generate.png"
          alt="Generate your links"
          width={600}
          height={800}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Generate;
