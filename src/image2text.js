import Tesseract from 'tesseract.js';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';


class Image2Text {

    constructor(editor) {
        this.editor = editor;
    }

    init(input, locale) {
        const map = {
            'fr-FR': 'fra',
            'en-EN': 'eng'
        };

        this.lang = map[locale];

        const inputElement = document.querySelector(input);
        inputElement.addEventListener('change', this.handleFileSelect.bind(this), false);

        // on click on cancel, hide all
        const cancel = document.getElementById('crop-cancel');
        cancel.addEventListener('click', this.close.bind(this), false);

        // on click on crop, initialize image2text
        const crop = document.getElementById('crop-confirm');
        crop.addEventListener('click', this.handleCrop.bind(this), false);
    }

    close() {
        // Hide container
        const imageContainer = document.getElementById('image-container');
        imageContainer.style.display = 'none';

        // Hide progress bar
        const progress = document.getElementById('progressbar');
        progress.style.display = 'none';
    }

    handleCrop(evt) {

        this.close();

        // show progressbar
        const progress = document.getElementById('progressbar');
        progress.style.display = 'block';

        this.cropper.getCroppedCanvas().toBlob((blob) => {

            // Start recognition
            Tesseract.recognize(
                blob,
                this.lang,
                {
                    // on each iteration increase width of progress bar
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            const progress = document.getElementById('progress');
                            progress.style.width = `${m.progress * 100}%`;

                            // if progress is 100%, hide progress bar
                            if (m.progress === 1) {
                                this.close();
                            }
                        }
                    }
                }
            ).then(({ data: { text } }) => {
                this.editor.setText(text);
                this.editor.applyColors();
            });
        });

    }

    handleFileSelect(evt)  {
        const files = evt.target.files; // FileList object

        if(!files.length) {
            return;
        }

        // Destroy any previous cropper to avoid stacking instances on repeated uploads
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }

        // put image in #image in order to crop it
        const image = document.getElementById('image');
        image.src = URL.createObjectURL(files[0]);

        // Once the image is loaded, show the crop UI and let Cropper.js handle
        // EXIF orientation on its own (checkOrientation is enabled by default).
        //
        // We intentionally do NOT rotate the image manually anymore: mobile
        // browsers already auto-apply EXIF orientation to the <img>, and a
        // manual CSS `transform: rotate()` only rotates the on-screen preview,
        // not the pixels sent to the OCR. Combined, they rotated photos the
        // wrong way on Android and broke text recognition.
        image.onload = () => {
            const imageContainer = document.getElementById('image-container');
            imageContainer.style.display = 'block';

            this.cropper = new Cropper(image, {
                viewMode: 1,
                autoCropArea: 1,
            });
        };
    }
}


export default Image2Text;
