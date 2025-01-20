"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNFT() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Create NFT
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-card p-6 rounded-lg shadow"
        >
          <div className="mb-4">
            <Label htmlFor="name" className="text-primary">
              NFT Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-muted text-muted-foreground"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description" className="text-primary">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="bg-muted text-muted-foreground"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="price" className="text-primary">
              Price (ETH)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="bg-muted text-muted-foreground"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="image" className="text-primary">
              Upload Image
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
              required
              className="bg-muted text-muted-foreground"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Create NFT
          </Button>
        </form>
      </main>
    </div>
  );
}
