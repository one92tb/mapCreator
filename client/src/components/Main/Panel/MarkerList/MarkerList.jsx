import React, { Component } from "react";
import { fetchRecords } from "../../../../actions/fetchRecords";
import { getSelectedMarker } from "../../../../actions/getSelectedMarker";
import { disableMarkers } from "../../../../actions/disableMarkers";
import { connect } from "react-redux";
import styled from "styled-components";

const List = styled.div`
  list-style: none;
  padding: 0;
`;

const Marker = styled.li`
  margin-bottom: 5px;
  border: 1px solid #4ddbff;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 5px !important;
  padding: 0 !important;
  display: flex;

  &:hover {
    background: #4ddbff;
    cursor: pointer;
  }

  ${({ isSelected, isFiltered }) => {
    if (isSelected) {
      return `background: #00b8e6`;
    } else if (isFiltered) {
      return `background: #999; opacity: 0.7`;
    }
  }};
`;

const MarkerIcon = styled.div`
  margin: 0 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerName = styled.span`
  width: 75%;
  float: left;
  display: flex;
  align-items: center;
`;

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      filteredMarkers: []
    };
  }

  componentDidMount() {
    this.props.fetchRecords();
  }

  onSelect = (marker, id) => {
    console.log(marker);
    const getSelectedMarker = this.props.getSelectedMarker;
    const isNavSelect = this.props.isNavSelect;
    const disableMarkers = this.props.disableMarkers;

    if (marker.id !== this.state.selectedId && isNavSelect) {
      console.log("a");
      // SELECT
      this.setState({ selectedId: id });
      getSelectedMarker({
        ...marker,
        url: `http://localhost:8080/images/${marker.icon}`
      });
    }
    //wyzerowanie selected
    else if (marker.id === this.state.selectedId && isNavSelect) {
      console.log("b");
      // UNSELECT
      id = "";
      this.setState({ selectedId: id });
      getSelectedMarker({
        id: undefined,
        name: "",
        url: "IMG-default.png"
      });
    } else {
      console.log("c");
      // FILTER
      if (this.state.filteredMarkers.find(el => el.id === marker.id)) {
        // delete the same
        console.log("y", this.state.filteredMarkers);
        this.setState(
          {
            filteredMarkers: this.state.filteredMarkers.filter(
              el => el.id !== marker.id
            )
          },
          () => {
            console.log(this.state.filteredMarkers);
            return disableMarkers(this.state.filteredMarkers);
          }
        );
      } else {
        console.log("x", this.state.filteredMarkers);
        this.setState(
          {
            filteredMarkers: [...this.state.filteredMarkers, marker]
          },
          () => disableMarkers(this.state.filteredMarkers)
        );
      }
    }
  };

  render() {
    console.log(this.state, this.props);
    const isNavSelect = this.props.isNavSelect;
    const selectedId = this.state.selectedId;
    return (
      <List>
        {this.props.records.map((marker, id) => (
          <Marker
            key={marker.id}
            isSelected={selectedId === marker.id && isNavSelect}
            isFiltered={
              this.state.filteredMarkers.find(el => el.id === marker.id) &&
              !isNavSelect
            }
            onClick={() => this.onSelect(marker, marker.id)}
          >
            <MarkerIcon>
              <img
                src={`http://localhost:8080/images/${marker.icon}`}
                alt={marker.icon}
                height={32}
                width={32}
              />
            </MarkerIcon>
            <MarkerName>{marker.name}</MarkerName>
          </Marker>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  records: state.marker.records,
  isRemoved: state.marker.isRemoved
});

const mapDispatchToProps = {
  fetchRecords,
  getSelectedMarker,
  disableMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerList);
