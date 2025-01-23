import { Header } from "@/components/Header";
import { NFTCard } from "@/components/NFTCard";

export default function Marketplace() {
  const nfts = [
    {
      id: 1,
      name: "Digital Thangka #1",
      artist: "Aarati Thapa",
      price: "0.5 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Woven Dhaka Pattern",
      artist: "Aarati Thapa",
      price: "0.3 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Nepali Mandala",
      artist: "Aarati Thapa",
      price: "0.7 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Woven Dhaka",
      artist: "Aarati Thapa",
      price: "0.4 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Embroidered Mandala",
      artist: "Eva Threads",
      price: "0.6 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Sculpted Stupa",
      artist: "Frank Forms",
      price: "0.8 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nepali-blue/5 to-nepali-red/5">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NUnoIZ9ZStjcwHHPS9vgsr9klTreHK.png)",
        }}
      />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-nepali-blue">
            NFT Handicraft Marketplace
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
