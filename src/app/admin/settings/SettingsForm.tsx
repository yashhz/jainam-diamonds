"use client";
import React, { useState } from "react";
import { updateConfig } from "../../actions";

export default function SettingsForm({ initialConfig }: { initialConfig: any }) {
  const [config, setConfig] = useState(initialConfig || {});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const result = await updateConfig(config);
    if (result.success) {
      alert("Settings saved permanently!");
    } else {
      alert("Error saving settings: " + result.error);
    }
    setSaving(false);
  };

  const handleChange = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="animate-fade-in pb-20">
      <h1 className="text-3xl font-serif mb-2">Site Settings</h1>
      <p className="text-gray-400 font-light mb-10 text-sm tracking-wide">
        Update contact Information and social media links.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 rounded-sm">
          <h3 className="text-[#CCA43D] mb-6 text-sm tracking-widest uppercase">Contact Variables</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input type="text" value={config.contactEmail || ""} onChange={e => handleChange("contactEmail", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
              <input type="text" value={config.contactPhone || ""} onChange={e => handleChange("contactPhone", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Physical Address</label>
              <textarea value={config.contactAddress || ""} onChange={e => handleChange("contactAddress", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors h-28 resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 rounded-sm">
          <h3 className="text-[#CCA43D] mb-6 text-sm tracking-widest uppercase">Legal Pages</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Privacy Policy</label>
              <textarea value={config.privacyPolicy || ""} onChange={e => handleChange("privacyPolicy", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors h-48 resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Terms of Service</label>
              <textarea value={config.termsOfService || ""} onChange={e => handleChange("termsOfService", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors h-48 resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 rounded-sm">
          <h3 className="text-[#CCA43D] mb-6 text-sm tracking-widest uppercase">Social Media Configuration</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Instagram Profile URL</label>
              <input type="text" value={config.socialInstagram || ""} onChange={e => handleChange("socialInstagram", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Facebook Profile URL</label>
              <input type="text" value={config.socialFacebook || ""} onChange={e => handleChange("socialFacebook", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">LinkedIn Profile URL</label>
              <input type="text" value={config.socialLinkedIn || ""} onChange={e => handleChange("socialLinkedIn", e.target.value)} className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#CCA43D] transition-colors" />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button type="submit" disabled={saving} className="bg-[#CCA43D] text-black px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
