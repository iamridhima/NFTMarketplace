import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NFT {
  id: number;
  name: string;
  artist: string;
  price: string;
  image: string;
}

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border border-nepali-gold/20 hover:border-nepali-gold/40 transition-all">
      <CardHeader className="p-0">
        <Image
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/nft/${nft.id}`} className="block">
          <CardTitle className="text-xl font-semibold mb-2 text-nepali-blue hover:underline">
            {nft.name}
          </CardTitle>
        </Link>
        <Link
          href="/profile/1"
          className="text-sm text-nepali-red/80 hover:text-nepali-red transition-colors block mb-2"
        >
          By {nft.artist}
        </Link>
        <p className="text-lg font-bold text-nepali-blue">{nft.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-nepali-red hover:bg-nepali-red/90 text-white font-medium text-lg">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
