webpackJsonp([24],{3:function(e,t){"use strict";e.exports={post:function(e,t,a){var r=a.$http||this.$http,i=a.$message||this.$message,n=t?{requestData:JSON.stringify(t)}:null;return r({method:"POST",url:e,body:n,emulateJSON:!0}).then(function(e){return e.body}).then(function(e){return 200!=e.code&&i({message:e.message,type:"warning"}),e})},postJSON:function(e,t,a){var r=a.$http||this.$http,i=a.$message||this.$message,n=t?t:null;return r({method:"POST",url:e,body:n,emulateJSON:!0}).then(function(e){return e.body}).then(function(e){return 200!=e.code&&i({message:e.message,type:"warning"}),e})},export:function(e,t){var a=e;for(var r in t)a=a.indexOf("?")==-1?a+"?"+r+"="+t[r]:a+"&"+r+"="+t[r];window.location.href=a},message:function(){}}},6:function(e,t){"use strict";e.exports={materialAdd:"/pms/management/material/add.do",materialDelete:"/pms/management/material/delete.do",materialEdit:"/pms/management/material/edit.do",materialShow:"/pms/management/material/show.do",materialList:"/pms/management/material/list.do",materialUnitList:"/pms/management/materialUnit/list.do",materialTypeList:"/pms/management/materialType/list.do",materialUnitAndTypeList:"/pms/management/materialUnitAndType/list.do",materialSettleTypeList:"/pms/management/materialSettleType/list.do",materialUnitAdd:"/pms/management/materialUnit/add.do",materialUnitEdit:"/pms/management/materialUnit/edit.do",materialUnitShow:"/pms/management/materialUnit/show.do",materialUnitDelete:"/pms/management/materialUnit/delete.do",materialTypeAdd:"/pms/management/materialType/add.do",materialTypeDelete:"/pms/management/materialType/delete.do",materialTypeShow:"/pms/management/materialType/show.do",materialTypeEdit:"/pms/management/materialType/edit.do",supplierList:"/pms/management/supplier/list.do",supplierDelete:"/pms/management/supplier/delete.do",supplierEdit:"/pms/management/supplier/edit.do",supplierAdd:"/pms/management/supplier/add.do",supplierShow:"/pms/management/supplier/show.do",userList:"/pms/user/list.do",userDelete:"/pms/user/delete.do",userAddView:"/pms/user/addView.do",userEditView:"/pms/user/editView.do",userEdit:"/pms/user/edit.do",userAdd:"/pms/user/add.do",roleList:"/pms/role/list.do",roleDelete:"/pms/role/delete.do",roleAddView:"/pms/role/addView.do",roleEditView:"/pms/role/editView.do",roleEdit:"/pms/role/edit.do",roleAdd:"/pms/role/add.do",settleOrder:"/pms/report/settle/order.do",settleDetail:"/pms/report/settle/order/detail.do",settleType:"/pms/report/type/list.do",settleTypeDetail:"/pms/report/settle/type/list/detail.do",materialReport:"/pms/report/material/list.do",materialReportDetail:"/pms/report/material/list/detail.do",purchaseList:"/pms/report/purchase/list.do",purchaseListDetail:"/pms/report/purchase/list/detail.do",settlement:"/pms/report/settlement/list.do",settlementDetail:"/pms/report/settlement/list/detail.do"}},511:function(e,t,a){(function(e,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),s=a(1);i(s);t.default={data:function(){var e=[{path:"/",name:"首页"},{path:"",name:"报表"},{path:"/reports/materialReports/materialList",name:"物料类别汇总"},{path:"/reports/materialReports/materialListDetail",name:"物料类别详情"}];return{crumbs:e,formSearch:{date:[],status:"",purchaseno:""},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},filter:"",detail:[],totalAmount:0,pageData:{pageNo:1,pageSize:10,totalCount:0,totalPage:1}}},methods:{onSubmit:function(){this.refresh()},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pageData.pageSize=e,this.refresh()},handleCurrentChange:function(e){console.log("当前页: "+e),this.pageData.pageNo=e,this.refresh()},refresh:function(){var t={pageNo:this.pageData.pageNo,pageSize:this.pageData.pageSize,materialTypeId:this.$route.query.id};e.post(r.materialReportDetail,t,this).then(function(e){200==e.code&&(this.pageData.pageNo=e.result.pageNo,this.pageData.pageSize=e.result.pageSize,this.pageData.totalCount=e.result.totalCount,this.pageData.totalPage=e.result.totalPage,this.detail=e.result.pmsMaterialTypeReportDetailVos,this.totalAmount=e.result.totalAmount)})},handleExport:function(){e.export("/pms/report/material/type/detail/export.do",{materialTypeId:this.$route.query.id})}},created:function(){this.refresh()},computed:(0,n.mapState)({user:function(e){return e.user}})}}).call(t,a(3),a(6))},596:function(e,t,a){t=e.exports=a(4)(),t.push([e.id,".rowSpan span[data-v-f5526ef8]{line-height:60px}.button-bar .el-button[data-v-f5526ef8]{float:right}.button-bar .el-row[data-v-f5526ef8]{float:left;line-height:36px}",""])},644:function(e,t,a){var r,i;a(765),r=a(511);var n=a(713);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=n.render,i.staticRenderFns=n.staticRenderFns,i._scopeId="data-v-f5526ef8",e.exports=r},713:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("common-layout",{attrs:{crumbs:e.crumbs}},[a("div",{staticClass:"content",slot:"content"},[a("div",{staticClass:"search-bar"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",[a("el-date-picker",{directives:[{name:"model",rawName:"v-model",value:e.formSearch.date,expression:"formSearch.date"}],staticStyle:{width:"220px"},attrs:{type:"daterange",align:"right",placeholder:"选择日期范围","picker-options":e.pickerOptions},domProps:{value:e.formSearch.date},on:{input:function(t){e.formSearch.date=t}}})],1),e._v(" "),a("el-form-item",[a("el-input",{directives:[{name:"model",rawName:"v-model",value:e.formSearch.purchaseno,expression:"formSearch.purchaseno"}],attrs:{placeholder:"请输入物料名称"},domProps:{value:e.formSearch.purchaseno},on:{input:function(t){e.formSearch.purchaseno=t}}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1),e._v(" "),a("div",{staticClass:"table-content"},[a("div",{staticClass:"button-bar"},[a("el-button",{on:{click:e.handleExport}},[e._v("导出")]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[e._v("总计："),a("span",{staticClass:"orange"},[e._v("¥"+e._s(e._f("number")(e.totalAmount)))])])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.detail,height:"442",border:""}},[a("el-table-column",{attrs:{label:"序号",width:"70"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e.$index+1+e.pageData.pageSize*(e.pageData.pageNo-1)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialName",label:"物料名称","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialUnitName",label:"进货单位","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchasePrice",label:"采购均价","min-width":"80"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("number")(e.row.purchasePrice)))])},staticRenderFns:[]}}),e._v(" "),a("el-table-column",{attrs:{prop:"purchaseCount",label:"采购数量","min-width":"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"payment",label:"结算金额","min-width":"80"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._v(e._s(e._f("number")(e.row.payment)))])},staticRenderFns:[]}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.pageData.pageNo,"page-sizes":[10,20,30,40],"page-size":e.pageData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pageData.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])]),e._v(" "),a("transition",{on:{leave:e.refresh}},[a("router-view")],1)],1)},staticRenderFns:[]}},765:function(e,t,a){var r=a(596);"string"==typeof r&&(r=[[e.id,r,""]]);a(5)(r,{});r.locals&&(e.exports=r.locals)}});