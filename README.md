# vue-image-preview

> An image preview component based on Vue

## 
[Demo](https://21hook.github.io/vue-image-preview/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Usage

```
// import as ES6 module
import VueImagePreview from 'vue-image-preview'

// require as Node module
var VueImagePreview = require('vue-image-preview')

// then, install the plugin
Vue.use(VueImagePreview)

// load as JS file
<script src="unpack.js/"></script>
```

## Props
 name | type | default | description
------| ---  |--------|-------------
visible | Boolean | true   | visibility of the image preview dialog 
imgSrc  | Array | -     |  a list of image URLs
currentIndex | Number | 0 | the current index for the list of images


## License
MIT
