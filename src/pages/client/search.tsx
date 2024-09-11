import useQueryParams from "../../hooks/useQueryParams";

const Search = () => {
  const params = useQueryParams();
  console.log(params);
  return <h1>Search Page</h1>;
};

export default Search;
