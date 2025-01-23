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
    <Card className="overflow-hidden bg-ivory border border-forest/20 hover:border-golden/40 transition-all">
      <Link href={`/nft/${nft.id}`} className="block">
        <CardHeader className="p-0">
          <Image
            src={nft.image || "/placeholder.svg"}
            alt={nft.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <Link href={`/nft/${nft.id}`}>
          <CardTitle className="text-xl font-prata mb-2 text-charcoal hover:text-vermilion transition-colors">
            {nft.name}
          </CardTitle>
        </Link>
        <span className="text-sm text-vermilion/80 block mb-2">
          By {nft.artist}
        </span>
        <p className="text-lg font-bold text-turquoise">{nft.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-vermilion hover:bg-vermilion/90 text-ivory font-medium text-lg">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
