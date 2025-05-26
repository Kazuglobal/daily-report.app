import Image from "next/image"

interface ClassPhotoProps {
  className?: string
}

export function ClassPhotos({ className }: ClassPhotoProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">11回生友会の写真</h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/class-11-reunion.png"
            alt="11回生友会の集合写真"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <p className="text-center text-gray-600">11回生友会の皆様の集合写真です。</p>
      </div>
    </div>
  )
}
