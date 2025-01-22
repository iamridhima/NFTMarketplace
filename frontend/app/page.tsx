import { NFTCard } from "../components/NFTCard";
import { Header } from "../components/Header";

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
    <div className="min-h-screen bg-primary-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          NFT Handicraft Marketplace
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </main>
    </div>
  );
}
