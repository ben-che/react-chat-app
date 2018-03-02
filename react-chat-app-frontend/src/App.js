import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Home from "./Home.js";
import ChatRoom from "./ChatRoom.js";

class App extends React.Component
{
    render()
    {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/chatroom" component={ChatRoom} />
                    <Route path="*" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);