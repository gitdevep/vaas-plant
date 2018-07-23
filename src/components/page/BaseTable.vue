<template>
    <div class="table" ref="mybox">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="test_demo"><el-form ref="form" label-width="80px"><el-form-item label="多选框"><el-checkbox-group ><el-checkbox label="步步高" name="type"></el-checkbox><el-checkbox label="小天才" name="type"></el-checkbox><el-checkbox label="imoo" name="type"></el-checkbox></el-checkbox-group></el-form-item></el-form></div>
        <div id="apptest">    
        </div>
        <div id="app_test">    
        </div>
    </div>
</template> 

<script>
    import baseform from '../page/BaseForm'
    import $ from 'jquery'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                content:'',
                value:[]
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    //this.url = '/ms/table/list';
                };
                this.$http.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    let value_data = res.data.list;
                    this.content = $('<script id="test_test" type="text/template"><div class="container" id="wwwwTet"><div id="test_demo"><el-form ref="form" label-width="80px"><el-form-item label="多选框"><el-checkbox-group ><el-checkbox label="步步高" name="type"></el-checkbox><el-checkbox label="小天才" name="type"></el-checkbox><el-checkbox label="imoo" name="type"></el-checkbox></el-checkbox-group></el-form-item></el-form></div><button  v-on:click="select()">remove</button><table id="sert"><thead><tr><th>名字</th><th>出生日期</th><th>地址</th><th>操作</th></tr></thead><tbody><tr v-for ="(user,index) in value_data"><td>{{user.name}}</td><td>{{user.date}}</td><td>{{user.address}}</td><td><button v-on:click="deleteName(user.name,index)">remove</button></td></tr></tbody></table></div><\/script><script src="./static/js/jquery.min.js"><\/script><script src="./static/js/vue.min.js"><\/script>')
                    $('#apptest').append(this.content);
                    let ad = $('#test_test')[0].innerHTML;
                    $('#app_test').append(ad)
                    var myViewModel = new Vue({
                        el: "#wwwwTet",
                        data: {
                            message:"12222",
                            value_data:value_data
                        },
                        methods: {
                            select:() => {
                                console.log(1111)
                            },
                            deleteName:(name,index) => {
                                console.log("name===",name,index)
                            }
                        }
                    });
                },(err) =>{
                    this.content = $('<script id="test_test" type="text/template"><div class="container" id="wwwwTet"><div id="test_demo"><el-form ref="form" label-width="80px"><el-form-item label="多选框"><el-checkbox-group ><el-checkbox label="步步高" name="type"></el-checkbox><el-checkbox label="小天才" name="type"></el-checkbox><el-checkbox label="imoo" name="type"></el-checkbox></el-checkbox-group></el-form-item></el-form></div><button  v-on:click="select()">remove</button><table id="sert"><thead><tr><th>名字</th><th>出生日期</th><th>地址</th><th>操作</th></tr></thead><tbody><tr v-for ="(user,index) in value_data"><td>{{user.name}}</td><td>{{user.date}}</td><td>{{user.address}}</td><td><button v-on:click="deleteName(user.name,index)">remove</button></td></tr></tbody></table></div><\/script><script src="./static/js/jquery.min.js"><\/script><script src="./static/js/vue.min.js"><\/script>')
                    $('#apptest').append(this.content);
                    let ad = $('#test_test')[0].innerHTML;
                    $('#app_test').append(ad)
                    let value_data = [{
                            "date": "1997-11-11",
                            "name": "林丽",
                            "address": "吉林省 辽源市 龙山区"
                        }, {
                            "date": "1987-09-24",
                            "name": "文敏",
                            "address": "江西省 萍乡市 芦溪县"
                        }, {
                            "date": "1996-08-08",
                            "name": "杨秀兰",
                            "address": "黑龙江省 黑河市 五大连池市"
                        }, {
                            "date": "1978-06-18",
                            "name": "魏强",
                            "address": "广东省 韶关市 始兴县"
                        }, {
                            "date": "1977-07-09",
                            "name": "石秀兰",
                            "address": "江苏省 宿迁市 宿豫区"
                        }, {
                            "date": "1994-09-20",
                            "name": "朱洋",
                            "address": "海外 海外 -"
                        }, {
                            "date": "1980-01-22",
                            "name": "傅敏",
                            "address": "海外 海外 -"
                        }, {
                            "date": "1985-10-10",
                            "name": "毛明",
                            "address": "内蒙古自治区 包头市 九原区"
                        }, {
                            "date": "1975-09-08",
                            "name": "何静",
                            "address": "西藏自治区 阿里地区 普兰县"
                        }, {
                            "date": "1970-06-07",
                            "name": "郭秀英",
                            "address": "四川省 巴中市 恩阳区"
                        }]
                    var myViewModel = new Vue({
                        el: "#wwwwTet",
                        data: {
                            message:"12222",
                            value_data:value_data
                        },
                        methods: {
                            select:() => {
                                console.log(1111)
                            },
                            deleteName:(name,index) => {
                                console.log("name===",name,index)
                            }
                        }
                    });
                })
            },
            search() {
                const self = this;
                let a = self.$refs.mybox.innerHTML;
                console.log('aaaa===', a);
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            remove(index){
                console.log("qwwqwqeqweqwe",index)
            }
        }
    }
</script>

<style>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    #sert {
        width: 100%;
        font-size:12px;
        line-height:20px
    }
    #sert tr th {
        border:solid 1px red;
        text-align:center;
        line-height: 40px
    }
    #sert tr td {
        border:solid 1px red;
        text-align:center;
        line-height: 32px
    }
</style>