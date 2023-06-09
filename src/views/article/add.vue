<template>
  <div class="app-container">
    <el-col :span="22">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-col :span="6">
            <el-input v-model="ruleForm.name" />
          </el-col>
        </el-form-item>

        <el-form-item label="简述" prop="short_title">
          <el-col :span="8">
            <el-input
              v-model="ruleForm.short_title"
              type="text"
              placeholder="请输入内容"
              maxlength="100"
              show-word-limit
            />
          </el-col>
        </el-form-item>

        <el-form-item label="缩略图" prop="small_image">
          <File-Upload :limit="1" @imgUrl="setImgUrl" />
        </el-form-item>

        <el-form-item label="标签" prop="tag_list">
          <el-select v-model="ruleForm.tag_list" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <Tinymce ref="editor" v-model="ruleForm.content" :height="400" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { createArticle, labelTagList } from '@/api/article'
import { Message } from 'element-ui'
import FileUpload from '@/components/Upload/SingleImage4.vue'

export default {
  name: 'ArticleForm',
  components: { Tinymce, FileUpload },
  data() {
    return {
      ruleForm: {
        name: '',
        short_title: '',
        small_image: '',
        content: '',
        tag_list: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        small_image: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ],
        tag_list: [
          { required: true, message: '必须选择', trigger: 'change' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ]
      },
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ]
    }
  },
  created() {
    this.getLabelTagList()
  },
  methods: {
    submitForm(formName) {
      const formRef = this.$refs[formName]
      formRef.validate((valid) => {
        if (valid) {
          createArticle(this.ruleForm)
            .then(response => {
              const { msg } = response
              Message({
                message: msg || 'ok',
                type: 'success',
                duration: 5 * 1000
              })
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          formRef.$el.scrollIntoView()
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setImgUrl(url) {
      this.ruleForm.small_image = url
    },
    getLabelTagList() {
      labelTagList(1)
        .then(response => {
          const { data } = response
          this.options = data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
