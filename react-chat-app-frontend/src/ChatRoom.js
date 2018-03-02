import React from "react";
import axios from "axios";

class ChatRoom extends React.Component
{
    componentDidMount()
    {
        if (localStorage.getItem("jwt"))
        {
            axios.post("http://localhost:8080/hastoken", {
                jwt: localStorage.getItem("jwt")
            })
            .then((result) =>
            {

            })
            .catch((error) =>
            {
                this.props.history.push("/");
            });
        }
        else
        {
            this.props.history.push("/");
        }
    }

    render()
    {
        return (
            <div className="ChatRoom">
                <h1 className="text-center">CHAT ROOM</h1>
            </div>
        );
    }
}

export default ChatRoom;