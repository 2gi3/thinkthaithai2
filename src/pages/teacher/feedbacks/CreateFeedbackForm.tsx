import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IFeedback } from "@/types";
import ImgDropAndCrop from "@/components/imgDrop&Crop/ImgDropAndCrop";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { Crop, PixelCrop } from "react-image-crop/dist/types";
// import { Image as NextImage }  from "next/image";
import styles from '../teacher.module.scss'

// "image/*": [".png", ".gif", ".jpeg", ".jpg"],
const CreateFeedbackForm = () => {
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [preCropImgWidth, setPreCropImgWidth] = useState<number>(0);
  const [preview, setPreview] = useState<string>("");
  const [preCropImg, setPreCropImg] = useState("");
  const [formData, setFormData] = useState<IFeedback>({
    name: "",
    job: '',
    location: '',
    title: '',
    body: '',
    imageFile: preview,
  });
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data);
      //   router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  //   const imageMaxSize = 10024;
  const handleOnDrop = (files: any, rejectedFiles?: any) => {
    if (files.length === 0 || !(files[0] instanceof Blob)) {
      console.error("Invalid file");
      return;
    }

    rejectedFiles && console.log(rejectedFiles);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setPreCropImg(reader.result as string);
      // console.log(preview);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLImageElement>) => {
    const canvas = document.createElement("canvas");
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = preCropImg!;
    image.onload = () => {
      ctx?.drawImage(
        image,
        crop.x!,
        crop.y!,
        crop.width!,
        crop.height!,
        0,
        0,
        crop.width!,
        crop.height!
      );
      const base64 = canvas.toDataURL();
      console.log(base64);
      setPreview(base64);
    };
  };

  const onDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    console.log("start");
  };
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) {
  //     setPreview("");
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreview(reader.result as string);
  //     console.log(preview);
  //   };
  //   reader.readAsDataURL(file);
  // };



  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageFile: preview,
    }));
  }, [preview]);

  const onCropComplete = (crop: PixelCrop, percentageCrop: any) => {
    console.log("crop:", crop);
    console.log("percentageCrop:", percentageCrop);
  };

  useEffect(() => {
    if (preCropImg) {
      const image = new Image();
      image.src = preCropImg;
      image.onload = () => {
        setPreCropImgWidth(image.width);
      };
      console.log(preCropImgWidth)
    }

  }, [preCropImg, preCropImgWidth]);


  return (
    <>
      <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="job">Job:</label>
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <input
            type="text"
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        <div className={styles.feedbackFormImage}>
          {/* <label htmlFor="image">Image:</label> */}
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview of uploaded image"
                style={{ maxWidth: "200px" }}
              />

              <ReactCrop
                aspect={1}
                circularCrop={true}
                // maxHeight={120}
                // maxWidth={120}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onDragEnd={(e: any) => handleDragEnd(e)}
              >
                <img
                  id={styles.originalImage}
                  src={preCropImg}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  alt='preview'
                  width={preCropImgWidth}

                />
              </ReactCrop>

              <button type="button" onClick={() => setPreview("")}>
                unselect image
              </button>
            </>
          ) : (
            <Dropzone
              accept={{ Image: [".png", ".jpg", ".jpeg", ".gif", 'webp', 'svg'] }}
              //   maxSize={imageMaxSize}
              multiple={false}
              onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} style={{ height: "200px" }}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and drop, or click to select an image
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          {/* <canvas>

          </canvas> */}
          {/* <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          /> */}
        </div>
        <button className={styles.feedbackFormButton} type="submit">Create feedback</button>
      </form>
      {/* <ImgDropAndCrop /> */}
    </>
  );
};

export default CreateFeedbackForm;