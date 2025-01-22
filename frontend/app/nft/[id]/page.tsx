"use client";

import { Header } from "@/components/Header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface OwnershipRecord {
  owner: string;
  date: string;
  price: string;
  transactionType: "mint" | "transfer" | "sale";
}

// This would come from your backend in a real application
const nftData = {
  id: 1,
  name: "Digital Thangka #1",
  artist: "Aarati Thapa",
  description:
    "A digital representation of traditional Thangka art, blending centuries-old techniques with modern digital craftsmanship.",
  price: "0.5 ETH",
  image: "/images/nepali thanka.jpg",
  ownershipHistory: [
    {
      owner: "Aarati Thapa",
      date: "2024-01-15",
      price: "0 ETH",
      transactionType: "mint",
    },
    {
      owner: "Ram Krishna",
      date: "2024-01-20",
      price: "0.3 ETH",
      transactionType: "sale",
    },
    {
      owner: "Sita Sharma",
      date: "2024-02-01",
      price: "0.4 ETH",
      transactionType: "sale",
    },
    {
      owner: "Current Owner",
      date: "2024-02-15",
      price: "0.5 ETH",
      transactionType: "sale",
    },
  ] as OwnershipRecord[],
};

export default function NFTDetail({ params }: { params: { id: string } }) {
  const [activeRecord, setActiveRecord] = useState<OwnershipRecord | null>(
    null
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* NFT Image and Details */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <Image
                  src={nftData.image || "/placeholder.svg"}
                  alt={nftData.name}
                  width={500}
                  height={500}
                  className="w-full rounded-lg"
                />
                <h1 className="text-3xl font-bold mt-6 text-nepali-blue">
                  {nftData.name}
                </h1>
                <p className="text-lg text-nepali-red mt-2">
                  By {nftData.artist}
                </p>
                <p className="mt-4 text-gray-700">{nftData.description}</p>
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Current Price</p>
                    <p className="text-2xl font-bold text-nepali-blue">
                      {nftData.price}
                    </p>
                  </div>
                  <Button className="bg-nepali-red hover:bg-nepali-red/90 text-white px-8 py-6 text-lg">
                    Purchase NFT
                  </Button>
                </div>
              </Card>
            </div>

            {/* Ownership History */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-nepali-blue">
                Ownership History
              </h2>
              <div className="relative">
                {/* Decorative Mandala Background */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=600&width=600')", // Replace with actual mandala image
                  }}
                />

                {/* Timeline */}
                <div className="relative space-y-6">
                  {nftData.ownershipHistory.map((record, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8"
                      onMouseEnter={() => setActiveRecord(record)}
                      onMouseLeave={() => setActiveRecord(null)}
                    >
                      {/* Timeline line */}
                      {index !== nftData.ownershipHistory.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-nepali-gold/30" />
                      )}

                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 w-6 h-6">
                        <div className="w-6 h-6 rounded-full border-2 border-nepali-gold bg-white" />
                        <div className="absolute inset-1 rounded-full bg-nepali-gold/20" />
                      </div>

                      {/* Content */}
                      <Card
                        className={`p-4 transition-all duration-300 ${
                          activeRecord === record
                            ? "bg-white shadow-lg transform -translate-y-1"
                            : "bg-white/80"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-nepali-blue">
                              {record.owner}
                            </p>
                            <p className="text-sm text-gray-600">
                              {record.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-nepali-red">
                              {record.price}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">
                              {record.transactionType}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
