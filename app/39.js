webpackJsonp([39],{506:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),r=a(1),s=i(r);t.default={data:function(){var e=[{path:"/",name:"首页"},{path:"/receives",name:"收货单"}],t={date:"",status:"",purchaseno:""},a=[],i={shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},n={pageNo:1,pageSize:10,totalCount:0,totalPage:1};return{crumbs:e,formSearch:t,tableData:a,pickerOptions:i,pageData:n,loading:!0,dialogVisible:!1}},methods:{showDialog:function(){this.dialogVisible=!0},closeDialog:function(){this.dialogVisible=!1},onSubmit:function(){this.fetchData()},handleView:function(e){this.$router.push({name:"receivesView",params:{id:e,source:1}})},handleReceive:function(e){this.$router.push({name:"receivesPO",params:{id:e}})},handleSizeChange:function(e){this.pageData.pageSize=e,this.fetchData()},handleCurrentChange:function(e){this.pageData.pageNo=e,this.fetchData()},filterStatus:function(e,t){return t.receiptStatus===e},fetchData:function(){var e=this;this.loading=!0;var t={filter:this.formSearch.purchaseno,pageNo:this.pageData.pageNo,pageSize:this.pageData.pageSize};t.startTime=this.formSearch.date.length>0&&this.formSearch.date[0]?(0,s.default)(this.formSearch.date[0]).format("YYYY-MM-DD"):"",t.endTime=this.formSearch.date.length>1&&this.formSearch.date[1]?(0,s.default)(this.formSearch.date[1]).format("YYYY-MM-DD"):"",this.$http({url:"/pms/receipt/order/list.do",method:"POST",body:{requestData:JSON.stringify(t)},emulateJSON:!0}).then(function(e){return e.body}).then(function(t){200==t.code?(e.tableData=t.result.pmsReceiptOrderVos,e.pageData.pageNo=t.result.pageNo,e.pageData.pageSize=t.result.pageSize,e.pageData.totalCount=t.result.totalCount,e.pageData.totalPage=t.result.totalPage):(e.tableData=[],e.$message({message:t.message,type:"warning"})),e.loading=!1})},handleChangeTab:function(e,t){2==e.name&&this.$router.push({path:"/receives/direct"})}},created:function(){this.fetchData()},computed:(0,n.mapState)({user:function(e){return e.user}})}},573:function(e,t,a){t=e.exports=a(4)(),t.push([e.id,".el-tabs[data-v-5ec6e853]{display:block}.search-bar[data-v-5ec6e853]{padding-top:0}.search-bar .el-button[data-v-5ec6e853]{float:left}.search-bar .form-inline[data-v-5ec6e853]{float:right}.what_onCreatePO[data-v-5ec6e853]{position:absolute;right:8px;top:0;color:#ff5f00;font-size:16px;cursor:pointer;line-height:60px}.dialogContent[data-v-5ec6e853]{max-height:500px;overflow:auto}.dialog[data-v-5ec6e853]{max-width:660px;margin:0 auto}.dialog h1[data-v-5ec6e853]{font-size:20px;text-align:center;margin-bottom:40px;color:#333;font-weight:700}.dialog h3[data-v-5ec6e853]{margin-bottom:15px;font-weight:700;color:#333;font-size:16px}.dialog h3 .h3Tips[data-v-5ec6e853]{display:inline-block;width:23px;height:23px;line-height:23px;margin-right:10px;background-color:#20a0ff;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;text-align:center;color:#fff}.dialog .function[data-v-5ec6e853]{margin-bottom:15px}.dialog .function .blue[data-v-5ec6e853]{color:#20a0ff}.dialog button[data-v-5ec6e853]{margin:0 5px}.dialog .text[data-v-5ec6e853]{padding:0 35px;line-height:25px}.dialog .centent[data-v-5ec6e853]{margin-bottom:40px}.dialog img[data-v-5ec6e853]{min-height:221px}.dialog .mt20[data-v-5ec6e853]{margin-top:20px}",""])},639:function(e,t,a){var i,n;a(742),i=a(506);var r=a(691);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=r.render,n.staticRenderFns=r.staticRenderFns,n._scopeId="data-v-5ec6e853",e.exports=i},691:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("common-layout",{attrs:{crumbs:e.crumbs}},[a("div",{staticClass:"content",slot:"content"},[a("div",{staticClass:"tabs-bar"},[a("el-tabs",{attrs:{type:"card","active-name":"1"},on:{"tab-click":e.handleChangeTab}},[a("el-tab-pane",{attrs:{label:"根据采购单收货",name:"1"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"直接新增收货单",name:"2"}})],1)],1),e._v(" "),a("div",{staticClass:"search-bar clearfix"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",[a("el-date-picker",{directives:[{name:"model",rawName:"v-model",value:e.formSearch.date,expression:"formSearch.date"}],staticStyle:{width:"220px"},attrs:{type:"daterange",align:"right",placeholder:"选择开单日期范围","picker-options":e.pickerOptions},domProps:{value:e.formSearch.date},on:{input:function(t){e.formSearch.date=t}}})],1),e._v(" "),a("el-form-item",[a("el-input",{directives:[{name:"model",rawName:"v-model",value:e.formSearch.purchaseno,expression:"formSearch.purchaseno"}],attrs:{placeholder:"请输入采购单号"},domProps:{value:e.formSearch.purchaseno},on:{input:function(t){e.formSearch.purchaseno=t}}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1),e._v(" "),a("div",{staticClass:"table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"玩命加载中",data:e.tableData,height:"442",border:""}},[a("el-table-column",{attrs:{label:"序号",width:"70"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e.$index+1+e.pageData.pageSize*(e.pageData.pageNo-1)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchaseNo",label:"采购单号","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"开单日期","min-width":"120"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("moment")(e.row.createTime)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"createUserName",label:"开单人","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"receiveTime",label:"收货日期","min-width":"120"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("moment")(e.row.receiveTime)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{label:"收货人","min-width":"120"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e.row.receiverName?e.row.receiverName:"--"))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"receiptStatus",label:"状态","min-width":"100"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tag",{attrs:{type:0==e.row.receiptStatus?"primary":"success","close-transition":""}},[e._v(e._s(0==e.row.receiptStatus?"未收货":1==e.row.status?"已发货未收货":"已收货"))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{context:e._self,label:"操作","min-width":"100"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[2==e.row.receiptStatus?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.handleView(e.row.receiptId)}}},[e._v("查看")]):e._e(),e._v(" "),0==e.row.receiptStatus||1==e.row.receiptStatus?a("el-button",{attrs:{type:"orange",size:"small"},on:{click:function(t){e.handleReceive(e.row.purchaseId)}}},[e._v("收货")]):e._e()],1)},staticRenderFns:[]}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.pageData.pageNo,"page-sizes":[10,20,30,40],"page-size":e.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pageData.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("span",{staticClass:"what_onCreatePO",on:{click:e.showDialog}},[e._v("如何收货？")])])]),e._v(" "),a("el-dialog",{directives:[{name:"model",rawName:"v-model",value:e.dialogVisible,expression:"dialogVisible"}],attrs:{title:"帮助",size:"large"},domProps:{value:e.dialogVisible},on:{close:e.closeDialog,input:function(t){e.dialogVisible=t}}},[a("div",{staticClass:"dialogContent"},[a("div",{staticClass:"dialog"},[a("h1",[e._v("如何收货？")]),e._v(" "),a("h3",[a("span",{staticClass:"h3Tips"},[e._v("1")]),e._v("第一步：点击“"),a("el-button",{attrs:{size:"small",type:"orange"}},[e._v("收货")]),e._v("”进入>开单页；")],1),e._v(" "),a("div",{staticClass:"centent text"},[a("img",{attrs:{src:"http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/shouhuo1.png"}})]),e._v(" "),a("h3",[a("span",{staticClass:"h3Tips"},[e._v("2")]),e._v("第二步：确认收货数量、价格等信息。")]),e._v(" "),a("div",{staticClass:"centent text"},[a("img",{attrs:{src:"http://kd-oss.oss-cn-hangzhou.aliyuncs.com/image/kdrmspms/shouhuo2.png"}}),e._v(" "),a("p",{staticClass:"function mt20"},[a("span",{staticClass:"blue"},[e._v("| ")]),e._v("a.首次收货需要输入单价、采购员、供应商（采购员工、供应商默认为系统的），下次同样物料收货，单价、采购员和供应商信息默认上一次填写的。")]),e._v(" "),a("p",{staticClass:"function"},[a("span",{staticClass:"blue"},[e._v("| ")]),e._v("b.收货数量可根据实际情况调整，物料也可以增加。")])]),e._v(" "),a("h3",[a("span",{staticClass:"h3Tips"},[e._v("3")]),e._v("第三步：确认收货")]),e._v(" "),a("div",{staticClass:"centent text"},[a("p",[e._v("点击“确认收货”后，即可开始结算，结算前收货数据可以编辑，结算完，收货数据不可编辑。"),a("br"),e._v("\r\n\t\t\t\t注：如果没有开采购单直接新增收货单，点击“直接新增收货单”直接创建（流程参考收货）。")])])])])])],1)},staticRenderFns:[]}},742:function(e,t,a){var i=a(573);"string"==typeof i&&(i=[[e.id,i,""]]);a(5)(i,{});i.locals&&(e.exports=i.locals)}});