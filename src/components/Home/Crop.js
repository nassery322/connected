import React, {useState, useEffect} from "react";
import ImageCropperModal from "../../UI/ImageCropModal";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../UI/ImageCropper";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
import './Crop.css'
import { generateDownload } from "../../UI/ImageCropper";
 const Crop = (props) => {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    
	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};
      
    async function reader(image){
        const reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
        setImage(reader.result);
    })
    }
    useEffect( ()=>{
        if  (props.image){
            reader(props.image)
        }
    }, [])
   

          
	const onSelectFile = async (event) => {

        if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = async () => {

        const croppedImage = await getCroppedImg(
            image,
            croppedArea,
            rotation
          );

          setCroppedImage(croppedImage);
            props.onImageCropped(croppedImage)
        
	};


	return (<ImageCropperModal><div className='container'>
    <div className='container-cropper'>
        {image ? (
            <>
                <div className='cropper'>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1/1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        rotation={rotation}
                    />
                </div>
                <div className="container-control">
                <div className='zoom-slider'>
                        <label for="customRange1" className="form-label">Zoom : </label>
                        <input type="range" className="form-range" id="customRange1" min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)} />   </div>
                             <div className='rotate-slider'>
                <label for="customRange1" className="form-label">Rotate : </label>
<input type="range" className="form-range" id="customRange1" min={-180}
								max={180}
								step={0.1}
								value={rotation}
								onChange={(e) => setRotation(e.target.value)}/>   </div>
                </div>
                   
            </>
        ) : null}
    </div>

    <div className='container-buttons'>
        <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
        />
        <button
           className="btn btn-primary" onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
        >
            Choose another
        </button>
        <button className="btn btn-danger" onClick={onDownload}>
            Upload photo
        </button>
    </div>
</div>
    </ImageCropperModal>
		
	);
}

export default Crop;