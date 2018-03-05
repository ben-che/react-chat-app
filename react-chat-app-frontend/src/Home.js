import React from "react";
import axios from "axios";

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        this.addUserHandler = this.addUserHandler.bind(this);
    }

    componentWillMount()
    {
        if (localStorage.getItem("jwt"))
        {
            axios.post("http://localhost:8080/hasvalidtoken", {
                jwt: localStorage.getItem("jwt")
            })
            .then((result) =>
            {
                this.props.history.push("/chatroom");
            })
            .catch((error) =>
            {
                return;
            });
        }
    }

    addUserHandler(event)
    {
        event.preventDefault();

        if (event.target.username.value && typeof event.target.username.value === "string" && event.target.username.value.trim() && event.target.username.value.length <= 15)
        {
            axios.post("http://localhost:8080/adduser", {
                username: event.target.username.value
            })
            .then((result) =>
            {
                localStorage.setItem("jwt", result.data.jwt);
                this.props.history.push("/chatroom");
            })
            .catch((error) =>
            {
                console.log(error);
            });
        }

        event.target.username.value = "";
    }

    render()
    {
        return (
            <div className="Home">
                <div className="jumbotron jumbotron-fluid bg-dark text-light text-center">
                    <h2>React Chat App</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={this.addUserHandler}>
                                <div className="input-group">
                                    <input className="form-control" name="username" type="text" placeholder="Specify a name to join. (1 - 15 characters)" />
                                    <div className="input-group-append">
                                        <button className="btn bg-dark text-light">Join</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;