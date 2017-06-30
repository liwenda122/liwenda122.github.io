webpackJsonp([38],{507:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(7);t.default={data:function(){var e=[],t={};return{tableData:e,orderData:t,loading:!0}},methods:{fetchData:function(){var e=this;this.loading=!0;var t=this.$route.params.id,a={receiptId:t};this.$http({url:"/pms/receipt/order/detail.do",method:"POST",body:{requestData:JSON.stringify(a)},emulateJSON:!0}).then(function(e){return e.body}).then(function(t){200==t.code?(e.tableData=t.result.pmsReceiptVo.pmsReceiptDetailVos,e.orderData.createUserName=t.result.pmsReceiptVo.createUserName,e.orderData.purchaseNo=t.result.pmsReceiptVo.purchaseNo,e.orderData.purchaseRemark=t.result.pmsReceiptVo.purchaseRemark,e.orderData.createTime=t.result.pmsReceiptVo.createTime):(e.tableData=[],e.$message({message:t.message,type:"warning"})),e.loading=!1})},handleBackToList:function(){this.$router.push({path:"/receives"})},handlePrint:function(){window.print()}},created:function(){this.fetchData()},computed:(0,r.mapState)({user:function(e){return e.user}})}},562:function(e,t,a){t=e.exports=a(4)(),t.push([e.id,".table-content[data-v-23cd0cae]{width:1200px;margin:0 auto}.order-bar[data-v-23cd0cae]{color:#99a9bf;font-size:18px;padding:20px 0}.order-bar .right[data-v-23cd0cae]{font-size:14px}",""])},640:function(e,t,a){var r,n;a(731),r=a(507);var s=a(678);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(n=r=r.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,n._scopeId="data-v-23cd0cae",e.exports=r},678:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("div",{staticClass:"table-content"},[a("div",{staticClass:"order-bar"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content left"},[e._v("收货单")])]),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content right"},[a("el-row",[a("el-col",{attrs:{span:12}},[e._v("采购单号："+e._s(e.orderData.purchaseNo))]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("开单时间："+e._s(e._f("moment")(e.orderData.createTime)))])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[e._v("收货时间："+e._s(e.orderData.createTime))])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[e._v("开单人："+e._s(e.orderData.createUserName))])],1)],1)])],1)],1),e._v(" "),a("div",{staticClass:"button-bar"},[a("el-button",{on:{click:e.handleBackToList}},[e._v("返回")]),e._v(" "),a("el-button",{on:{click:e.handlePrint}},[e._v("打印")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"玩命加载中",data:e.tableData,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialName",label:"物料名称","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialTypeName",label:"类别","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchasePrice",label:"进价","min-width":"100"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("number")(e.row.purchasePrice)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchaseCount",label:"采购数量","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"receivedCount",label:"收货数量","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialUnitName",label:"单位","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalFee",label:"合计","min-width":"120"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("number")(e.row.totalFee)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"payStatus",label:"是否付款","min-width":"100"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tag",{attrs:{type:0==e.row.payStatus?"primary":"success","close-transition":""}},[e._v(e._s(0==e.row.payStatus?"未付款":"已付款"))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchaserName",label:"采购员","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"supplierName",label:"供应商","min-width":"120"}})],1)],1)])},staticRenderFns:[]}},731:function(e,t,a){var r=a(562);"string"==typeof r&&(r=[[e.id,r,""]]);a(5)(r,{});r.locals&&(e.exports=r.locals)}});