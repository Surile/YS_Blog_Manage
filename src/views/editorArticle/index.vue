<template>
  <div class="app-container">
    <div class="markdowm-opreas">保存至
      <el-button class="space-s" @click="draftForm">草稿箱</el-button>
      <el-dropdown trigger="click" class="space-l">
        <el-button type="primary">
          发布
          <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" placement="bottom-start">
          <div class="drop-inner">
            <div class="title">发布文章</div>
            <div class="category-box">
              <div class="category-title">分类</div>
              <div class="category-list">
                <div
                  v-for="item in categoryList"
                  :key="item.id"
                  :class="item.isChecked ? 'category-item active' : 'category-item'"
                  @mouseenter="changeColor(item.id)"
                  @mouseout="changeColor(item.id)"
                >{{ item.lable }}</div>
              </div>
            </div>
            <div class="category-box">
              <div class="category-title">标签</div>
              <div class="category-list">
                <el-input placeholder="添加一个标签"/>
              </div>
            </div>
            <div class="confirm-btn">
              <el-button type="primary" plain @click="submitForm">确定并发布</el-button>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-form ref="postForm" :model="postForm" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 40px;" prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
          </el-form-item>

          <div class="postInfo-container">
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                  <el-input v-model="postForm.author" placeholder="请输入用户"/>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.display_time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6"/>
            </el-row>
          </div>
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
import MarkdownEditor from '@/components/MarkdownEditor'
import MDinput from '@/components/MDinput'

const defaultForm = {
  author: '',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  display_time: undefined, // 前台展示时间
  id: undefined
}

export default {
  name: 'EditorArticle',
  components: { MarkdownEditor, MDinput },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      categoryList: [
        {
          id: 1,
          lable: 'Javascript',
          isChecked: false
        },
        {
          id: 2,
          lable: 'HTML',
          isChecked: false
        },
        {
          id: 3,
          lable: 'CSS',
          isChecked: false
        },
        {
          id: 5,
          lable: 'Vue',
          isChecked: false
        }
      ]
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  methods: {
    changeColor(id) {
      this.categoryList.forEach((x, index) => {
        if (x.id === id) {
          x.isChecked = !x.isChecked
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
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

