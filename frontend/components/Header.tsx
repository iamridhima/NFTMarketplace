import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-primary shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary-foreground">
          NFT Handicrafts
        </Link>
        <div className="space-x-4">
          <Link href="/marketplace" className="text-primary-foreground hover:text-secondary">
            Marketplace
          </Link>
          <Link href="/create" className="text-primary-foreground hover:text-secondary">
            Create NFT
          </Link>
          <Link href="/profile/1" className="text-primary-foreground hover:text-secondary">
            Artist Profile
          </Link>
        </div>
      </nav>
    </header>
  )
}

