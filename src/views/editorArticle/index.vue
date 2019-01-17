<template>
  <div class="app-container">
    <div class="markdowm-opreas">
      保存至 <el-button>草稿箱</el-button>
      <el-dropdown trigger="click" class="publish">
        <el-button type="primary">
          发布<i class="el-icon-arrow-down el-icon--right" />
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
                <el-input placeholder="添加一个标签" />
              </div>
            </div>
            <div class="confirm-btn"><el-button type="primary" plain>确定并发布</el-button></div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <markdown-editor ref="markdownDom" v-model="content" height="90vh"/>
  </div>
</template>
<script>
import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'EditorArticle',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
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
          id: 4,
          lable: 'Electron',
          isChecked: false
        },
        {
          id: 5,
          lable: 'Vue',
          isChecked: false
        },
        {
          id: 6,
          lable: 'React',
          isChecked: false
        },
        {
          id: 7,
          lable: 'React-native',
          isChecked: false
        }
      ]
    }
  },
  methods: {
    changeColor(id) {
      this.categoryList.forEach((x, index) => {
        if (x.id === id) {
          x.isChecked = !x.isChecked
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/theme/default.scss';
@import 'src/styles/mixins/index.scss';
.markdowm-opreas {
  padding-bottom: $spacing-h-lg;
  font-size: $font-size-base;
  .publish {
    margin-left: $spacing-h-lg;
  }
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
</style>

