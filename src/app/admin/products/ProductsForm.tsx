"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProducts, uploadImage } from "../../actions";

export default function ProductsForm({ initialProducts }: { initialProducts: any }) {
  const [products, setProducts] = useState(initialProducts || {});
  const [selectedCollection, setSelectedCollection] = useState<string>("eternity-rings");
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fallback if products object is completely empty
  if (Object.keys(products).length === 0) {
    return <div className="text-white">Product database not initialized.</div>;
  }

  const collections = Object.keys(products).map(k => ({ id: k, title: products[k]?.title }));

  const handleSave = async () => {
    setIsSaving(true);
    await updateProducts(products);
    setIsSaving(false);
    alert("Catalogs saved successfully to Database!");
  };

  const handleEdit = (prod: any) => {
    setEditingProduct({ ...prod });
  };

  const handleAdd = () => {
    setEditingProduct({ id: `p_${Date.now()}`, name: "", image: "", details: "" });
  };

  const handleDelete = (id: string) => {
    if(!confirm("Are you sure you want to completely remove this piece?")) return;
    const updatedCol = { ...products[selectedCollection] };
    updatedCol.products = updatedCol.products.filter((p: any) => p.id !== id);
    setProducts({ ...products, [selectedCollection]: updatedCol });
  };

  const saveProductEdit = () => {
    if(!editingProduct.name || !editingProduct.image) {
       alert("Name and Image are completely required to display properly!");
       return;
    }
    const updatedCol = { ...products[selectedCollection] };
    const existingIndex = updatedCol.products.findIndex((p: any) => p.id === editingProduct.id);
    if (existingIndex >= 0) {
      updatedCol.products[existingIndex] = editingProduct;
    } else {
      updatedCol.products.push(editingProduct);
    }
    setProducts({ ...products, [selectedCollection]: updatedCol });
    setEditingProduct(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    
    const result = await uploadImage(formData);
    if (result.success) {
      setEditingProduct({ ...editingProduct, image: result.url });
    } else {
      alert("Upload heavily failed. Please try again.");
    }
    setUploadingImage(false);
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Masterpiece Catalog</h1>
          <p className="text-gray-400 text-sm">Manage entire collections, descriptions, and high-resolution visuals.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#CCA43D] hover:bg-[#b08d34] text-black px-8 py-3 rounded-sm font-semibold tracking-wide transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving Database..." : "Publish Universal Changes"}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Collections Sidebar */}
        <div className="w-1/4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 rounded-sm flex flex-col gap-2">
            <h3 className="text-[#CCA43D] text-xs uppercase tracking-widest px-4 py-2 mb-2 font-semibold border-b border-[#1a1a1a]">Collections</h3>
            {collections.map(col => (
               <button
                 key={col.id}
                 onClick={() => setSelectedCollection(col.id)}
                 className={`text-left px-4 py-3 text-sm transition-colors rounded-sm ${selectedCollection === col.id ? 'bg-[#1a1a1a] text-white border-l-2 border-[#CCA43D]' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
               >
                 {col.title}
               </button>
            ))}
          </div>
        </div>

        {/* Selected Collection Products Panel / Editor */}
        <div className="w-3/4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 rounded-sm min-h-[500px]">
            {editingProduct ? (
              <div className="animate-fade-in border border-[#1a1a1a] p-6 bg-[#050505] rounded-sm relative">
                 <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                 <h2 className="text-xl font-serif text-[#CCA43D] mb-6">{editingProduct.id.startsWith('p_') ? "Add New Piece" : "Edit Piece Masterpiece"}</h2>
                 
                 <div className="flex gap-8 mb-6">
                    <div className="w-1/3">
                      <div className="relative aspect-[4/5] bg-[#111] border border-[#222] flex items-center justify-center overflow-hidden mb-4">
                        {editingProduct.image ? (
                           <Image src={editingProduct.image} alt="Preview" fill className="object-cover" />
                        ) : (
                           <span className="text-gray-600 text-xs text-center px-4 tracking-wider">NO IMAGE ASSIGNED</span>
                        )}
                        {uploadingImage && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><span className="text-[#CCA43D] animate-pulse">Uploading...</span></div>}
                      </div>

                      <div className="relative overflow-hidden inline-block w-full">
                        <button className="w-full bg-[#1a1a1a] border border-[#333] hover:border-[#CCA43D] text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors disabled:opacity-50">
                          {uploadingImage ? "Uploading..." : "Upload High-Res"}
                        </button>
                        <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploadingImage} className="absolute left-0 top-0 opacity-0 cursor-pointer h-full w-full" />
                      </div>
                    </div>

                    <div className="w-2/3 space-y-4 flex flex-col">
                       <div>
                         <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Product Name</label>
                         <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" placeholder="e.g. Classic Round Eternity Band" />
                       </div>
                       <div className="flex-1">
                         <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Masterpiece Details / Description</label>
                         <textarea value={editingProduct.details} onChange={e => setEditingProduct({...editingProduct, details: e.target.value})} className="w-full h-full min-h-[160px] bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors resize-none" placeholder="Provide intrinsic details..."></textarea>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex justify-end pt-4 border-t border-[#1a1a1a]">
                    <button onClick={saveProductEdit} className="bg-[#CCA43D] hover:bg-[#b08d34] text-black px-8 py-3 rounded-sm text-sm font-semibold tracking-wide transition-colors">
                      Done Editing
                    </button>
                 </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a] pb-6">
                   <h2 className="text-2xl font-serif text-white">{products[selectedCollection]?.title} <span className="text-[#CCA43D] text-sm font-sans ml-4">({products[selectedCollection].products.length} Items)</span></h2>
                   <button onClick={handleAdd} className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-sm text-sm font-semibold tracking-widest uppercase transition-colors">
                     + Add Piece
                   </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                   {products[selectedCollection]?.products.map((prod: any) => (
                      <div key={prod.id} className="group border border-[#1a1a1a] bg-[#050505] relative flex flex-col">
                         <div className="relative aspect-square overflow-hidden bg-[#111] border-b border-[#1a1a1a]">
                            <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/80 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => handleEdit(prod)} className="border border-[#CCA43D] text-[#CCA43D] hover:bg-[#CCA43D] hover:text-black hover:font-bold px-6 py-2 uppercase tracking-widest text-[10px] transition-colors w-32">
                                 Edit Piece
                               </button>
                               <button onClick={() => handleDelete(prod.id)} className="border border-red-900/50 text-red-500 hover:bg-red-900 hover:text-white px-6 py-2 uppercase tracking-widest text-[10px] transition-colors w-32">
                                 Remove
                               </button>
                            </div>
                         </div>
                         <div className="p-4 flex-1 flex flex-col justify-center">
                            <h3 className="text-white text-xs font-semibold leading-relaxed line-clamp-2" title={prod.name}>{prod.name}</h3>
                         </div>
                      </div>
                   ))}
                   {products[selectedCollection]?.products.length === 0 && (
                      <div className="col-span-full py-12 text-center border border-dashed border-[#333]">
                         <p className="text-gray-500 text-sm tracking-widest uppercase">This collection is currently completely empty</p>
                      </div>
                   )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
