function handlePaste(silly) {
    const imageData = silly.getData('image/jpeg'); // or 'image/jpeg' etc.
    if (imageData) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64String = event.target.result;
            // Create an image element and set its src attribute to the data URL
            const image = document.createElement('img');
            image.src = base64String;

            // Add the image to a container element for display
            const container = document.body; // Assuming you have a container element with this ID
            container.appendChild(image);
        };
        reader.readAsDataURL(imageData);
    }
}
