<style lang="less" scoped>
	.checkType .el-col.paddingLeft {
		padding-left: 10px;
	}
</style>
<template>
	<div>
		<common-layout :crumbs=crumbs>
			<div class="content" slot="content">
				<div class="search-bar">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-select placeholder="物料类别" v-model="pmsMaterialTypeId" @change="refresh" clearable>
								<el-option v-for="el in pmsMaterialTypeVos" :label="el.materialTypeName" :value="el.materialTypeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-input v-model="filter" placeholder="请输入物料名称/简拼"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="refresh">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="table-content">
					<div class="button-bar">
						<el-button type="orange" @click="addMateriel">新增物料</el-button>
						<el-button @click="template">导入</el-button>
						<el-button @click="handleExport">导出</el-button>
					</div>
					<el-table :data="materielData" height="440" border style="width:100%">
						<el-table-column  label="序号" width="70" inline-template>
							<span>{{$index+1+pageData.pageSize*(pageData.pageNo-1)}}</span>
						</el-table-column>
						<el-table-column prop="materialName" label="物料名称" min-width="100"></el-table-column>
						<el-table-column prop="materialShortName" label="物料简拼" min-width="60"></el-table-column>
						<el-table-column prop="materialTypeName" label="物料类别" min-width="100"></el-table-column>
						<el-table-column prop="materialUnitName" label="进货单位" min-width="80"></el-table-column>
						<el-table-column inline-template :context="_self" label="操作" min-width="110">
						  <span>
							<el-button type="primary" size="small" @click="materielInfo(row.materialId)">修改</el-button>
							<el-button type="primary" size="small" @click="deleteMaterial(row.materialId)">删除</el-button>
						  </span>
						</el-table-column>
					</el-table>
					<div class="pagination">
						<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="pageData.pageNo"
								:page-sizes="[10, 20, 30, 40]"
								:page-size="pageData.pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="pageData.totalCount">
						</el-pagination>
					</div>
				</div>
			</div>
		</common-layout>
		<transition v-on:leave = "refresh">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
		data() {
			return {
				crumbs:[
					{path:'/',name: '首页'},
					{path:'',name: '基础管理'},
					{path:'/settings/handleMateriel/index',name: '物料管理'}
				],
				pmsMaterialTypeVos:[],
				filter:'',
				pmsMaterialTypeId:'',
				materielData:[],
				pageData: {
					pageNo: 1,
					pageSize: 10,
					totalCount: 0,
					totalPage: 1
				}
			}
		},
		methods:{
			/*分页回调*/
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageData.pageSize =val;
				this.refresh()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pageData.pageNo =val;
				this.refresh()
			},
			addMateriel(){
				this.$router.push({
					path:'/settings/handleMateriel/add/index',
					query:{
						name:'add'
					}
				})
			},
			/*导入*/
			template(){
				this.$router.push({
					path:'/settings/handleMateriel/template/index'
				})
			},
            handleExport(){
                utils.export('/pms/management/material/export.do',{"filter":this.filter,"pmsMaterialTypeId":this.pmsMaterialTypeId?this.pmsMaterialTypeId:''})
            },
			/*修改物料*/
			materielInfo(materialId){
				this.$router.push({
					path:'/settings/handleMateriel/add/index',
					query:{
						name:'edit',
						materialId:materialId
					}
				})
			},
            /*删除物料*/
            deleteMaterial(materialId){
                let that = this;
				let requestData = {"materialId":materialId};
                this.$confirm('确认删除该物料?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
					utils.post(urls.materialDelete,requestData,that).then(function (data) {
						if (data.code == 200) {
							that.$message({
								message: "删除成功",
								type: 'success'
							});
							that.refresh();
						}
					});
                },function(){})
            },
            refresh(){
                let requestData = {
					"pageNo": this.pageData.pageNo,
					"pageSize": this.pageData.pageSize,
					"filter": this.filter,
					"pmsMaterialTypeId":this.pmsMaterialTypeId
                };
                utils.post(urls.materialList,requestData,this).then(function (data) {
					if (data.code == 200) {
						this.materielData = data.result.pmsMaterialVos;
						this.pageData.pageNo = data.result.pageNo;
						this.pageData.pageSize = data.result.pageSize;
						this.pageData.totalCount = data.result.totalCount;
						this.pageData.totalPage = data.result.totalPage;
					}
				});
				utils.post(urls.materialUnitAndTypeList,null,this).then(function (data) {
					if (data.code == 200) {
						this.pmsMaterialTypeVos = data.result.pmsMaterialTypeVos
					}
				});
            }
		},
		created(){
			this.refresh()
		},
        computed: mapState({user: state => state.user}),
    }
</script>