<template>
  <el-dialog :visible.sync="dialogVisible" @close="handleClose">
    <div class="img-preview-wrapper"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave">
      <img class="preview-img"
           :src="imgSrc[currentPos]">
      <span slot="footer" class="slider">
        <!-- keyframes; animated objects: the new inserted elements -->
        <transition-group name="fade"> <!-- associate with the style/keyframe-->
          <button v-if="activeLeft"
                  key="btn-left"
                  class="btn btn-left"
                  type="button"
                  @click="handlePrev"> <!-- associate with the method/animation procedure -->
            <i class="el-icon-arrow-left"></i>
          </button>
          <button v-if="activeRight"
                  key="btn-right"
                  class="btn btn-right"
                  type="button"
                  @click="handleNext">
            <i class="el-icon-arrow-right"></i>
          </button>
        </transition-group>
      </span>
    </div>
  </el-dialog>
</template>

<script>
Vue.use(ELEMENT.Dialog); // refer to the global variables(Vue, ELEMENT); install the ELEMENT>Dialog plugin

export default { // export to the global scope for ES6 Module & script tag
    name: "ImgPreview",
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      imgSrc: {
        type: Array,
        default: ['']
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    updated() {
    },
    methods: {
      // opt/method/operation interfaces
      activeSlider() {
        if (this.currentPos === 0) {
          this.activeLeft = false;
          this.activeRight = true;
        } else if (this.currentPos === this.imgSrc.length - 1) {
          this.activeRight = false;
          this.activeLeft = true;
        } else {
          this.activeLeft = this.activeRight = true;
        }
      },
      syncPos() {
        this.$emit('update:currentIndex', this.currentPos)
      },
      prev() {
        if (this.currentPos > 0) this.currentPos--;
      },
      next() {
        if (this.currentPos < this.imgSrc.length - 1) this.currentPos++;
      },

      // opt/method/DOM interfaces
      /*
        Warn: all dom manipulations must do after the related DOMs are ready
        or use the virtual dom to do your job

        precondition: the DOM are inserting into the DOM tree
      */

      // opt/method/event/interaction interfaces
      handleMouseEnter() {
        this.activeSlider();
      },
      handleMouseLeave() {
        this.activeLeft = this.activeRight = false;
      },
      handleNext() {
        this.next();
        this.syncPos();
        this.activeSlider();
      },
      handlePrev() {
        this.prev();
        this.syncPos();
        this.activeSlider();
      },
      handleClose() {
        this.$emit('update:visible', false);
      },

      // opt/method/event/animation interfaces
    },
    // watch data/property val/ref changes; during object lifetime
    watch: {
      currentIndex() {
        this.currentPos = this.currentIndex
      },
      visible() {
        this.dialogVisible = this.visible
      }

    },
    data() {
      // const dialogVisible = this.visible;

      return {
        currentPos: 0,
        activeLeft: false,
        activeRight: true,
        dialogVisible: false,
      }
    }
}
</script>
<style scoped>

.img-preview-wrapper {
  position: relative;
}
.btn {
  background-color: rgba(31,45,61,.3);
  height: 36px;
  width: 36px;
  border: none;
  outline: none;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 12px;
}
.btn:hover {
  cursor: pointer;
}
.btn-left {
  position: absolute;
  top: 40%;
  left: -19px;
}
.btn-right {
  position: absolute;
  top: 40%;
  right: -19px;
}
.el-dialog {
  margin-top: 0 !important;
  display: inline-block;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
.preview-img {
  width: 100%;
}

/* transitions */
/* enter phrase & leave phrase */
.fade-enter-active, .fade-leave-active { /* the ending image -> the starting image; property to animate */
  transition: background-color .5s;
}
/* enter starting point, leave ending point */
.fade-enter, .fade-leave-to {
  background-color: transparent; /* the starting image -> the ending image */
}







</style>
