import React from "react";
import CallToActionWithIllustration from "./hero";
import WithSubnavigation from "./Navbar";
import SplitWithImage from "./Features";
import SmallWithNavigation from "../../components/Footer";

export default function HomePage() {
  return (
    <>
      <WithSubnavigation />
      <CallToActionWithIllustration />
      <SplitWithImage />
      <SmallWithNavigation />
    </>
  );
}
