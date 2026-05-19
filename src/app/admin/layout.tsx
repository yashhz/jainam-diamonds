"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Simple visual mock for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();

  // Show the Login Screen if unauthenticated
  if (!isAuthenticated) {
     const handleLogin = (e: React.FormEvent) => {
       e.preventDefault();
       if (email === "jainamsupreem@gmail.com" && password === "J@inam2803") {
         setError("");
         setIsAuthenticated(true);
       } else {
         setError("Invalid email or password");
       }
     };

     return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans selection:bg-[#CCA43D] selection:text-black">
         <div className="w-full max-w-md border border-[#1a1a1a] bg-[#0a0a0a] p-10 rounded-sm shadow-2xl relative overflow-hidden">
           {/* Decorative Top Accent */}
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#CCA43D] to-transparent"></div>
           
           <div className="text-center mb-8">
             <h2 className="text-[#CCA43D] tracking-[0.2em] font-serif uppercase text-2xl mb-3">Admin Login</h2>
             <p className="text-gray-500 text-sm font-light leading-relaxed">Enter your credentials to manage<br/>website configuration and media.</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-6">
             {error && (
               <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 text-xs text-center rounded-sm">
                 {error}
               </div>
             )}

             <div>
               <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Email Address</label>
               <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" placeholder="admin@jainamdiamonds.com" />
             </div>
             <div>
               <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Password</label>
               <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" placeholder="••••••••" />
             </div>
             <button type="submit" className="w-full bg-[#CCA43D] text-black px-8 py-3.5 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer mt-4">
               Sign In
             </button>
           </form>
         </div>
       </div>
     )
  }

  // Active Link Helper
  const isActive = (path: string) => pathname === path;

  // The Actual Dashboard Layout
  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-[#CCA43D] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1a1a1a] bg-[#0a0a0a] flex-col hidden md:flex">
        <div className="p-6 border-b border-[#1a1a1a]">
          <h2 className="text-[#CCA43D] tracking-[0.2em] font-serif uppercase text-lg">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`block px-4 py-3 rounded text-sm transition-colors ${isActive('/admin') ? 'bg-[#1a1a1a] text-[#CCA43D]' : 'text-gray-300 hover:bg-[#111] hover:text-white'}`}>
            Dashboard
          </Link>
          <Link href="/admin/settings" className={`block px-4 py-3 rounded text-sm transition-colors ${isActive('/admin/settings') ? 'bg-[#1a1a1a] text-[#CCA43D]' : 'text-gray-300 hover:bg-[#111] hover:text-white'}`}>
            Site Settings
          </Link>
          <Link href="/admin/media" className={`block px-4 py-3 rounded text-sm transition-colors ${isActive('/admin/media') ? 'bg-[#1a1a1a] text-[#CCA43D]' : 'text-gray-300 hover:bg-[#111] hover:text-white'}`}>
            Media Library
          </Link>
          <Link href="/admin/products" className={`block px-4 py-3 rounded text-sm transition-colors ${isActive('/admin/products') ? 'bg-[#1a1a1a] text-[#CCA43D]' : 'text-gray-300 hover:bg-[#111] hover:text-white'}`}>
            Products Catalog
          </Link>
        </nav>
        <div className="p-4 border-t border-[#1a1a1a]">
          <Link href="/" className="block px-4 py-2 text-xs text-gray-500 hover:text-white transition-colors">
            ← Back to Website
          </Link>
          <button onClick={() => setIsAuthenticated(false)} className="block w-full text-left px-4 py-2 mt-2 text-xs text-gray-500 hover:text-red-400 transition-colors uppercase tracking-wider">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-[#1a1a1a] flex justify-between items-center bg-[#0a0a0a]">
          <h2 className="text-[#CCA43D] tracking-[0.2em] font-serif uppercase text-lg">Admin</h2>
           <button onClick={() => setIsAuthenticated(false)} className="text-xs text-gray-500">Logout</button>
        </div>
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
