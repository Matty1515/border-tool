<script setup>
import { ref, watch, onMounted } from 'vue';
import defaultImagePath from '/public/placeholder.png';

let image = null;
const canvas = ref(null);
const imageLoaded = ref(false);
const borderWidth = ref(100);
const borderHeight = ref(100);
const backgroundColor = ref('#FFFFFF');

// Handles the uploading of new images
const onFileChange = (event) =>
{
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            image = img;
            drawImageWithBorder();
            imageLoaded.value = true;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

// Adds the specified border to the canvas
const drawImageWithBorder = () =>
{
    const ctx = canvas.value.getContext('2d');
    const canvasWidth = image.width + 2 * borderWidth.value;
    const canvasHeight = image.height + 2 * borderHeight.value;

    canvas.value.width = canvasWidth;
    canvas.value.height = canvasHeight;

    ctx.fillStyle = backgroundColor.value;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, borderWidth.value, borderHeight.value);
};

// Downloads the current canvas image
const downloadImage = () =>
{
    const link = document.createElement('a');
    link.href = canvas.value.toDataURL('image/png');
    link.download = 'image_with_border.png';
    link.click();
};

// Watch for changes in user input and redraw the image
watch([borderWidth, borderHeight, backgroundColor], () =>
{
    if (image) {
        drawImageWithBorder();
    }
});

// Load the default image on component mount
onMounted(() =>
{
    const img = new Image();
    img.onload = () => {
        image = img;
        drawImageWithBorder();
        imageLoaded.value = true;
    };
    img.src = defaultImagePath;
});
</script>

<template>
    <div id="BorderTool">
        <header>
            <h1 class="title"><i class="las la-border-style"></i> Border Tool</h1>
            <div class="controls">
                <div>
                    <label for="borderWidth">Border Width:</label>
                    <input type="number" v-model="borderWidth" id="borderWidth" />
                </div>
                <div>
                    <label for="borderHeight">Border Height:</label>
                    <input type="number" v-model="borderHeight" id="borderHeight" />
                </div>
                <div>
                    <label for="backgroundColor">Border Colour:</label>
                    <input type="color" v-model="backgroundColor" id="backgroundColor" />
                </div>
            </div>
            <div class="buttons">
                <input type="file" id="file-input" @change="onFileChange" />
                <label for="file-input" class="upload-btn">
                    <i class="las la-upload"></i>
                    Upload
                </label>
                <button @click="downloadImage" :disabled="!imageLoaded">
                    <i class="las la-download"></i>
                    Download
                </button>
            </div>
        </header>
        <main>
            <canvas ref="canvas" v-show="imageLoaded"></canvas>
        </main>
    </div>
</template>

<style scoped>
div#BorderTool {
    --text-color: #FFFFFF;
    --text-color-secondary: #C8CCD8;
    --brand-color: #b6fb34;
    --background-color: #2d313e;
    --background-color-light: #303441;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr;
    background-color: var(--background-color);
    color: var(--text-color);
}

header {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 2px 2px, rgba(0, 0, 0, 0.05) 0px 4px 4px, rgba(0, 0, 0, 0.05) 0px 8px 8px, rgba(0, 0, 0, 0.05) 0px 16px 16px;
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    align-items: center;
    gap: 10px;
    border-top: 3px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    position: relative;
    z-index: 0;
    padding: 0 20px;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--background-color);
    background-image:
        linear-gradient(45deg, var(--background-color-light) 25%, transparent 25%),
        linear-gradient(-45deg, var(--background-color-light) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--background-color-light) 75%),
        linear-gradient(-45deg, transparent 75%, var(--background-color-light) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

canvas {
    max-width: 100%;
    max-height: 80vh;
    width: auto;
    height: auto;
    display: block;
    margin: auto;
}

.title {
    font-size: 16px;
    line-height: 2;
}

.title i {
    font-size: 25px;
    color: var(--brand-color);
    position: relative;
    top: 3px;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.controls > div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.controls label {
    font-size: 11px;
    color: var(--text-color-secondary);
    margin-bottom: 4px;
}

.controls input {
    width: 100px;
    height: 22px;
    background-color: #383b48;
    border: 1px solid #383b48;
    border-radius: 2px;
    color: var(--text-color);
    padding: 0 5px;
}

.buttons {
    text-align: right;
}

.buttons button {
    background: var(--brand-color);
    padding: 8px 12px 8px 8px;
    border-radius: 4px;
    border: 1px solid var(--brand-color);
    margin-left: 6px;
}

.buttons label {
    color: var(--brand-color);
    font-size: 13px;
    background: transparent;
    padding: 7px 14px 8px 10px;
    border-radius: 4px;
    border: 1px solid var(--brand-color);
}

input[type="file"] {
    display: none;
}

.buttons button:hover, .buttons label:hover {
    cursor: pointer;
    opacity: 0.8;
}
</style>
