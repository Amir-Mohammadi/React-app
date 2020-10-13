import React, { Component } from "react";
import data from "./data.json";

class SearchFilter extends Component {
  state = {
    itemsTodisplay: [],
    itemToUse: [],
    cuisine: [],
  };
  render() {
    return (
      <div>
        <div className="restfilter">
          <div>
            Choose a cuisine : &nbsb;
            <select id="restfilter" onChange={this.optionSelected}>
              <option value="any">Choose Any</option>
              {this.state.cuisine.map((cuisine) => {
                return <option value={cuisine}>{cuisine}</option>;
              })}
            </select>
          </div>
          <div>
            Sort by : &nbsb;
            <select id="sortfilter" onChange={this.sortby}>
              <option value="ranking">Ranking</option>
              <option value="asc">Rating: Low to High</option>
              <option value="des">Rating: High to Low</option>
            </select>
          </div>
        </div>
        <div className="restcontainer">
          {this.state.itemsTodisplay.map((rest) => {
            let cuisines = rest["Cuisine Style"]
              .substring(1, rest["Cuisine Style"].length - 2)
              .split(",");
            return (
              <div className="rest">
                <div className="restinfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                  ></i>
                  &nbsp;
                  <span className="restcity">{rest["City"]}</span>
                  <br />
                  <span className="restname">{rest["Name"]}</span>
                  <div className="restcuisines">
                    {cuisines.map((cuisine) => {
                      let cuisineToShow = cuisine.substring(
                        1,
                        cuisine.length - 1
                      );
                      cuisineToShow = cuisineToShow.include("'")
                        ? cuisineToShow.substring(1, cuisineToShow.length)
                        : cuisineToShow;
                      return (
                        <div pill className="restcuisine" variant="light">
                          {cuisineToShow}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sepline"></div>
                <div className="reststats">
                  <div>
                    <i
                      style={{ fontSize: "15px" }}
                      className="far fa-comment-alt"
                    ></i>
                    &nbsp;
                    {rest["Number of Reviews"]}
                  </div>
                  <div>
                    <i style={{ fontSize: "15px" }} className="far fa-star"></i>
                    &nbsp;
                    {rest["rating"]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  filterOnSearch = (event) => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({ itemsTodisplay: [...this.state.itemsTodisplay] });
    else {
      let itemsTodisplay = this.state.itemsToUse.filter(
        (item) =>
          item["Name"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Cuisine Style"]
            .toLowerCase()
            .include(event.target.value.toLowerCase()) ||
          item["city"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState({ itemsTodisplay });
    }
  };

  optionSelected = () => {
    var e = document.getElementById(restfilter);
    var selected = e.option[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsTodisplay: [...this.state.itemsToUse] });
    else {
      let itemsTodisplay = [];
      itemsTodisplay = this.state.itemsToUse.filter((item) =>
        item["Cuisine Style"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsTodisplay });
    }
  };

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.option[e.selectedIndex].value;

    if (selected === "ranking")
      this.setState({ itemsTodisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsTodisplay = [...this.state.itemsTodisplay];
      itemsTodisplay.sort(function (a, b) {
        return a["rating"] - b["Rating"];
      });
      this.setState({ itemsTodisplay });
    } else {
      let itemsTodisplay = [...this.state.itemsTodisplay];
      itemsTodisplay.sort(function (a, b) {
        return b["Rating"] - a["Rating"];
      });
      this.setState({ itemsTodisplay });
    }
  };

  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var cuisine = [];
    var itemsTodisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsTodisplay.push(data[i]);
      data[i]["Cuisine Style"]
        .substring(1, data[i]["Cuisine Style"].length - 2)
        .split(",")
        .forEach((cuisine) => {
          let c = cuisine.substring(1, cuisine.length - 1);
          c = c.includes("'") ? substring(1, c.length) : c;
          if (cuisines.indexOf(c) < 0) {
            cuisines.push(c);
          }
        });
    }
    this.setState({ cuisines });
    this.setState({ itemsTodisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsTodisplay] });
    });
  }
}
export default SearchFilter;
