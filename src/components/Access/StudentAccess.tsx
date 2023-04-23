import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IStudent } from "@/types";
import ImgDropAndCrop from "../imgDrop&Crop/ImgDropAndCrop";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { Crop, PixelCrop } from "react-image-crop/dist/types";

const CreateStudentForm = () => {
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const [preview, setPreview] = useState<string>("");
  const [preCropImg, setPreCropImg] = useState("");
  const [formData, setFormData] = useState<IStudent>({
    name: "",
    email: "",
    password: "",
    fundedLessons: 0,
    imageFile: preview,
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
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

  const imageMaxSize = 10024;
  const handleOnDrop = (files: any, rejectedFiles?: any) => {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fundedLessons">Funded Lessons:</label>
          <input
            type="number"
            id="fundedLessons"
            name="fundedLessons"
            value={formData.fundedLessons}
            onChange={handleChange}
          />
        </div>

        <div>
          {/* <label htmlFor="image">Image:</label> */}
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview of uploeade image"
                style={{ maxWidth: "200px" }}
              />

              <ReactCrop
                aspect={1}
                circularCrop={true}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
                onDragStart={(e: any) => onDragStart(e)}
                onDragEnd={(e: any) => handleDragEnd(e)}
                // onComplete={(crop) => console.log(crop)}
              >
                <img
                  src={preCropImg}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </ReactCrop>

              <button type="button" onClick={() => setPreview("")}>
                unselect image
              </button>
            </>
          ) : (
            <Dropzone
              maxSize={imageMaxSize}
              multiple={false}
              onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
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
        <button type="submit">Create Student</button>
      </form>
      {/* <ImgDropAndCrop /> */}
    </>
  );
};

export default CreateStudentForm;
