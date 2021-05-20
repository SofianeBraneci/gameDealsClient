import axios from "axios";
import React, { Component } from "react";
import DealComment from "./Comment";
import ShopNav from "./ShopNav";

export default class DealView extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    console.log(match);
    this.state = {
      dealId: this.props.match.params.dealId,
      cheapestPrice: "",
      name: "",
      retailPrice: "",
      salePrice: "",
      thumb: "",
      commentText: "",
      gameId: this.props.gameId,
      comments: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log(this.state.dealId);
    let gameId = "";
    axios
      .get("http://localhost:8081/GameDeal/deals", {
        params: { id: this.state.dealId },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        const cheapestPrice = data.game.cheapestPrice.price;
        const {
          name,
          retailPrice,
          salePrice,
          thumb,
          gameID,
        } = data.game.gameInfo;
        console.log(gameId);
        this.setState({
          name: name,
          retailPrice: retailPrice,
          salePrice: salePrice,
          thumb: thumb,
          cheapestPrice: cheapestPrice,
          gameId: gameID,
        });
      })
      .then(() => {
        axios
          .get("http://localhost:8081/GameDeal/comments", {
            params: { gameId: this.state.gameId },
            withCredentials: true,
          })
          .then((response) => {
            this.setState({ comments: response.data.comments });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCommentChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  addComment = (e) => {
    const comments = [...this.state.comments];
    console.log(comments.length);
    comments.push({
      user: "sofiane",
      // date: new Date().toLocaleDateString(),
      comment: this.state.commentText,
    });

    axios.defaults.withCredentials = true;

    axios
      .post(
        "http://localhost:8081/GameDeal/comments",
        {},
        {
          params: {
            gameId: this.state.gameId,
            userId: localStorage.getItem("userId"),
            comment: this.state.commentText,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ comments: response.data.comments });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="">
        <ShopNav
          history={this.props.history}
          username={localStorage.getItem("username")}
        ></ShopNav>
        <div className=" space">
          <div className="container">
            <div className="row ">
              <div className="col-md-6 text-center">
                <img src={this.state.thumb} alt="" srcset="" />
              </div>
              <div className="col-md-6 ">
                <h6>{this.state.name}</h6>
                <p>Cheapest Price: {this.state.cheapsestPrice}</p>
                <p>Sale Price :{this.state.salePrice}</p>
                <p>Retail Price: {this.state.retailPrice}</p>
              </div>
            </div>
            <div className="row space align-items-center">
              <h3>Comments</h3>

              <div className="col-md-6 form-group">
                <textarea
                  className="form-control"
                  id=""
                  cols="30"
                  rows="1"
                  onChange={this.handleCommentChange}
                ></textarea>
              </div>
              <div className="col-md-3">
                <button className="btn btn-warning" onClick={this.addComment}>
                  Add comment
                </button>
              </div>
            </div>
            <div className="row space mb-5">
              {this.state.comments.map((comment) => (
                <DealComment
                  key={comment.id}
                  author={comment.user}
                  text={comment.comment}
                  date={comment.date}
                ></DealComment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
