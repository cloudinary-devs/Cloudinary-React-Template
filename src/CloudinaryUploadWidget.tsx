import { useEffect, useState, useCallback } from "react";

function CloudinaryUploadWidget({ uwConfig }: { uwConfig: unknown }) {
  const [loaded, setLoaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  /**
   * Load Cloudinary Upload Widget Script
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
        await window.cloudinary.openUploadWidget(uwConfig, processUploads);
        // Remove setUploadProgress from here
      } catch (error) {
        console.error(error);
        setUploadProgress('failed');
      }
    }
  };
  

  const processUploads = useCallback((error: unknown, result: unknown) => {
    if (error) {
      console.error(error);
      setUploadProgress('failed');
    } else if (result?.event === "success") {
      console.log(result);
      setUploadProgress('successful');
    }
  }, []);


  return (
    <>
      <button id="upload_widget" onClick={initializeCloudinaryWidget}>
        Upload Images
      </button>
      {uploadProgress && (
        <p>Image Upload Status: {uploadProgress === 'successful' ? 'successful' : 'failed'}</p>
      )}
    </>
  );
}

export default CloudinaryUploadWidget;
