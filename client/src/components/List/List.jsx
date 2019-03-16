import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchIndicators } from "../../actions/mapIndicator/fetchIndicators";
import { fetchMarkers } from "../../actions/marker/fetchMarkers";
import { redirectToMain } from "../../actions/redirect/redirect";
import PropTypes from "prop-types";
//import { withRouter } from "react-router-dom";
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

Wrapper.displayName = "div";
Label.displayName = "label";
Select.displayName = "select";
Input.displayName = "input";
Form.displayName = "form";
TableContainer.displayName = "div";
Table.displayName = "table";
Thead.displayName = "thead";
Tbody.displayName = "tbody";
Tr.displayName = "tr";
Th.displayName = "th";
Td.displayName = "td";
Option.displayName = "option";
Image.displayName = "img";

export class List extends Component {
  constructor(props) {
    super(props);

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

  handleChange = (e, name) => {
    this.setState({ [name]: e.target.value });
  };

  findIndicatorOnTheMap = indicator => {
    const { redirectToMain } = this.props;
    redirectToMain();
  };

  render() {
    const { markers, indicators, history, redirectToMain } = this.props;
    const { markerName, city } = this.state;

    return (
      <Wrapper>
        <Form>
          <Label>
            <Select onChange={e => this.handleChange(e, "markerName")}>
              <Option>All</Option>
              {markers.map((marker, id, arr) => (
                <Option key={marker.id}>{marker.name}</Option>
              ))};
            </Select>
          </Label>
          <Input
            onChange={e => this.handleChange(e, "city")}
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
                    : markerName === indicator.name &&
                        indicator.city
                          .toLowerCase()
                          .search(city.toLowerCase()) !== -1 &&
                        indicator;

                  //1 ) sprawdza wszystko ALL ""
                  // 2) All  Wroclaw
                  // 3 ) test1 Wroclaw
                })
                .map((indicator, id) => (
                  <Tr key={indicator.id}>
                    <Td>{id + 1}</Td>
                    <Td>{indicator.name}</Td>
                    <Td>{indicator.street}</Td>
                    <Td>{indicator.city}</Td>
                    <Td>{indicator.country}</Td>
                    <Td>
                      <Image
                        src={"map-location.png"}
                        onClick={() => this.findIndicatorOnTheMap(indicator)}
                      />
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
  fetchMarkers,
  redirectToMain
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
  fetchMarkers: PropTypes.func.isRequired,
  redirectToMain: PropTypes.func.isRequired
};
