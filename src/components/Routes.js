import { Route, Switch, Redirect } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Post from "../pages/Post";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/" component={Home} />
            <Route path="*" />
                <Redirect to="/">
            </Redirect>
        </Switch>
        </>
    )
}

export default Routes;