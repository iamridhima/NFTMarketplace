import { NFTCard } from "../components/NFTCard";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button"; // Adjust the path based on your project structure
import Link from "next/link";

export default function Home() {
  const nfts = [
    {
      id: 1,
      name: "Digital Thangka #1",
      artist: "Aarati Thapa",
      price: "0.5 ETH",
      image: "/images/mandala painting.jpg?height=300&width=300",
    },
    {
      id: 2,
      name: "Woven Dhaka Pattern",
      artist: "Aarati Thapa",
      price: "0.3 ETH",
      image: "/images/mandala painting.jpg?height=300&width=300",
    },
    {
      id: 3,
      name: "Nepali Mandala",
      artist: "Aarati Thapa",
      price: "0.7 ETH",
      image: "/images/mandala painting.jpg?height=300&width=300",
    },
    {
      id: 4,
      name: "Digital Pashmina",
      artist: "Aarati Thapa",
      price: "0.4 ETH",
      image: "/images/mandala painting.jpg?height=300&width=300",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section */}
      <section className="bg-turquoise py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-prata text-center mb-6 text-ivory">
            Discover Digital Nepali Handicrafts
          </h1>
          <p className="text-xl text-center text-ivory/90 mb-8 max-w-2xl mx-auto">
            Explore unique digital artworks inspired by Nepal's rich cultural
            heritage
          </p>
          <div className="flex justify-center">
            <Button className="bg-vermilion hover:bg-golden text-ivory px-8 py-3 text-lg font-medium transition-colors">
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Featured NFTs Section */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-prata text-center mb-12 text-charcoal">
          Featured Artworks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-prata text-xl mb-4">NFT Handicrafts</h3>
              <p className="text-ivory/80">
                Preserving Nepali culture through digital art
              </p>
            </div>
            <div>
              <h4 className="font-prata text-lg mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    All NFTs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    New
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-prata text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-prata text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-ivory/80 hover:text-golden">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
