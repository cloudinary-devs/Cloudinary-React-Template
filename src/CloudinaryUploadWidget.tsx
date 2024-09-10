import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    cloudinary: unknown;
  }
}

function CloudinaryUploadWidget() {
  const uwConfig = {
    cloudName: "YOUR CLOUD NAME",
    uploadPreset: "YOUR UPLOAD PRESET NAME",
    multiple: true,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: ["local", "url"], // restrict the upload sources to URL and local files
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: { alt: "user_uploaded" }, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000, //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  };

  const [loaded, setLoaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  /**
   * Load Cloudinary Upload Widget Script
   * https://cloudinary.com/documentation/upload_widget_reference
   */
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = async () => {
    setUploadProgress('');
    if (loaded) {
      try {
       window.cloudinary.openUploadWidget(uwConfig, processUploads);
        // Remove setUploadProgress from here
      } catch (error) {
        console.error(error);
        setUploadProgress('failed');
      }
    }
  };

  const processUploads = useCallback(
    (error: unknown, result: { event: string; info?: { secure_url: string } }) => {
      if (error) {
        console.error(error);
        setUploadProgress("failed");
      } else if (result?.event === "success") {
        console.log(result);
        setUploadProgress("successful");
      }
    },
    []
  );

  return (
    <>
      <button id="upload_widget" onClick={initializeCloudinaryWidget}>
        Upload Images
      </button>
      {uploadProgress && (
        <p>
          Image Upload Status:{" "}
          {uploadProgress === "successful" ? "successful" : "failed"}
        </p>
      )}
    </>
  );
}

export default CloudinaryUploadWidget;
