import React from "react";
import { PrintPhotoWrapper } from "./layers";
import { PrintPhotoProps } from "@/types/all";

const PrintPhoto: React.FC<PrintPhotoProps> = ({
  image,
  hiddenImage,
  isDragging,
  onDragStart,
  onDragEnter,
  onDrop,
}) => {
  return (
    <PrintPhotoWrapper
      className={`photo-item col-span-1 flex flex-col ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()} // Allow dropping by preventing the default behavior
      onDrop={onDrop}
    >
      {hiddenImage && isDragging && (
        <img src={hiddenImage} className="hidden-image" alt="Hidden image" />
      )}
      <img
        src={image}
        alt="Dragged"
        className={hiddenImage && isDragging ? "hidden-image" : undefined}
      />
    </PrintPhotoWrapper>
  );
};

export default PrintPhoto;
