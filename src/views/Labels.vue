<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag" v-for="tag in tags" :key="tag.id " :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span> 
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Button from '@/components/Money/Botton.vue'
  import store from '@/store/index2';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: { Button }
  })
  export default class Label extends Vue{
    tags = store.tagList;

    createTag(){
      const name = window.prompt('请输入标签名')
      if(name){
        store.createTag(name)
      }
    };
  }
</script>

<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 20px;
    padding:0 0 0 16px;
    >.tag{
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg{
        color: #666;
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
    }
  }
  .createTag{
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper{
      padding: 16px;
      margin-top: 44-16px;
      text-align: center;
    }
  }
</style>