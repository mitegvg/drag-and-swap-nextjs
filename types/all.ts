// Define Photo section type
export type PhotoSection = {
  title: string;
  images: string[];
};

export type PrintPageProps = {
  sections: PhotoSection[];
};

export type PrintPhotoProps = {
  image: string;
  hiddenImage: string | undefined | null;
  sectionIndex: number;
  imageIndex: number;
  isDragging: boolean;
  onDragStart: (e: any) => void;
  onDragEnter?: () => void;
  onDrop: (ref: any) => void;
};

// Define types for dragging and drop positions
export type DraggingInfo = {
  sectionIndex: number;
  imageIndex: number;
} | null;

export type DropTargetPosition = {
  width: number;
  height: number;
  top?: number;
  left?: number;
  clipPath?: string;
  opacity?: number;
} | null;
