import React from "react";
import { SortingContainer } from "./Sorting";
import { shallow } from "enzyme";
import { SortOption } from "../types";

const params = {
  results: [{}],
  searchTerm: "test",
  setSort: jest.fn(),
  sortDirection: "asc",
  sortField: "field",
  sortOptions: [
    SortOption.create({
      name: "name",
      value: "field",
      direction: "asc"
    }),
    SortOption.create({
      name: "name",
      value: "field",
      direction: "desc"
    })
  ]
};

beforeEach(() => {
  params.setSort = jest.fn();
});

it("renders correctly", () => {
  const wrapper = shallow(<SortingContainer {...params} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders empty when it doesn't have enough data", () => {
  const wrapper = shallow(
    <SortingContainer
      {...{
        ...params,
        searchTerm: "",
        results: []
      }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("will call back when sort is changed in view", () => {
  const wrapper = shallow(<SortingContainer {...params} />);

  wrapper.find("Sorting").prop("onChange")({
    currentTarget: { value: "field|||desc" }
  });

  const [sortField, sortDirection] = params.setSort.mock.calls[0];
  expect(sortField).toEqual("field");
  expect(sortDirection).toEqual("desc");
});
