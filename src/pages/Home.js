import { Fade } from "@material-ui/core";

const Home = () => {

    const title="CRUD-UI";

  return (
    <>
      <div className="home row m-0">
        <div className="col-lg-6 text-center text-lg-start">
        {title.split("").map((letter, index) => {
            return <Fade key={index} in={true} direction="right" timeout={(index + 1) * 1000}>
            <span className="title ms-2">{letter}</span>
          </Fade>
        })}
        <Fade in={true} direction="right" timeout={9000}>
          <h6 className="desc text-light ms-3">using <span className="desc-1 badge m-0"><a href="https://reactjs.org/" className="text-dark" target="_blank" rel="noreferrer">REACT</a></span></h6>
        </Fade>
        </div>
        <div className="col-lg-6 text-center">
        <Fade in={true} direction="right" timeout={9000}>
          <img src="/images/logo.svg" className="App-logo" alt="logo" />
        </Fade>
        </div>
      </div>
    </>
  );
};

export default Home;
