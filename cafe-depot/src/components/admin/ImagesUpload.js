import { useEffect, useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import uuid from "react-uuid";

import "../../styles/ImagesUpload.css";

export default function ImagesUpload({ sendImageNamesToParent }) {
  const [imageFileArray, setImageFileArray] = useState([]); // image and metadata as caputured from file input
  const [imageURLArray, setImageURLArray] = useState([]); // image url representing image so we can display it on screen
  const [imageNames, setImageNames] = useState(""); // string of all the image names as the way we randomized and stored it in firebase
  const [clickedUpload, setClickedUpload] = useState(false);

  useEffect(() => {
    console.log("imageFileArray: ", imageFileArray);
    console.log("imageURLArray: ", imageURLArray);
    console.log("imageNames: ", imageNames);
  }, [imageFileArray, imageURLArray, imageNames]);

  const handleImageSelect = (e, index) => {
    // overwrite image when new one is chosen
    if (imageURLArray[index]) {
      setImageURLArray((prevImageArray) => {
        const updatedArray = [...prevImageArray];
        updatedArray[index] = URL.createObjectURL(e.target.files[0]);
        return updatedArray;
      });
      setImageFileArray((prevImageFileArray) => {
        const updatedArray = [...prevImageFileArray];
        updatedArray[index] = e.target.files[0];
        return updatedArray;
      });
    } else {
      setImageURLArray((prevImageArray) => [
        ...prevImageArray,
        URL.createObjectURL(e.target.files[0]),
      ]);
      setImageFileArray((prevImageFileArray) => [
        ...prevImageFileArray,
        e.target.files[0],
      ]);
    }
  };

  const handleImageUpload = () => {
    console.log("inside handleImageUpload", imageFileArray);
    if (imageFileArray.length > 0) {
      for (let i = 0; i < imageFileArray.length; i++) {
        const randomImageName = uuid() + imageFileArray[i].name;
        setImageNames((prevState) => {
          // only append the '+' if prevstate is not empty
          return prevState
            ? prevState + "+" + randomImageName
            : randomImageName;
        });
        //setImageNames((prevState) => prevState + "+" + randomImageName); // " ''+random1.png+random2.png" will have to trim it when you get it from get request and split string on the + icon
        const myRef = ref(storage, randomImageName); // image will be stored under this ref
        const uploadTask = uploadBytesResumable(myRef, imageFileArray[i]); // upload the image
      }
      // Use the callback version of setImageNames
      setImageNames((prevState) => {
        sendImageNamesToParent(prevState);
        return prevState;
      });
      //   sendImageNamesToParent(imageNames);
      setClickedUpload(true);
    }
  };

  return (
    <div>
      <form className="formDiv">
        <div className="imageInputGroup">
          <div className="imageInputWrapper">
            <label className="imageInputLabel">
              <div>
                <p type="caption1" className="caption">
                  Add a photo
                </p>
              </div>
              <img className="selectedImage" src={imageURLArray[0]} />
              <input
                type="file"
                className="imageInput"
                // onChange={handleImageSelect1}
                onChange={(e) => handleImageSelect(e, 0)}
              />
            </label>
          </div>
          <div className="imageInputWrapper">
            <label className="imageInputLabel">
              <div className="imageInputLabel-div">
                <p type="caption1" className="caption">
                  Add a photo
                </p>
              </div>
              <img className="selectedImage" src={imageURLArray[1]} />
              <input
                type="file"
                className="imageInput"
                // onChange={handleImageSelect2}
                onChange={(e) => handleImageSelect(e, 1)}
              />
            </label>
          </div>
        </div>

        <br />
        {!clickedUpload ? (
          <div className="upload-and-create-button">
            <button
              style={{ background: "grey", border: "none" }}
              onClick={handleImageUpload}
            >
              Upload Images
            </button>
          </div>
        ) : (
          <></>
        )}
        <br />
      </form>
    </div>
  );
}
