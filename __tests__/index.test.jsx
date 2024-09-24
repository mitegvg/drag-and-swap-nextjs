import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrintPage from "../components/PrintPage";

const mockSections = [
  {
    title: "Front Print",
    images: [
      "https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
    ],
  },
  {
    title: "Page 2",
    images: [
      "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
      "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
    ],
  },
  {
    title: "Page 3",
    images: [
      "https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
      "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
    ],
  },
];

describe("PrintPage", () => {
  // Use fake timers to control setTimeout in the component
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders all the sections and images", () => {
    render(<PrintPage sections={mockSections} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(5 + 1); // 5 images in mockSections + 1 for the preview
  });

  it("allows a user to drag and swap images between sections", () => {
    const { container } = render(<PrintPage sections={mockSections} />);

    const image1 = container.querySelector(
      'img[src="https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080"]'
    );
    const image2 = container.querySelectorAll("img")[1]; // Select another image to drop on

    // Simulate dragStart and drop events
    fireEvent.dragStart(image1);
    fireEvent.dragEnter(image2);
    fireEvent.drop(image2);

    // Advance timers by 500ms to simulate the setTimeout inside the component
    jest.advanceTimersByTime(500);

    // Re-fetch the updated images
    const updatedImages = screen.getAllByRole("img");
    expect(updatedImages[0]).toHaveAttribute(
      "src",
      "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080"
    );
  });

  it("shows dragging preview and cursor when dragging a photo", () => {
    const { container } = render(<PrintPage sections={mockSections} />);
    const image1 = container.querySelector(
      'img[src="https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080"]'
    );

    // Simulate dragging the image
    fireEvent.dragStart(image1);

    // Expect the parent of the image to have the 'dragging' class during the drag
    expect(image1.closest(".photo-item")).toHaveClass("dragging");
  });
});
