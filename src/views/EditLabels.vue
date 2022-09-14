<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name='left' />
      <span class="title">编辑标签</span>
			<span class="rightIcon"></span>
    </div>
			<div class="formWrapper">
      	<FormItem :value="tag.name" fieldName="标签名" placeholder="请输入标签名"/>
			</div>
			<div class="buttonWrapper">
      	<Button>删除标签</Button>
			</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '../components/Money/FormItem.vue';
  import Button from '@/components/Money/Botton.vue'
  

  @Component({
    components:{FormItem,Button}
  })
  
  export default class EditLabels extends Vue{
	  tag?:{id:string,name:string } ={id:'',name:''}

    created(){
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
 
      if(tag){
				this.tag = tag;
			}else{
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navBar{
    text-align: center;
		padding: 12px 16px;
		background: white;
    font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
    >.title{

    }
    >.leftIcon{
			width: 24px;
			height: 24px;
    }
		>.rightIcon{
			width: 24px;
			height: 24px;
		}
  }
	.formWrapper{
		background: white;
		margin-top: 8px;
	}
	.buttonWrapper{
		text-align: center;
		padding: 16px;
		margin-top: 44-16px;
	}
</style>