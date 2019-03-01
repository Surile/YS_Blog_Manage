<template>
  <div class="app-container">
    <div class="markdowm-opreas">保存至
      <el-button class="space-s" @click="draftForm">草稿箱</el-button>
      <el-button type="primary" plain @click="submitForm">确定并发布</el-button>
    </div>
    <el-form ref="postForm" :model="postForm" :rules="rules" label-position="left">
      <el-form-item style="margin-bottom: 40px;" prop="title">
        <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
      </el-form-item>
      <div class="postInfo-container">
        <el-form-item label-width="55px" label="作者:" class="postInfo-container-item">
          <el-input v-model="postForm.author" placeholder="请输入用户"/>
        </el-form-item>
        <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
          <el-date-picker
            v-model="postForm.create_time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label-width="55px" label="标签:" class="postInfo-container-item">
          <el-select
            v-model="postForm.tag_ids"
            :loading="tagLoading"
            value-key="id"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            @visible-change="loadTags"
          >
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </div>

      <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
        <el-input
          :rows="1"
          v-model="postForm.abstract"
          type="textarea"
          class="article-textarea"
          autosize
          placeholder="请输入摘要内容"
        />
        <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
      </el-form-item>

      <el-form-item prop="content" style="margin-bottom: 30px;">
        <markdown-editor ref="markdownDom" v-model="postForm.content" height="50vh"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import MDinput from '@/components/MDinput'
import { getTags } from '@/api/tag'
import { createArticle } from '@/api/article'

const defaultForm = {
  author: '',
  title: '', // 文章题目
  content: '', // 文章内容
  abstract: '', // 文章摘要
  create_time: new Date().getTime(), // 前台展示时间
  tag_ids: [],
  status: 'published'
}

export default {
  name: 'EditorArticle',
  components: { MarkdownEditor, MDinput },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
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
      tagLoading: false,
      tagList: []
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.abstract.length
    }
  },
  methods: {
    loadTags() {
      getTags().then(res => {
        this.tagList = res
      })
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0 ||
        this.postForm.tag_ids.length === 0
      ) {
        this.$message({
          message: '请填写必要的选项',
          type: 'warning'
        })
        return
      }
      console.log(this.postForm)
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
    },
    submitForm() {
      const params = this.postForm
      params.create_time = new Date(params.create_time).getTime()
      console.log(params)
      params.tag_ids = params.tag_ids.map(item => {
        if (typeof item === 'string') {
          return {
            id: '',
            label: item
          }
        } else {
          return item
        }
      })
      this.$refs.postForm.validate(valid => {
        if (valid) {
          createArticle(params).then(res => {
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
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
.postInfo-container {
  display: flex;
  justify-content: space-between;
}
</style>

