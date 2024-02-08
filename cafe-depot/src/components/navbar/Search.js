import { useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Search() {
  let navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("keyword is: ", keyword);
    navigate(`/shop/keyword/${keyword}`);
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
