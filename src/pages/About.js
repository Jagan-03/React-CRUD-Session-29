import React from "react";

import { Slide } from "@material-ui/core";

const About = () => {

  
  return (
    <div className="about row m-0">
      <div className="overflow-hidden">
        <Slide in={true} easing={{enter: "easing.easeOut"}} direction="up" timeout={500}>
          <h1 className="name">- Hello I'm</h1>
        </Slide>
        <Slide in={true} easing={{enter: "easing.easeOut"}} direction="up" timeout={700}>
          <h1 className="name mb-5">Jaganath Ezhilarasu</h1>
        </Slide>
        <Slide in={true} easing={{enter: "easing.easeOut"}} direction="up" timeout={1000}>
            <h6 className="info text-white">A web developer, who makes fullstack web applications using React.</h6>
        </Slide>
      </div>
    </div>
  );
};

export default About;
