export interface IGalleryItem {
  id: string
  src?: string
  text: string
  params: string
}

export interface IGallery {
  items: Record<string, IGalleryItem>
  list: string[]
}
