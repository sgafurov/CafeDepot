import { useEffect, useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import uuid from "react-uuid";

import "../../styles/ImagesUpload.css";

export default function ImagesUpload() {
  const [imageFileArray, setImageFileArray] = useState([]); // image and metadata as caputured from file input
  const [imageURLArray, setImageURLArray] = useState([]); // image url representing image so we can display it on screen
  const [imageNameArray, setImageNameArray] = useState([]); // array of the image names as the way we randomized and stored it in firebase
  const [uploadProgress, setUploadProgress] = useState(0);
  const [clickedUpload, setClickedUpload] = useState(false);

  useEffect(() => {
    console.log("imageFileArray: ", imageFileArray);
    console.log("imageURLArray: ", imageURLArray);
    console.log("imageNameArray: ", imageNameArray);
  }, [imageFileArray, imageURLArray, imageNameArray]);

  const handleImageSelect1 = (e) => {
    // overwrite image when new one is chosen
    if (imageURLArray[0]) {
      setImageURLArray((prevImageArray) => {
        const updatedArray = [...prevImageArray];
        updatedArray[0] = URL.createObjectURL(e.target.files[0]);
        return updatedArray;
      });
      setImageFileArray((prevImageFileArray) => {
        const updatedArray = [...prevImageFileArray];
        updatedArray[0] = e.target.files[0];
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

  const handleImageSelect2 = (e) => {
    // overwrite image when new one is chosen
    if (imageURLArray[1]) {
      setImageURLArray((prevImageArray) => {
        const updatedArray = [...prevImageArray];
        updatedArray[1] = URL.createObjectURL(e.target.files[0]);
        return updatedArray;
      });
      setImageFileArray((prevImageFileArray) => {
        const updatedArray = [...prevImageFileArray];
        updatedArray[1] = e.target.files[0];
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
        // TODO: randomize the storage location
        const randomImageName = uuid() + imageFileArray[i].name;
        setImageNameArray((prev) => [...prev, randomImageName]);
        const myRef = ref(storage, randomImageName); // image will be stored under this ref
        const uploadTask = uploadBytesResumable(myRef, imageFileArray[i]); // upload the image
      }
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
                onChange={handleImageSelect1}
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
                onChange={handleImageSelect2}
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
