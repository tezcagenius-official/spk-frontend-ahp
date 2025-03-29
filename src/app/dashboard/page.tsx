import Image from "next/image";
import React from "react";
import ProbanLogo from "@/assets/images/proban-logo.png";
const page = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-1/3">
                <Image
                    alt="proban-logo"
                    src={ProbanLogo}
                    width={1279}
                    height={300}
                    className="h-[300px] overflow-hidden object-cover  bg-red-100 rounded-xl mb-10"
                />
                <h2 className="text-2xl font-bold text-neutral-100">
                    Dashboard SPK ProBan
                </h2>
                <p className="text-base text-gray-300">
                    Sistem Pendukung Keputusan (SPK) untuk analisis dan
                    manajemen data perusahaan Ban ProBan. Pantau performa,
                    optimalkan strategi, dan ambil keputusan bisnis dengan lebih
                    cerdas! 🚀
                </p>
            </div>
        </div>
    );
};

export default page;
