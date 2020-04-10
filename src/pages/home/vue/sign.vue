<template>
    <app-page ref="page">
        <section class="signature">
            <div class="signatureBox">
                <div class="canvasBox" ref="canvasHW">
                    <canvas ref="canvasF" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave"></canvas>
                    <div class="btnBox">
                        <div @click="overwrite">重写</div>
                        <div @click="commit">提交签名</div>
                    </div>
                </div>
            </div>
            <img class="imgCanvas" :src="imgUrl">
        </section>
    </app-page>
</template>
<script>

    export default {
        data() {
            return {
                stageInfo:'',
                imgUrl:'',
                points: [],
                canvasTxt: null,
                startX: 0,
                startY: 0,
                moveY: 0,
                moveX: 0,
                endY: 0,
                endX: 0,
                isDown: false,
            }
        },
        created() {

        },

        mounted() {
            let canvas = this.$refs.canvasF
            canvas.height = this.$refs.canvasHW.offsetHeight
            canvas.width = this.$refs.canvasHW.offsetWidth
            this.canvasTxt = canvas.getContext('2d')
            this.stageInfo = canvas.getBoundingClientRect()
        },

        methods: {
            //mobile
            touchStart(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clienX,
                        y: ev.targetTouches[0].clientY,
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                }
            },
            touchMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stageInfo.left,
                        y: ev.targetTouches[0].clientY - this.stageInfo.top
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            touchEnd(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stageInfo.left,
                        y: ev.targetTouches[0].clientY - this.stageInfo.top
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                }
            },
            //pc
            mouseDown(ev) {
                ev = ev || event
                ev.preventDefault()
                if (1) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.isDown = true
                }
            },
            mouseLeave(){
                this.isDown = false
            },
            mouseMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (this.isDown) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            mouseUp(ev) {
                ev = ev || event
                ev.preventDefault()
                if (this.isDown) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.points.push({x: -1, y: -1})
                    this.isDown = false
                }
            },
            //重写
            overwrite() {
                this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
                this.points = []
            },
            //提交签名
            commit() {
                this.imgUrl = this.$refs.canvasF.toDataURL("image/png", .1) //签名img回传后台
            },
            imgSrcToBase64(imgSrc, callBack) {
                function getBase64Image(img) {
                    var canvas = document.createElement("canvas");
                    var quality = 0.7;//压缩率
                    var maxLen = 300;
                    //生成比例
                    var width = img.width,
                        height = img.height;
                    //计算缩放比例
                    var rate = 1;
                    if (width >= height) {
                        if (width > maxLen) {
                            rate = maxLen / width;
                        }
                    } else {
                        if (height > maxLen) {
                            rate = maxLen / height;
                        }
                    }
                    ;
                    img.width = width * rate;
                    img.height = height * rate;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                    var dataURL = canvas.toDataURL("image/" + ext, quality);
                    return dataURL;
                }

                var image = new Image();
                image.crossOrigin = "anonymous"; //防止跨域出错
                image.src = imgSrc;
                image.onload = function () {
                    var base64 = getBase64Image(image);
                    this.imgUrl = base64
                    return base64;
                }
            }
        }
    }
</script>
<style lang="less" scoped rel="stylesheet/less">
    .signature {
        height: 500px;
        .signatureBox {
            height: 100%;
            .canvasBox {
                height: 100%;
            }
        }
    }

</style>