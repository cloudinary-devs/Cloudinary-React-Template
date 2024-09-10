import './App.css'
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { solid } from "@cloudinary/url-gen/actions/border";


function App() { 

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME
    }
  });


  /**
   * Examples on how to manipulate your image on the fly.
   * For more information visit our docs:
   * https://cloudinary.com/documentation/image_transformations
   * 
   */
  const image = cld.image('NAME OF THE FILE YOU UPLOADED.jpg |.png |.gif | etc').resize(fill().height(250));
  const image1 = cld.image('NAME OF THE FILE YOU UPLOADED.jpg |.png |.gif | etc').resize(
    thumbnail()
      .width(200)
      .height(200)
      .gravity(focusOn(face()))
  ).roundCorners(max()).delivery(format(auto()));
  const image2 = cld.image('NAME OF THE FILE YOU UPLOADED.jpg |.png |.gif | etc').resize(fill().height(250).aspectRatio("1.0"))
  .border(solid(5, "lightblue"));

  return (
    <div>
      <CloudinaryUploadWidget/>
      <p>Example on how to use the Image</p>
      <AdvancedImage cldImg={image}  plugins={[placeholder()]}/>
      <AdvancedImage cldImg={image1}  plugins={[placeholder()]}/>
      <AdvancedImage cldImg={image2}  plugins={[placeholder()]}/>
    </div>
  )
}

export default App
