"use client";

import React, { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";

interface NewsletterFormProps {
  placeholder: string;
  buttonText: string;
}

export default function NewsletterForm({ placeholder, buttonText }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide animate-in fade-in zoom-in duration-300">
        <Check className="size-4" />
        <span>Subscribed Successfully!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full lg:w-auto gap-2 p-2 bg-white/5 border border-white/10 rounded-full focus-within:border-primary/50 transition-colors"
    >
      <div className="pl-4 text-muted-foreground">
        <Mail className="size-4" />
      </div>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        className="bg-transparent border-none outline-none text-white text-sm w-full lg:w-64 placeholder:text-white/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="size-3.5 animate-spin" />}
        {buttonText}
      </button>
    </form>
  );
}
