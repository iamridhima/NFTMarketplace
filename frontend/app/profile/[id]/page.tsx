import { Header } from "@/components/Header";
import { NFTCard } from "@/components/NFTCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// This would typically come from an API or database
const artistData = {
  id: "1",
  name: "Aarati Thapa",
  bio: "Passionate Nepali artist specializing in digital Thangka paintings and traditional handicraft NFTs.",
  avatar: "/placeholder.svg?height=100&width=100",
  coverImage: "/placeholder.svg?height=400&width=1200",
  nfts: [
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
      name: "Digital Pashmina",
      artist: "Aarati Thapa",
      price: "0.4 ETH",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
};

export default function ArtistProfile({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the artist data based on the id
  const artist = artistData;

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Header />
      <main>
        <div className="relative h-64 bg-accent">
          <img
            src={artist.coverImage || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8">
            <Avatar className="w-32 h-32 border-4 border-primary-foreground">
              <AvatarImage src={artist.avatar} alt={artist.name} />
              <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold text-primary">{artist.name}</h1>
              <p className="text-muted-foreground mt-2">{artist.bio}</p>
            </div>
            <Button className="mt-4 md:mt-0 md:ml-auto bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Follow Artist
            </Button>
          </div>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Artist's NFTs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artist.nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
