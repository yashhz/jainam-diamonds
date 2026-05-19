import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-serif mb-2">Welcome to your Dashboard</h1>
      <p className="text-gray-400 font-light mb-10 text-sm tracking-wide">
        Manage your website's content, media, and site settings directly from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm hover:border-[#CCA43D]/30 transition-colors">
          <h3 className="text-lg text-white mb-2">General Settings</h3>
          <p className="text-xs text-gray-500 mb-4">Update your contact info, social links, and SEO tags.</p>
          <Link href="/admin/settings" className="text-[#CCA43D] text-sm hover:text-white transition-colors">Manage Settings →</Link>
        </div>

        <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm hover:border-[#CCA43D]/30 transition-colors">
          <h3 className="text-lg text-white mb-2">Media Library</h3>
          <p className="text-xs text-gray-500 mb-4">Upload and replace homepage background images.</p>
          <Link href="/admin/media" className="text-[#CCA43D] text-sm hover:text-white transition-colors">Manage Media →</Link>
        </div>
        
        <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm hover:border-[#CCA43D]/30 transition-colors opacity-50">
          <h3 className="text-lg text-white mb-2">Products</h3>
          <p className="text-xs text-gray-500 mb-4">Add or remove diamond and jewelry listings.</p>
          <span className="text-gray-600 text-sm">Coming Soon</span>
        </div>
      </div>

      <div className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm overflow-hidden">
        <div className="p-6 border-b border-[#1a1a1a]">
          <h3 className="text-white">Recent Activity</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm font-light text-center py-10">
            No recent changes. Everything is running smoothly.
          </p>
        </div>
      </div>
    </div>
  );
}
