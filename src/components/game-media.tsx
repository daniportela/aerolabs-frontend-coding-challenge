import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

type Media = GameDetails["screenshots"]

export default function GameMediaCarousel({ media }: { media: Media }) {
  return (
    <Carousel className="w-full mt-2 mx-auto">
      <CarouselContent className="-ml-1">
        {media?.map((item) => (
          <CarouselItem key={item.id} className="pl-1 basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    src={`https:${item.url}`}
                    fill
                    sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px"
                    alt="Media gallery"
                    className="rounded-md"
                />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-gray-200" />
      <CarouselNext className="bg-gray-200" />
    </Carousel>
  )
}
