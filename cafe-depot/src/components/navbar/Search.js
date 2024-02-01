import { useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Search() {
  let navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
    console.log("keyword value: ", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("keyword is: ", keyword);
    navigate(`/shop/keyword/${keyword}`);
    // find matching products with their title or desc matching the user input
    // return list of products.nameIncludes and .descriptionIncludes
    // try {
    //   const response = await fetch(`${BASE_URL}/api/products/search/${keyword}`, {
    //     method: "GET",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     const errorData = await response.json();
    //     throw errorData;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a product"
          className="search-bar"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
