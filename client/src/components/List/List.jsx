import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchIndicators } from "../../actions/mapIndicator/fetchIndicators";
import { fetchMarkers } from "../../actions/marker/fetchMarkers";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Wrapper,
  Label,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Option,
  Image
} from "./style";

const FindIndicator = withRouter(({ history }) => {
  return (
    <Image
      src={"map-location.png"}
      onClick={() => {
        history.push("/");
      }}
    />
  );
});

export class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      markerName: "All",
      city: ""
    };
  }

  componentDidMount() {
    const { fetchIndicators, fetchMarkers } = this.props;

    fetchIndicators();
    fetchMarkers();
  }

  handleChange = e => {
    if (e.target.name === "city") {
      this.setState({ city: e.target.value });
    } else {
      this.setState({ markerName: e.target.value });
    }
  };

  findIndicatorOnTheMap = indicator => {
    console.log(indicator);
  };

  render() {
    const { markers, indicators } = this.props;
    const { markerName, city } = this.state;

    return (
      <Wrapper>
        <Form>
          <Label>
            <Select onChange={this.handleChange}>
              <Option>All</Option>
              {markers.map((marker, id, arr) => (
                <Option key={marker.id}>{marker.name}</Option>
              ))};
            </Select>
          </Label>
          <Input
            onChange={this.handleChange}
            type="text"
            name="city"
            placeholder="search city"
          />
        </Form>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>street</Th>
                <Th>city</Th>
                <Th>country</Th>
                <Th>find on the map</Th>
              </tr>
            </Thead>
            <Tbody>
              {indicators
                .filter(indicator => {
                  return (markerName === "All" && city === "") ||
                    (markerName === "All" &&
                      indicator.city
                        .toLowerCase()
                        .search(city.toLowerCase()) !== -1)
                    ? indicator
                    : markerName === indicator.name && markerName === "All"
                      ? indicator
                      : markerName === indicator.name &&
                        indicator.city
                          .toLowerCase()
                          .search(city.toLowerCase()) !== -1 &&
                        indicator;
                })
                .map((indicator, id) => (
                  <Tr key={indicator.id}>
                    <Td>{id + 1}</Td>
                    <Td>{indicator.name}</Td>
                    <Td>{indicator.street}</Td>
                    <Td>{indicator.city}</Td>
                    <Td>{indicator.country}</Td>
                    <Td onClick={() => this.findIndicatorOnTheMap(indicator)}>
                      <FindIndicator />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchIndicators,
  fetchMarkers
};

const mapStateToProps = state => ({
  indicators: state.mapIndicator.indicators,
  markers: state.marker.markers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

List.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      street: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      userId: PropTypes.number.isRequired
    })
  ).isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired
    })
  ),
  fetchIndicators: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired
};
