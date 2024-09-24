"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Actions from "./actions";
import PrintPhoto from "../PrintPhoto";
import { DraggingInfo, DropTargetPosition, PrintPageProps } from "@/types/all";
import { Header, PageLayout, PrintWrapper, Wrapper } from "./layers";
import Title from "../Title";

const PrintPage: React.FC<PrintPageProps> = ({ sections }) => {
  const [photoSections, setPhotoSections] = useState(sections);
  const [draggingInfo, setDraggingInfo] = useState<DraggingInfo>(null);
  const [hiddenImage, setHiddenImage] = useState<string | null>();
  const [draggedImageSrc, setDraggedImageSrc] = useState<string | undefined>();
  const previewRef = useRef<HTMLImageElement | any | null>(null);
  const [dropTargetPosition, setDropTargetPosition] =
    useState<DropTargetPosition>(null);

  const handleDragStart = (
    event: any,
    sectionIndex: number,
    imageIndex: number,
    imageSrc: string
  ) => {
    setDraggingInfo({ sectionIndex, imageIndex });
    setDraggedImageSrc(imageSrc);

    event?.dataTransfer?.setDragImage(previewRef.current, 10, 10);
    setDropTargetPosition({
      opacity: 1,
      width: 100,
      height: 100,
      clipPath: "circle(140px at center)",
      top: previewRef?.current?.clientY,
      left: previewRef.current?.clientX,
    });
  };

  const handleDrop = (
    targetSectionIndex: number,
    targetImageIndex: number,
    targetRef: any
  ) => {
    if (draggingInfo && targetRef.target) {
      const newPhotoSections = [...photoSections];
      const {
        sectionIndex: draggingSectionIndex,
        imageIndex: draggingImageIndex,
      } = draggingInfo;

      const targetPosition = targetRef.target.getBoundingClientRect(); // Get the target position for animation

      const draggingImageSource =
        newPhotoSections[draggingSectionIndex].images[draggingImageIndex];
      const targetImageSource =
        newPhotoSections[targetSectionIndex].images[targetImageIndex];
      setDropTargetPosition({
        width: targetPosition.width,
        height: targetPosition.height,

        top: targetPosition.top + targetPosition.height / 2,
        left: targetPosition.left + targetPosition.width / 2,
      });
      setHiddenImage(targetImageSource);
      setTimeout(() => {
        setDropTargetPosition({
          width: 100,
          height: 100,
          opacity: 0,
          clipPath: `none`,
        });
        setDraggingInfo(null);
        setDraggedImageSrc(undefined);
        setHiddenImage(null);
        if (
          draggingSectionIndex !== targetSectionIndex ||
          draggingImageIndex !== targetImageIndex
        ) {
          newPhotoSections[draggingSectionIndex].images[draggingImageIndex] =
            targetImageSource;
          newPhotoSections[targetSectionIndex].images[targetImageIndex] =
            draggingImageSource;
        }
        setPhotoSections(newPhotoSections);
      }, 500); // Wait for the transition to complete
    }
  };

  const dropTargetStyle = dropTargetPosition
    ? {
        width: dropTargetPosition.width,
        height: dropTargetPosition.height,
        top: dropTargetPosition.top,
        left: dropTargetPosition.left,
        opacity: dropTargetPosition.opacity,
        clipPath: dropTargetPosition.clipPath,
      }
    : {};
  const draggedImage = (
    <img
      className={`image-preview ${dropTargetPosition ? "expand" : ""}`}
      ref={previewRef}
      src={draggedImageSrc}
      style={dropTargetStyle}
    />
  );

  return (
    <Wrapper className="container">
      <div className="image-gallery">
        {photoSections.map((section, sectionIndex) => (
          <PrintWrapper key={section.title}>
            <Header>
              <Title>{section.title}</Title>
              <Actions data={sections} />
            </Header>
            <PageLayout className="mx-auto p-6 grid grid-cols-2 gap-4">
              {section.images.map((image, imageIndex) => (
                <PrintPhoto
                  key={image}
                  image={image}
                  hiddenImage={hiddenImage}
                  sectionIndex={sectionIndex}
                  imageIndex={imageIndex}
                  isDragging={
                    draggingInfo?.sectionIndex === sectionIndex &&
                    draggingInfo?.imageIndex === imageIndex
                  }
                  onDragStart={(e) =>
                    handleDragStart(e, sectionIndex, imageIndex, image)
                  }
                  onDrop={(ref) => handleDrop(sectionIndex, imageIndex, ref)}
                />
              ))}
            </PageLayout>
          </PrintWrapper>
        ))}

        {draggedImage}
      </div>
    </Wrapper>
  );
};

export default PrintPage;
