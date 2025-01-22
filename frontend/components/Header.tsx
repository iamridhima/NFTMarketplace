import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="relative shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-60"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IntozLuNCM0Ksld5hzQ5Q5cAffSb7q.png)",
        }}
      />
      <div className="absolute inset-0 bg-nepali-blue/70 z-1" />
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <Link
          href="/"
          className="text-2xl font-bold text-nepali-gold hover:text-nepali-gold/90 transition-colors"
        >
          NFT Handicrafts
        </Link>
        <div className="space-x-6">
          <Link
            href="/marketplace"
            className="text-primary-foreground hover:text-nepali-gold transition-colors text-lg"
          >
            Marketplace
          </Link>
          <Link
            href="/create"
            className="text-primary-foreground hover:text-nepali-gold transition-colors text-lg"
          >
            Create NFT
          </Link>
          <Link
            href="/profile/1"
            className="text-primary-foreground hover:text-nepali-gold transition-colors text-lg"
          >
            Artist Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
