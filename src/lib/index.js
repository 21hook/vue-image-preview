import ImgPreview from './ImgPreview'

/* expose the interface for the host app to install/register */
ImgPreview.install = (Vue, options) => {
  /* expose services the plugin uses */
  Vue.component(ImgPreview.name, ImgPreview); // global registration
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ImgPreview, {}); // refer to the global variable(Vue) install the plugin; send data to the opt
}

export default ImgPreview
