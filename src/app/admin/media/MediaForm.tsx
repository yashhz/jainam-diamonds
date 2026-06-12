"use client";
import React, { useState } from "react";
import Image from "next/image";
import { uploadImage, updateConfig } from "../../actions";

export default function MediaForm({ initialConfig }: { initialConfig: any }) {
  const [config, setConfig] = useState(initialConfig || {});
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(key);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);
    if (result.success) {
      const newUrl = result.url;
      setConfig({ ...config, [key]: newUrl });
      await updateConfig({ [key]: newUrl });
      alert("Image uploaded and replaced successfully!");
    } else {
      alert("Error: " + result.error);
    }
    setUploading(null);
  };

  return (
    <div className="animate-fade-in pb-20">
      <h1 className="text-3xl font-serif mb-2">Media Library</h1>
      <p className="text-gray-400 font-light mb-10 text-sm tracking-wide">
        Manage your website's hero banners and product background images.
      </p>

      <div className="space-y-12 max-w-5xl pt-8">
        
        {/* Core Assets */}
        <div>
          <h3 className="text-[#CCA43D] mb-6 text-sm tracking-widest uppercase flex items-center gap-4">
            Current Active Media <div className="h-[1px] flex-1 bg-[#1a1a1a]"></div>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
            <div className="border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden rounded-sm group relative">
              <div className="absolute top-4 right-4 z-10 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-widest text-[#CCA43D] backdrop-blur-sm">
                Homepage
              </div>
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={config.heroDiamondImage || "/Diamond.jpg"} alt="Diamond Hero" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h4 className="text-white mb-2 uppercase tracking-wide text-sm font-semibold">Diamond Core Background</h4>
                <p className="text-xs text-gray-500 font-light mb-6">Visible on the main landing split banner.</p>
                <div className="flex gap-4">
                  <label className="flex-1 text-xs text-center text-[#CCA43D] hover:text-black uppercase tracking-widest border border-[#CCA43D]/50 px-4 py-2 hover:bg-[#CCA43D] transition-colors font-semibold cursor-pointer">
                    {uploading === "heroDiamondImage" ? "Uploading..." : "Replace"}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "heroDiamondImage")} disabled={!!uploading} />
                  </label>
                </div>
              </div>
            </div>

            <div className="border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden rounded-sm group relative">
              <div className="absolute top-4 right-4 z-10 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-widest text-[#CCA43D] backdrop-blur-sm">
                Homepage
              </div>
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={config.heroJewelryImage || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop"} alt="Jewelry Hero" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h4 className="text-white mb-2 uppercase tracking-wide text-sm font-semibold">Jewelry Split Background</h4>
                <p className="text-xs text-gray-500 font-light mb-6">Visible on the main landing split banner.</p>
                <div className="flex gap-4">
                   <label className="flex-1 text-xs text-center text-[#CCA43D] hover:text-black uppercase tracking-widest border border-[#CCA43D]/50 px-4 py-2 hover:bg-[#CCA43D] transition-colors font-semibold cursor-pointer">
                    {uploading === "heroJewelryImage" ? "Uploading..." : "Replace"}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "heroJewelryImage")}  disabled={!!uploading}/>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Masterpiece Collection Images */}
        <div>
          <h3 className="text-[#CCA43D] mb-6 text-sm tracking-widest uppercase flex items-center gap-4">
            Masterpiece Collection <div className="h-[1px] flex-1 bg-[#1a1a1a]"></div>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: "collectionEternityRings", title: "Eternity Rings", fallback: "/eternity ring photo.jpeg" },
              { id: "collectionBridalNecklaces", title: "Bridal Necklaces", fallback: "/bridal necklace.jpeg" },
              { id: "collectionDiamondBracelets", title: "Diamond Bracelets", fallback: "/diamond bracelet.jpeg" },
              { id: "collectionStatementEarrings", title: "Statement Earrings", fallback: "/statement earrings.jpeg" },
              { id: "collectionSolitairePendants", title: "Solitaire Pendants", fallback: "/solitaire pendent.jpeg" }
            ].map(item => (
               <div key={item.id} className="border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden rounded-sm group relative">
                 <div className="relative h-40 w-full overflow-hidden">
                   <Image src={config[item.id] || item.fallback} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                 </div>
                 <div className="p-4">
                   <h4 className="text-white mb-2 uppercase tracking-wide text-[11px] font-semibold truncate">{item.title}</h4>
                   <div className="flex gap-4">
                     <label className="flex-1 text-[10px] text-center text-[#CCA43D] hover:text-black uppercase tracking-widest border border-[#CCA43D]/50 py-1.5 hover:bg-[#CCA43D] transition-colors font-semibold cursor-pointer">
                       {uploading === item.id ? "Wait..." : "Replace"}
                       <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, item.id)} disabled={!!uploading} />
                     </label>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
