import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface NFT {
  id: number
  name: string
  artist: string
  price: string
  image: string
}

interface NFTCardProps {
  nft: NFT
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="overflow-hidden bg-card">
      <CardHeader className="p-0">
        <Image src={nft.image || "/placeholder.svg"} alt={nft.name} width={300} height={300} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2 text-primary">{nft.name}</CardTitle>
        <Link href="/profile/1" className="text-sm text-muted-foreground mb-2 hover:text-accent">
          By {nft.artist}
        </Link>
        <p className="text-md font-bold text-accent">{nft.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">Buy Now</Button>
      </CardFooter>
    </Card>
  )
}

