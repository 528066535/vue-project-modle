<template>
    <div>
        <div><input type="button" value="打印" @click="print()" /></div>
        <div id="print-holder">
            <div>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="page-break-after:always" >
                    <tr><td>
                        第一页打印内容
                        <div class="no-print">啊哈哈哈</div>
                    </td></tr>
                </table>

            </div>
            <div>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" >
                    <tr><td>第二页打印内容</td></tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                conditions: {
                    areaId: 1
                },
                tableData: [{a:1,b:2},{a:1,b:2},{a:1,b:2},{a:1,b:2}]
            }
        },
        created() {

        },

        mounted() {

        },

        methods: {
            getStyle() {
                let str = "",
                    styles = document.querySelectorAll('style,link');
                for (let i = 0; i < styles.length; i++) {
                    if (styles[i].outerHTML.includes('@media print')) {
                        str += styles[i].outerHTML;
                    }
                }
                // str += "<style>" + (this.options.noPrint ? this.options.noPrint : '.no-print') + "{display:none;}</style>";
                return str;
            },
            createFrame(content) {
                let w, doc, iframe = document.createElement('iframe'),
                    f = document.body.appendChild(iframe);
                let _this = this
                iframe.onload = function(){
                    _this.toPrint(w);
                    setTimeout(function () {
                        document.body.removeChild(iframe)
                    }, 100)
                }

                iframe.id = "myIframe";
                //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
                iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
                w = f.contentWindow || f.contentDocument;
                doc = f.contentDocument || f.contentWindow.document;
                doc.open();
                doc.write(this.getStyle() + content.innerHTML);
                doc.close();
            },
            toPrint(frameWindow) {
                try {
                    setTimeout(function () {
                        frameWindow.focus();
                        try {
                            if (!frameWindow.document.execCommand('print', false, null)) {
                                frameWindow.print();
                            }
                        } catch (e) {
                            frameWindow.print();
                        }
                        frameWindow.close();
                    }, 10);
                } catch (err) {
                    console.log('err', err);
                }
            },
            print() {
                let dom = document.getElementById('print-holder')
                this.createFrame(dom)
            }
        },
    }

</script>
<style lang="less" rel="stylesheet/less">
    @media print {
        .print-holder {}

        .no-print {
            display: none;
        }
    }
</style>