<template>
  <div class="app-container">
    <div class="markdowm-opreas">保存至
      <el-button class="space-s" @click="draftForm">草稿箱</el-button>
      <el-button type="primary" plain @click="submitForm">确定并发布</el-button>
    </div>
    <el-form ref="postForm" :model="postForm" :rules="rules">
      <el-form-item style="margin-bottom: 40px;" prop="title">
        <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
            <el-input v-model="postForm.author" placeholder="请输入用户"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
            <el-date-picker
              v-model="postForm.display_time"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label-width="45px" label="标签:" class="postInfo-container-item">
            <el-autocomplete
              v-model="postForm.tag"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
        <el-input
          :rows="1"
          v-model="postForm.content_short"
          type="textarea"
          class="article-textarea"
          autosize
          placeholder="请输入内容"
        />
        <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
      </el-form-item>

      <el-form-item prop="content" style="margin-bottom: 30px;">
        <markdown-editor ref="markdownDom" v-model="postForm.content" height="90vh"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import MDinput from "@/components/MDinput";
import { getTags } from "@/api/tag";

const defaultForm = {
  author: "",
  title: "", // 文章题目
  content: "", // 文章内容
  content_short: "", // 文章摘要
  display_time: undefined, // 前台展示时间
  id: undefined,
  tag: []
};

export default {
  name: "EditorArticle",
  components: { MarkdownEditor, MDinput },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tagList: []
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length;
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000);
      console.log(this.postForm);
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$notify({
            title: "成功",
            message: "发布文章成功",
            type: "success",
            duration: 2000
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/theme/default.scss";
@import "src/styles/mixins/index.scss";
.markdowm-opreas {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: $spacing-h-lg;
  font-size: $font-size-base;
}
.drop-inner {
  width: 320px;
  padding: $spacing-h-lg;
  overflow: hidden;
  .title {
    font-size: $font-size-xxl;
    font-weight: 600;
  }
  .category-box {
    margin-bottom: $spacing-v-sm;
    .category-title {
      padding: $spacing-v-sm 0;
      font-size: $font-size-lg;
    }
    .category-item {
      display: inline-block;
      padding: $spacing-v-xs $spacing-h-sm;
      margin: 0 $spacing-h-sm $spacing-v-xs 0;
      @include border-thin;
      border-radius: $border-radius-sm;
      color: $color-black-2;
    }
    .active {
      border: 1px solid $color-brand-dark;
      color: $color-brand-dark;
    }
  }
  .confirm-btn {
    text-align: center;
  }
}

.word-counter {
  width: 40px;
  position: absolute;
  right: -10px;
  top: 0px;
}
</style>

