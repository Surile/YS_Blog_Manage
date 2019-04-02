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
        <el-form-item label-width="55px" label="作者:" class="postInfo-container-item" prop="author">
          <el-input v-model="postForm.author" placeholder="请输入用户"/>
        </el-form-item>
        <el-form-item label-width="55px" label="标签:" class="postInfo-container-item">
          <el-select
            v-model="postForm.tagIds"
            :loading="tagLoading"
            value-key="id"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            @visible-change="loadTags"
          >
            <el-option v-for="item in tagList" :key="item.id" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item style="margin-bottom: 40px;" label-width="55px" label="摘要:" prop="abstract">
        <el-input
          :rows="1"
          v-model="postForm.abstract"
          type="textarea"
          class="article-textarea"
          autosize
          placeholder="请输入摘要内容"
        />
        <span v-show="abstractLength" class="word-counter">{{ abstractLength }}字</span>
      </el-form-item>

      <el-form-item style="margin-bottom: 30px;">
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
  tagIds: [],
  status: 'published'
}

export default {
  name: 'EditorArticle',
  components: { MarkdownEditor, MDinput },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
        abstract: [{ required: true, message: '摘要不能为空', trigger: 'blur' }],
        label: [{ required: true, message: '标签不能为空', trigger: 'blur' }]
      },
      tagLoading: false,
      tagList: []
    }
  },
  computed: {
    abstractLength() {
      return this.postForm.abstract.length
    }
  },
  methods: {
    loadTags() {
      getTags().then(res => {
        this.tagList = res
      })
    },
    handleTag(tags) {
      const ids = tags.map(item => {
        if (typeof item === 'string') {
          return {
            id: '',
            label: item
          }
        } else {
          return item
        }
      })
      return ids
    },
    draftForm() {
      this.postForm.status = 'draft'
      this.postForm.tagIds = this.handleTag(this.postForm.tagIds)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          createArticle(this.postForm).then(res => {
            this.$message.success('成功保存文章至草稿箱！')
          })
        } else {
          return false
        }
      })
    },
    submitForm() {
      this.postForm.status = 'published'
      this.postForm.tagIds = this.handleTag(this.postForm.tagIds)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          createArticle(this.postForm).then(res => {
            this.$message.success('发布文章成功！')
          })
        } else {
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

