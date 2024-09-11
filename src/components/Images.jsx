import { frontendUrl } from "@/utils/variables"
import Image from "next/image"



export default function Images({imageurl, styles, quality, width, height, alt, classes, placeholder}) {

    const blurUrl_ = 'data:image/webp;base64,UklGRrYCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggyAAAAJAMAJ0BKokAiQA+7XCvUym/pCKk0VwL8B2JZ27hdK5gJJNB9AGB7UlJjkPwO2292O+xiDjoqcbkCbj32bDYYzY1SDwaacEZvbI3VmoscZ4HZ/yhoUEuOEuvcSJeG2GRs2E/36oH9f5dPQscQQAA/v6NBv9etLc3Yz/4hqfYBpJrHp08e/8NNeRTotwEzHFGRCM+jdZuK9u+bOquo33u5N/wE0TQ90RBrHHcTiteLaCqMgnhQ2bnqhdYv/knzhg5ANTi8ma8gAAA'
    
  return (
    <>
    {
     <Image 
    width={width}
    height={height}
    quality={quality}
    placeholder={placeholder == true ? 'blur' : 'empty'}
    blurDataURL={blurUrl_}
    src={imageurl == null ? frontendUrl + 'images/plcaeholder-ni-image.webp' : imageurl}
    className={classes}
    alt={alt}
    title={alt}
    />}
   
    </>
  )
}


