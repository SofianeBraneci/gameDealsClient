import axios from "axios";
import React, { Component, isValidElement } from "react";
import Deal from "./Deal";
import ShopNav from "./ShopNav";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { deals: [], search: "", sortby: "Deal Rating" };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:8081/GameDeal/deals",
        {},
        {
          params: {
            pageSize: 60,
            sortBy: this.state.sortby,
            withCredentials: true,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        this.setState({ deals: response.data.games });
        console.log(this.state.deals);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortChange = (event) => {
    this.setState({ sortby: event.target.value });
    console.log(this.state.sortby);
  };

  handleLogout = (e) => {
    console.log("clicked");
    // axios.defaults.withCredentials = true;
    // axios
    //   .delete(
    //     "http://localhost:8081/GameDeal/login",
    //     {},
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     const { message } = response.data;
    //     if (message === "session was invalidated") {
    //       localStorage.removeItem("userId");
    //       this.props.history.push("/login");
    //     }
    //   });
  };

  render() {
    return (
      <div>
        <ShopNav
          history={this.props.history}
          username={localStorage.getItem("username")}
        ></ShopNav>
        <div className="album py-5 bg-light">
          <div className="container text-center">
            <div className="space">
              <h1>OUR BEST DEALS</h1>
            </div>
            <div className="space row d-flex justify-content-center">
              <div className="col-md-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={this.handleSortChange}
                >
                  <option defaultValue>Sort by</option>
                  <option value="Title">Title</option>
                  <option value="Price">Price</option>
                  <option value="recent">Recent</option>
                  <option value="Reviews">Rating</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  className="form-control shadow-none"
                  type="text"
                  name=""
                  id="search-bar"
                  placeholder="Title of your favourite game"
                />
              </div>
              <div className="col-md-3">
                <button className="btn btn-warning">Search</button>
              </div>
            </div>
            <div className="row ">
              <div className="d-flex flex-wrap justify-content-center">
                {this.state.deals.map((deal) => (
                  <Deal
                    key={deal.dealID}
                    dealId={deal.dealID}
                    title={deal.title}
                    isOnSale={deal.isOnSale}
                    salePrice={deal.salePrice}
                    normalPrice={deal.normalPrice}
                    rating={deal.dealRating}
                    imgsrc={deal.thumb}
                    gameId={deal.gameID}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
