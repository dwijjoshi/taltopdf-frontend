"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FileUploader } from "react-drag-drop-files";
import toast, { Toaster } from "react-hot-toast";
const fileTypes = ["PDF"];
export default function Home() {
  const [file, setFile] = useState("");
  const router = useRouter();

  const handleChange = (file) => {
    setFile(file[0]);
    console.log(file);
  };

  const submitPdf = async () => {
    if (file === null || file === "") {
      toast.error("Please provide a PDF");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));
      toast.loading("Just a moment...");
      const result = await axios.post(
        "https://talktopdf-backend.onrender.com/sendPDF",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.dismiss();
      console.log(result);
      if (result.status == 200) {
        console.log("hi");
        router.push("/chat");
      }
    }
  };
  return (
    <div className="bg-gradient-to-b to-[#19547b] from-[#ffd89b]   w-full h-screen flex items-center  flex-col">
      <Toaster />
      <div className="mt-40 text-5xl font-bold">Talk To PDF</div>
      <div className="text-center px-6 py-4">
        From pages to conversations : Simplify your complex PDFs
      </div>
      <div className="mt-20 flex flex-col items-center ">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          multiple="false"
          hoverTitle="Upload your PDF"
          classes="customFileUpload"
        />
      </div>
      <div className="mt-10">
        <button
          onClick={submitPdf}
          className="px-5 py-2 rounded-md border-gray-700 text-gray-700 border-2 font-semibold"
        >
          Submit
        </button>
      </div>
      <div className="fixed  bottom-0 mb-6 flex items-center">
        Built by{" "}
        <a href="https://github.com/dwijjoshi" className="ml-1 underline">
          Dwij Joshi
        </a>
        <a href="https://github.com/dwijjoshi" className="ml-2">
          <FaGithub className="text-xl" />
        </a>
      </div>
    </div>
  );
}
