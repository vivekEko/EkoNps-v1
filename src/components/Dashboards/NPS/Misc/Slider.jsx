import React from "react";
import { RangeSlider } from "rsuite";

const Slider = () => {
  return (
    <div>
      <RangeSlider defaultValue={[10, 50]} />
    </div>
  );
};

export default Slider;
