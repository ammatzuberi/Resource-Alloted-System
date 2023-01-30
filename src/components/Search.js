import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { email } from "react-admin";

function Search({ placeholder, data }) {
  const [Searchdata, setSearchdata] = useState([]);
  const url = "http://localhost:5000/issue/getUserIssues";
  var tkn = JSON.parse(localStorage.getItem("user"));

  var newtoken = tkn.token;

  const getuserdata = async () => {
    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setSearchdata(data);
    console.log(data);
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <>
 
    </>
    // <div className="search">
    //   <div className="searchInputs">
    //     <input type="text" placeholder={placeholder} />
    //     <div className="searchIcon">
    //       <SearchIcon />
    //     </div>
    //   </div>
    //   <div className="dataResult"></div>
    // </div>
  );
}

export default Search;
