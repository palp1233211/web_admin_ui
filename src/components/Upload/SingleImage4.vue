<template>
  <div :class="uploadContainerClass">
    <el-upload
      action="#"
      :http-request="customUploadMethod"
      :list-type="listType"
      :auto-upload="true"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :limit="limit"
      :file-list="fileList"
      accept="image/jpeg,image/gif,image/png,image/jpg"
    >
      <i v-if="uploadType === 0" class="el-icon-plus" />
      <el-button v-else-if="uploadType === 1" size="small" type="primary">
        Click upload
      </el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { upload_img } from '@/api/upload'

export default {
  name: 'SingleImageUpload4',
  props: {
    limit: {
      type: Number,
      default: 1
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    uploadType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    },
    uploadContainerClass() {
      // 根据上传状态返回相应的样式类名
      return {
        'upload-container': this.uploadType === 0,
        'upload-container1': this.uploadType === 1
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleAvatarSuccess(response, file, fileList) {
      this.fileList = fileList
      const imageUrls = fileList.map((file) => {
        return file.response.data.src.join(',');
      });
      const url = imageUrls.join(',')
      this.$emit('imgUrl', url)
    },
    handleError(err, file, fileList) {
      console.log('上传失败', err)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    customUploadMethod(file) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append( 'files', file.file)
        upload_img(formData)
          .then(response => {
            if (response.code === 200) {
              this.$message.success('上传成功')
              resolve(response) // 将响应数据作为resolve的参数返回
            } else {
              reject(new Error('上传失败'))
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  ::v-deep {
    .el-upload--picture-card {
      width: 148px
    }
  }
}

.upload-container1 {
  margin-bottom: 20px;
}

.upload-container1 .el-upload--picture-card {
  width: 100%;
}
</style>
