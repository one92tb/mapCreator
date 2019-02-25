import * as actions from "./postMarker";
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.localStorage = new LocalStorageMock();

const marker = {
  id: 1,
  markerName: "1",
  icon: "1.png",
  userId: 1
};

const expectedResult = marker;

const mock = new MockAdapter(axios);
let store = mockStore();

describe("postMarker actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it("POSTED_MARKER_SUCCESS", () => {
    mock.onPost("http://46.101.186.181:8080/markers").reply(200, expectedResult);
    store.dispatch(actions.postMarker(marker)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.POSTING_MARKER
        },
        {
          type: actions.POSTED_MARKER_SUCCESS,
          marker
        }
      ]);
    });
  });

  it("POSTED_MARKER_ERROR", () => {
    mock.onPost("http://46.101.186.181:8080/markers").reply(404);
    store.dispatch(actions.postMarker(marker)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.POSTING_MARKER);
      expect(store.getActions()[1].type).toEqual(actions.POSTED_MARKER_ERROR);
    });
  });
});
