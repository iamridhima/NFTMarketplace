import { Header } from "@/components/Header";
import { NFTCard } from "@/components/NFTCard";

export default function Marketplace() {
  const nfts = [
    {
      id: 1,
      name: "Handcrafted Vase",
      artist: "Alice Crafts",
      price: "0.5 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Digital Thangka",
      artist: "Bob Stitches",
      price: "0.3 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Pixel Pottery",
      artist: "Charlie Clay",
      price: "0.7 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Woven Dhaka",
      artist: "Diana Weaves",
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
    <div className="min-h-screen bg-primary-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          NFT Handicraft Marketplace
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </main>
    </div>
  );
}
