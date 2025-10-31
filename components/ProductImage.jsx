"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  
  if (images.length === 1) {
    return (
      <div className="flex items-center justify-center bg-[#F6F7F8] w-[603px] h-[361px] py-[15px] px-[20px] rounded-[12px]">
        <Image
          src={images[0]}
          alt="Product Image"
          width={165}
          height={266}
          className="object-contain rounded-lg h-[266px]"
        />
      </div>
    );
  }
  
  return (
    <div className="flex gap-4 bg-[#F6F7F8] w-[603px] h-[361px] py-[15px] px-[20px] rounded-[12px]">
      {/* Thumbnails */}
      <div className="flex flex-col gap-[6px]">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-[46px] h-[46px] flex flex-row justify-center items-center border border-[#e1e1e1] rounded-none bg-[#F5F5F5] cursor-pointer overflow-hidden focus:outline-none ${
              selectedImage === img ? "border-blue-500" : "border-[#e1e1e1]"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={33}
              height={33}
              className="object-contain h-[33px]"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={selectedImage}
          alt="Selected Product"
          width={165}
          height={266}
          className="object-contain h-[266px] rounded-lg transition-all duration-300"
        />
      </div>
    </div>
  );
}